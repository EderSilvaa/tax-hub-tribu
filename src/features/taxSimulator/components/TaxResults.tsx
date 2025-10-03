/**
 * TaxResults Component - Exibição de Resultados da Simulação Tributária
 *
 * Mostra comparação entre regimes seguindo o design system TaxHub
 * Cores: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  TrendingUp,
  Download,
  Share2,
  BarChart3,
  Grid3X3,
  List,
  Trophy,
  Star,
  AlertCircle,
  FileText,
  Eye,
  Loader2,
  HelpCircle
} from "lucide-react";

import RegimeCard from './RegimeCard';
import {
  TaxCalculationResult,
  CompanyData,
  TaxComparison,
  TaxResultsProps
} from '@/features/taxSimulator/lib/types';
import {
  formatCurrency,
  formatPercentage
} from '@/features/taxSimulator/lib/utils';
import {
  getBestEconomicOption,
  getRecommendedRegime
} from '@/features/taxSimulator/lib/taxCalculations';
import { usePDFExport } from '@/features/taxSimulator/hooks/usePDFExport';

// ==================== MAIN COMPONENT ====================

const TaxResults: React.FC<TaxResultsProps> = ({
  results,
  companyData,
  comparison,
  className = '',
  layout = 'grid',
  showAdvancedInsights = false,
  onSelectRegime,
  onShowDetails,
  onExportPDF,
  onShare
}) => {
  const [selectedLayout, setSelectedLayout] = useState<'grid' | 'list' | 'comparison'>(layout);
  const [selectedRegime, setSelectedRegime] = useState<string | null>(null);

  // PDF Export hook
  const {
    generateAndDownloadPDF,
    previewPDF,
    sharePDF,
    isGenerating,
    isDownloading,
    error: pdfError,
    progress,
    isActive: isPDFActive,
    canShare
  } = usePDFExport();

  // Filtrar apenas regimes elegíveis
  const eligibleResults = results.filter(r => r.elegivel);
  const ineligibleResults = results.filter(r => !r.elegivel);

  // Encontrar melhor opção e recomendado
  const bestOption = getBestEconomicOption(companyData);
  const recommended = getRecommendedRegime(companyData);

  // Calcular economia máxima
  const maxEconomy = eligibleResults.reduce((max, result) => {
    return (result.economia || 0) > max ? (result.economia || 0) : max;
  }, 0);

  const handleSelectRegime = (regime: string) => {
    setSelectedRegime(regime);
    onSelectRegime?.(regime);
  };

  const handleShowDetails = (regime: string) => {
    onShowDetails?.(regime);
  };

  // PDF export handlers
  const handleExportPDF = async () => {
    try {
      await generateAndDownloadPDF(results, companyData, {
        reportTitle: 'Relatório de Simulação Tributária - TaxHub',
        fileName: `relatorio-tributario-${companyData.atividade.toLowerCase()}-${new Date().toISOString().slice(0, 10)}.pdf`
      });

      // Call parent callback if provided
      onExportPDF?.();
    } catch (error) {
      console.error('Erro ao exportar PDF:', error);
    }
  };

  const handlePreviewPDF = async () => {
    try {
      await previewPDF(results, companyData, {
        reportTitle: 'Relatório de Simulação Tributária - TaxHub'
      });
    } catch (error) {
      console.error('Erro ao fazer preview do PDF:', error);
    }
  };

  const handleSharePDF = async () => {
    try {
      await sharePDF(results, companyData, {
        reportTitle: 'Relatório de Simulação Tributária - TaxHub'
      });

      // Call parent callback if provided
      onShare?.();
    } catch (error) {
      console.error('Erro ao compartilhar PDF:', error);
    }
  };

  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Nenhum resultado encontrado</h3>
        <p className="text-muted-foreground">
          Execute uma simulação para ver os resultados aqui.
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className={`space-y-8 animate-slide-up ${className}`}>
      {/* Header com resumo e ações */}
      <div className="space-y-4 lg:space-y-6">
        {/* Resumo executivo */}
        <Card className="border border-border bg-card">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg text-foreground">
              <Trophy className="w-5 h-5 text-accent" />
              Resumo da Análise Tributária
              <Tooltip>
                <TooltipTrigger asChild>
                  <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-accent cursor-help" />
                </TooltipTrigger>
                <TooltipContent className="max-w-sm">
                  <p className="text-xs">
                    Comparação automática entre todos os regimes tributários disponíveis para sua empresa, mostrando economia potencial e recomendações personalizadas.
                  </p>
                </TooltipContent>
              </Tooltip>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Melhor opção econômica */}
              {bestOption && (
                <div className="text-center p-4 border border-border rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {formatCurrency(bestOption.impostos.total)}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Melhor Opção Econômica
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {bestOption.regime.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              )}

              {/* Economia máxima */}
              {maxEconomy > 0 && (
                <div className="text-center p-4 border border-border rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency(maxEconomy)}
                  </div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Economia Máxima
                  </div>
                  <div className="text-xs text-muted-foreground">
                    vs regime mais caro
                  </div>
                </div>
              )}

              {/* Regime recomendado */}
              {recommended && (
                <div className="text-center p-4 border border-border rounded-lg bg-muted/30">
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {recommended.scoreRecomendacao}/100
                  </div>
                  <div className="text-xs font-medium text-muted-foreground mb-2">
                    Regime Recomendado
                  </div>
                  <div className="text-xs text-accent font-medium">
                    {recommended.regime.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {/* Insights principais */}
            {bestOption && recommended && bestOption.regime !== recommended.regime && (
              <div className="p-3 border border-border rounded-lg bg-muted/20">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="text-sm font-medium text-foreground mb-1">
                      Insight Importante
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      A melhor opção econômica ({bestOption.regime.replace('_', ' ')}) é diferente
                      do regime recomendado ({recommended.regime.replace('_', ' ')}).
                      Considere fatores além do custo, como complexidade operacional e crescimento futuro.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Advanced Comparative Analysis */}
        {showAdvancedInsights && comparison && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Análise de Economia */}
            {comparison.economiaMaxima > 0 && (
              <Card className="border border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                    <TrendingUp className="w-4 h-4 text-accent" />
                    Análise de Economia
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-center p-3 border border-border rounded-lg bg-muted/20">
                    <div className="text-xl font-bold text-accent mb-1">
                      {formatCurrency(comparison.economiaMaxima)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Economia potencial anual
                    </div>
                  </div>
                  {comparison.economiaMaxima > 0 && (
                    <div className="p-2 border border-border rounded bg-muted/10">
                      <div className="text-xs text-muted-foreground leading-relaxed">
                        Ao otimizar seu regime tributário, você pode economizar até{' '}
                        <span className="font-medium text-foreground">
                          {formatCurrency(comparison.economiaMaxima / 12)} por mês
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Insights Inteligentes */}
            {comparison.insights.length > 0 && (
              <Card className="border border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                    <Eye className="w-4 h-4 text-accent" />
                    Insights Inteligentes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {comparison.insights.slice(0, 3).map((insight, index) => (
                      <div key={index} className="p-2 border border-border rounded bg-muted/10">
                        <div className="flex items-start gap-2">
                          <Star className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {insight}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {comparison.insights.length > 3 && (
                    <div className="text-xs text-muted-foreground mt-2 p-2 border border-border rounded bg-muted/5">
                      +{comparison.insights.length - 3} insights adicionais no relatório PDF
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Alertas e Recomendações */}
            {comparison.alertas.length > 0 && (
              <Card className="border border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                    <AlertCircle className="w-4 h-4 text-accent" />
                    Pontos de Atenção
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {comparison.alertas.slice(0, 2).map((alerta, index) => (
                      <div key={index} className="p-2 border border-border rounded bg-muted/10">
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-3 h-3 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {alerta}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Próximas Ações */}
            {comparison.proximasAcoes.length > 0 && (
              <Card className="border border-border bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-foreground">
                    <FileText className="w-4 h-4 text-accent" />
                    Próximas Ações
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {comparison.proximasAcoes.slice(0, 3).map((acao, index) => (
                      <div key={index} className="p-2 border border-border rounded bg-muted/10">
                        <div className="flex items-start gap-2">
                          <div className="w-4 h-4 border border-border rounded-full flex items-center justify-center flex-shrink-0 bg-muted">
                            <span className="text-xs font-medium text-muted-foreground">
                              {index + 1}
                            </span>
                          </div>
                          <span className="text-xs text-muted-foreground leading-relaxed">
                            {acao}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Toolbar com layout e ações */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-foreground">Layout:</span>
            <div className="flex gap-1">
              <Button
                variant={selectedLayout === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedLayout('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedLayout === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedLayout('list')}
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={selectedLayout === 'comparison' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedLayout('comparison')}
              >
                <BarChart3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {/* PDF Actions */}
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviewPDF}
              disabled={isPDFActive}
            >
              {isGenerating ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Eye className="w-4 h-4 mr-2" />
              )}
              Preview PDF
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportPDF}
              disabled={isPDFActive}
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Download className="w-4 h-4 mr-2" />
              )}
              Baixar PDF
            </Button>

            {canShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleSharePDF}
                disabled={isPDFActive}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            )}

            {/* Legacy callbacks for backward compatibility */}
            {onShare && !canShare && (
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            )}
          </div>
        </div>

        {/* PDF Progress/Error Feedback */}
        {isPDFActive && (
          <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-3">
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
              <div className="flex-1">
                <div className="text-sm font-medium text-blue-900">
                  {isGenerating && 'Gerando relatório PDF...'}
                  {isDownloading && 'Preparando download...'}
                </div>
                {progress > 0 && (
                  <div className="mt-1 w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {pdfError && (
          <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <div>
                <div className="text-sm font-medium text-red-900">Erro ao gerar PDF</div>
                <div className="text-sm text-red-700">{pdfError}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Regimes elegíveis */}
      {eligibleResults.length > 0 && (
        <div className="space-y-4 lg:space-y-6">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-sans font-semibold tracking-tight">
              Regimes Elegíveis
            </h2>
            <Badge variant="secondary">
              {eligibleResults.length} opção{eligibleResults.length !== 1 ? 'ões' : ''}
            </Badge>
          </div>

          {/* Grid layout */}
          {selectedLayout === 'grid' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {eligibleResults.map((result) => (
                <RegimeCard
                  key={result.regime}
                  result={result}
                  isBest={bestOption?.regime === result.regime}
                  isRecommended={recommended?.regime === result.regime}
                  isSelected={selectedRegime === result.regime}
                  showAdvancedInsights={showAdvancedInsights}
                  onClick={() => handleSelectRegime(result.regime)}
                  onShowDetails={() => handleShowDetails(result.regime)}
                />
              ))}
            </div>
          )}

          {/* List layout */}
          {selectedLayout === 'list' && (
            <div className="space-y-4">
              {eligibleResults.map((result) => (
                <RegimeCard
                  key={result.regime}
                  result={result}
                  isBest={bestOption?.regime === result.regime}
                  isRecommended={recommended?.regime === result.regime}
                  isSelected={selectedRegime === result.regime}
                  variant="highlighted"
                  onSelect={() => handleSelectRegime(result.regime)}
                  onShowDetails={() => handleShowDetails(result.regime)}
                />
              ))}
            </div>
          )}

          {/* Comparison layout */}
          {selectedLayout === 'comparison' && (
            <div className="space-y-6">
              {/* Tabela comparativa */}
              <Card>
                <CardHeader>
                  <CardTitle>Comparação Rápida</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Regime</th>
                          <th className="text-right py-2 font-medium">Valor Anual</th>
                          <th className="text-right py-2 font-medium">Alíquota</th>
                          <th className="text-right py-2 font-medium">Score</th>
                          <th className="text-center py-2 font-medium">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {eligibleResults.map((result) => (
                          <tr
                            key={result.regime}
                            className="border-b hover:bg-muted/50 cursor-pointer"
                            onClick={() => handleSelectRegime(result.regime)}
                          >
                            <td className="py-3">
                              <div className="flex items-center gap-2">
                                {bestOption?.regime === result.regime && (
                                  <Trophy className="w-4 h-4 text-accent" />
                                )}
                                {recommended?.regime === result.regime && (
                                  <Star className="w-4 h-4 text-accent-subtle" />
                                )}
                                <span className="font-medium">
                                  {result.regime.replace('_', ' ').toUpperCase()}
                                </span>
                              </div>
                            </td>
                            <td className="text-right py-3 font-medium">
                              {formatCurrency(result.impostos.total)}
                            </td>
                            <td className="text-right py-3">
                              {(result.impostos.aliquotaEfetiva * 100).toFixed(2)}%
                            </td>
                            <td className="text-right py-3">
                              <Badge variant="secondary" size="sm">
                                {result.scoreRecomendacao}/100
                              </Badge>
                            </td>
                            <td className="text-center py-3">
                              {bestOption?.regime === result.regime && (
                                <Badge variant="gradient" size="sm">Melhor</Badge>
                              )}
                              {recommended?.regime === result.regime && (
                                <Badge variant="outline" size="sm">Recomendado</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Cards detalhados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {eligibleResults.map((result) => (
                  <RegimeCard
                    key={result.regime}
                    result={result}
                    isBest={bestOption?.regime === result.regime}
                    isRecommended={recommended?.regime === result.regime}
                    isSelected={selectedRegime === result.regime}
                    variant="compact"
                    showDetails={false}
                    onSelect={() => handleSelectRegime(result.regime)}
                    onShowDetails={() => handleShowDetails(result.regime)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Regimes não elegíveis */}
      {ineligibleResults.length > 0 && (
        <div className="space-y-4 lg:space-y-6">
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-sans font-semibold tracking-tight text-muted-foreground">
              Regimes Não Elegíveis
            </h3>
            <Badge variant="secondary" className="text-muted-foreground">
              {ineligibleResults.length} regime{ineligibleResults.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ineligibleResults.map((result) => (
              <RegimeCard
                key={result.regime}
                result={result}
                variant="compact"
                showDetails={false}
                onShowDetails={() => handleShowDetails(result.regime)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Call to action */}
      <Card className="bg-gradient-to-r from-accent/5 to-accent-subtle/5 border-accent/20">
        <CardContent className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-accent mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            Pronto para Implementar?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Nossa equipe pode ajudar você a migrar para o regime mais vantajoso
            e implementar todas as estratégias de economia identificadas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="lg" className="shadow-glow">
              Falar com Especialista
            </Button>
            <Button variant="outline" size="lg">
              Agendar Consultoria
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
};

export default TaxResults;