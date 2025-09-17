/**
 * TaxSimulator Component - Simulador Tributário Principal
 *
 * Container principal que integra o formulário e resultados
 * Cores: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

import React, { useState } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calculator,
  ArrowLeft,
  RefreshCw,
  Save,
  Share2,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from "lucide-react";

import CompanyDataForm from './CompanyDataForm';
import TaxResults from './TaxResults';
import {
  CompanyData,
  TaxCalculationResult
} from '@/features/taxSimulator/lib/types';
import {
  compareAllRegimes,
  getRecommendedRegime,
  getBestEconomicOption
} from '@/features/taxSimulator/lib/taxCalculations';
import {
  formatCurrency
} from '@/features/taxSimulator/lib/utils';

// ==================== INTERFACES ====================

export interface TaxSimulatorProps {
  className?: string;
  onSaveSimulation?: (data: CompanyData, results: TaxCalculationResult[]) => void;
  onShareResults?: (results: TaxCalculationResult[]) => void;
  onExportPDF?: (data: CompanyData, results: TaxCalculationResult[]) => void;
  initialData?: Partial<CompanyData>;
}

interface SimulatorState {
  stage: 'form' | 'results' | 'loading';
  companyData?: CompanyData;
  results?: TaxCalculationResult[];
  error?: string;
}

// ==================== MAIN COMPONENT ====================

const TaxSimulator: React.FC<TaxSimulatorProps> = ({
  className = '',
  onSaveSimulation,
  onShareResults,
  onExportPDF,
  initialData
}) => {
  const [state, setState] = useState<SimulatorState>({
    stage: 'form'
  });

  // ==================== HANDLERS ====================

  const handleFormSubmit = async (formData: CompanyData) => {
    setState(prev => ({ ...prev, stage: 'loading' }));

    try {
      // Simular delay para mostrar loading
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Executar cálculos
      const calculationResults = compareAllRegimes(formData);

      // Verificar se há resultados elegíveis
      const eligibleResults = calculationResults.filter(r => r.elegivel);

      if (eligibleResults.length === 0) {
        throw new Error('Nenhum regime tributário é elegível para esta empresa. Verifique os dados informados.');
      }

      // Salvar estado com resultados
      setState({
        stage: 'results',
        companyData: formData,
        results: calculationResults,
        error: undefined
      });

      // Mostrar notificação de sucesso
      const bestOption = getBestEconomicOption(formData);
      const savings = bestOption ? calculateMaxSavings(calculationResults, bestOption) : 0;

      toast.success('Simulação concluída!', {
        description: savings > 0
          ? `Potencial economia de ${formatCurrency(savings)} foi identificada.`
          : 'Análise tributária completa disponível.'
      });

    } catch (error) {
      console.error('Erro na simulação:', error);

      setState(prev => ({
        ...prev,
        stage: 'form',
        error: error instanceof Error ? error.message : 'Erro desconhecido na simulação'
      }));

      toast.error('Erro na simulação', {
        description: error instanceof Error ? error.message : 'Tente novamente ou entre em contato com o suporte.'
      });
    }
  };

  const handleNewSimulation = () => {
    setState({
      stage: 'form',
      companyData: undefined,
      results: undefined,
      error: undefined
    });
  };

  const handleEditData = () => {
    setState(prev => ({
      ...prev,
      stage: 'form'
    }));
  };

  const handleSaveSimulation = () => {
    if (state.companyData && state.results && onSaveSimulation) {
      onSaveSimulation(state.companyData, state.results);
      toast.success('Simulação salva com sucesso!');
    }
  };

  const handleShareResults = () => {
    if (state.results && onShareResults) {
      onShareResults(state.results);
      toast.success('Link de compartilhamento gerado!');
    }
  };

  const handleExportPDF = () => {
    if (state.companyData && state.results && onExportPDF) {
      onExportPDF(state.companyData, state.results);
      toast.success('PDF gerado com sucesso!');
    }
  };

  // ==================== HELPER FUNCTIONS ====================

  const calculateMaxSavings = (results: TaxCalculationResult[], bestOption: TaxCalculationResult): number => {
    const eligibleResults = results.filter(r => r.elegivel);
    if (eligibleResults.length <= 1) return 0;

    const maxCost = Math.max(...eligibleResults.map(r => r.impostos.total));
    return maxCost - bestOption.impostos.total;
  };

  const getResultsSummary = () => {
    if (!state.results) return null;

    const eligible = state.results.filter(r => r.elegivel);
    const bestOption = state.companyData ? getBestEconomicOption(state.companyData) : null;
    const recommended = state.companyData ? getRecommendedRegime(state.companyData) : null;
    const maxSavings = bestOption ? calculateMaxSavings(state.results, bestOption) : 0;

    return {
      eligibleCount: eligible.length,
      bestOption,
      recommended,
      maxSavings
    };
  };

  // ==================== RENDER ====================

  return (
    <div className={`max-w-7xl mx-auto p-6 space-y-8 ${className}`}>
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-r from-accent to-accent-subtle rounded-full flex items-center justify-center">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-sans font-bold tracking-tight">
              Simulador Tributário
            </h1>
            <p className="text-muted-foreground">
              Descubra o regime tributário ideal para sua empresa
            </p>
          </div>
        </div>

        {/* Stage indicator */}
        <div className="flex items-center justify-center gap-4">
          <Badge
            variant={state.stage === 'form' ? 'default' : 'secondary'}
            className="transition-all duration-300"
          >
            1. Dados da Empresa
          </Badge>
          <div className="w-8 h-0.5 bg-border"></div>
          <Badge
            variant={state.stage === 'results' ? 'default' : 'secondary'}
            className="transition-all duration-300"
          >
            2. Resultados
          </Badge>
        </div>
      </div>

      {/* Error Message */}
      {state.error && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <div>
                <div className="font-medium">Erro na Simulação</div>
                <div className="text-sm">{state.error}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Stage */}
      {state.stage === 'form' && (
        <CompanyDataForm
          initialData={state.companyData || initialData}
          onSubmit={handleFormSubmit}
          isLoading={false}
          className="animate-slide-up"
        />
      )}

      {/* Loading Stage */}
      {state.stage === 'loading' && (
        <Card className="text-center py-16 animate-slide-up">
          <CardContent>
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-accent to-accent-subtle rounded-full flex items-center justify-center animate-pulse">
                <RefreshCw className="w-8 h-8 text-white animate-spin" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Calculando Impostos...
                </h3>
                <p className="text-muted-foreground">
                  Analisando todos os regimes tributários disponíveis
                </p>
              </div>

              <div className="max-w-md mx-auto space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Verificando elegibilidade dos regimes</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Calculando impostos para cada regime</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <RefreshCw className="w-4 h-4 text-accent animate-spin" />
                  <span>Gerando recomendações personalizadas</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Stage */}
      {state.stage === 'results' && state.results && state.companyData && (
        <div className="space-y-8 animate-slide-up">
          {/* Results Summary Header */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Simulação Concluída com Sucesso
              </CardTitle>
            </CardHeader>
            <CardContent>
              {(() => {
                const summary = getResultsSummary();
                if (!summary) return null;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">
                        {summary.eligibleCount}
                      </div>
                      <div className="text-sm text-green-600">
                        Regimes Elegíveis
                      </div>
                    </div>

                    {summary.bestOption && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-700">
                          {formatCurrency(summary.bestOption.impostos.total)}
                        </div>
                        <div className="text-sm text-blue-600">
                          Melhor Opção Econômica
                        </div>
                        <div className="text-xs text-blue-500">
                          {summary.bestOption.regime.replace('_', ' ').toUpperCase()}
                        </div>
                      </div>
                    )}

                    {summary.maxSavings > 0 && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-700">
                          {formatCurrency(summary.maxSavings)}
                        </div>
                        <div className="text-sm text-purple-600">
                          Economia Potencial
                        </div>
                        <div className="text-xs text-purple-500">
                          vs regime mais caro
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Button
              variant="outline"
              onClick={handleEditData}
              className="shadow-soft"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Editar Dados
            </Button>

            <Button
              variant="outline"
              onClick={handleNewSimulation}
              className="shadow-soft"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Nova Simulação
            </Button>

            {onSaveSimulation && (
              <Button
                variant="outline"
                onClick={handleSaveSimulation}
                className="shadow-soft"
              >
                <Save className="w-4 h-4 mr-2" />
                Salvar Simulação
              </Button>
            )}

            {onShareResults && (
              <Button
                variant="outline"
                onClick={handleShareResults}
                className="shadow-soft"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            )}

            {onExportPDF && (
              <Button
                variant="gradient"
                onClick={handleExportPDF}
                className="shadow-glow"
              >
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
            )}
          </div>

          {/* Results Display */}
          <TaxResults
            results={state.results}
            companyData={state.companyData}
            onExportPDF={handleExportPDF}
            onShare={handleShareResults}
            className="animate-fade-in"
          />
        </div>
      )}

      {/* Bottom CTA */}
      {state.stage === 'form' && (
        <Card className="bg-gradient-to-r from-accent/5 to-accent-subtle/5 border-accent/20">
          <CardContent className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Otimize sua Carga Tributária
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Nossa simulação analisa todos os regimes tributários disponíveis e identifica
              oportunidades de economia fiscal para sua empresa, considerando as especificidades
              do seu negócio e a legislação brasileira atualizada.
            </p>
            <div className="flex flex-wrap gap-2 justify-center text-sm text-muted-foreground">
              <Badge variant="secondary">✓ Análise completa de regimes</Badge>
              <Badge variant="secondary">✓ Cálculos precisos 2024</Badge>
              <Badge variant="secondary">✓ Recomendações personalizadas</Badge>
              <Badge variant="secondary">✓ Gratuito e sem compromisso</Badge>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TaxSimulator;