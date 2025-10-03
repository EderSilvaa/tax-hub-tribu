/**
 * usePDFExport Hook - Hook para geração e download de PDFs
 *
 * Gerencia a criação, preview e download de relatórios PDF
 * dos resultados da simulação tributária
 */

import React, { useState, useCallback } from 'react';
import { pdf } from '@react-pdf/renderer';
import { TaxCalculationResult, CompanyData } from '../lib/types';

// ==================== INTERFACES ====================

export interface PDFExportOptions {
  fileName?: string;
  reportTitle?: string;
  includeBreakdown?: boolean;
  includeRecommendations?: boolean;
}

export interface PDFExportState {
  isGenerating: boolean;
  isDownloading: boolean;
  error: string | null;
  progress: number;
}

// ==================== HOOK ====================

export const usePDFExport = () => {
  const [state, setState] = useState<PDFExportState>({
    isGenerating: false,
    isDownloading: false,
    error: null,
    progress: 0,
  });

  // Reset state
  const resetState = useCallback(() => {
    setState({
      isGenerating: false,
      isDownloading: false,
      error: null,
      progress: 0,
    });
  }, []);

  // Generate and download PDF
  const generateAndDownloadPDF = useCallback(async (
    results: TaxCalculationResult[],
    companyData: CompanyData,
    options: PDFExportOptions = {}
  ) => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null, progress: 0 }));

      // Dynamic import to avoid SSR issues
      const TaxReportPDFModule = await import('../components/TaxReportPDF');
      const TaxReportPDF = TaxReportPDFModule.default;

      setState(prev => ({ ...prev, progress: 25 }));

      // Create PDF document
      const doc = pdf(
        React.createElement(TaxReportPDF, {
          results,
          companyData,
          generatedAt: new Date(),
          reportTitle: options.reportTitle || 'Relatório de Simulação Tributária'
        })
      );

      setState(prev => ({ ...prev, progress: 50 }));

      // Generate blob
      const blob = await doc.toBlob();

      setState(prev => ({ ...prev, progress: 75, isDownloading: true }));

      // Create download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;

      // Generate filename
      const timestamp = new Date().toISOString().slice(0, 10);
      const defaultFileName = `relatorio-tributario-taxhub-${timestamp}.pdf`;
      link.download = options.fileName || defaultFileName;

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Cleanup
      URL.revokeObjectURL(url);

      setState(prev => ({ ...prev, progress: 100 }));

      // Reset after successful download
      setTimeout(resetState, 1000);

    } catch (error) {
      console.error('Error generating PDF:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao gerar PDF',
        isGenerating: false,
        isDownloading: false,
        progress: 0,
      }));
    }
  }, [resetState]);

  // Generate PDF blob (for preview)
  const generatePDFBlob = useCallback(async (
    results: TaxCalculationResult[],
    companyData: CompanyData,
    options: PDFExportOptions = {}
  ): Promise<Blob> => {
    try {
      setState(prev => ({ ...prev, isGenerating: true, error: null }));

      const TaxReportPDFModule = await import('../components/TaxReportPDF');
      const TaxReportPDF = TaxReportPDFModule.default;

      const doc = pdf(
        React.createElement(TaxReportPDF, {
          results,
          companyData,
          generatedAt: new Date(),
          reportTitle: options.reportTitle || 'Relatório de Simulação Tributária'
        })
      );

      const blob = await doc.toBlob();

      setState(prev => ({ ...prev, isGenerating: false }));
      return blob;

    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao gerar PDF',
        isGenerating: false,
      }));
      throw error;
    }
  }, []);

  // Open PDF in new tab
  const previewPDF = useCallback(async (
    results: TaxCalculationResult[],
    companyData: CompanyData,
    options: PDFExportOptions = {}
  ) => {
    try {
      const blob = await generatePDFBlob(results, companyData, options);
      const url = URL.createObjectURL(blob);

      // Open in new tab
      const newWindow = window.open(url, '_blank');
      if (!newWindow) {
        throw new Error('Pop-up bloqueado. Permita pop-ups para preview do PDF.');
      }

      // Cleanup URL after a delay
      setTimeout(() => URL.revokeObjectURL(url), 10000);

    } catch (error) {
      console.error('Error previewing PDF:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao fazer preview do PDF'
      }));
    }
  }, [generatePDFBlob]);

  // Share PDF (future implementation)
  const sharePDF = useCallback(async (
    results: TaxCalculationResult[],
    companyData: CompanyData,
    options: PDFExportOptions = {}
  ) => {
    try {
      const blob = await generatePDFBlob(results, companyData, options);

      if (navigator.share && navigator.canShare({ files: [new File([blob], 'relatorio.pdf', { type: 'application/pdf' })] })) {
        const file = new File([blob], 'relatorio-tributario-taxhub.pdf', { type: 'application/pdf' });
        await navigator.share({
          title: 'Relatório de Simulação Tributária - TaxHub',
          text: 'Confira a análise tributária completa da sua empresa',
          files: [file]
        });
      } else {
        // Fallback: download
        await generateAndDownloadPDF(results, companyData, options);
      }
    } catch (error) {
      console.error('Error sharing PDF:', error);
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro ao compartilhar PDF'
      }));
    }
  }, [generatePDFBlob, generateAndDownloadPDF]);

  return {
    // State
    ...state,

    // Actions
    generateAndDownloadPDF,
    generatePDFBlob,
    previewPDF,
    sharePDF,
    resetState,

    // Computed
    isActive: state.isGenerating || state.isDownloading,
    canShare: !!(navigator.share && window.File),
  };
};

export default usePDFExport;