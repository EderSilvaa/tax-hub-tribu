/**
 * TaxSimulator Component - Simulador Tributário Principal
 *
 * Container principal que integra o formulário e resultados
 * Cores: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Calculator,
  ArrowLeft,
  RefreshCw,
  Save,
  Share2,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Brain,
  Target,
  BarChart3
} from "lucide-react";

import CompanyDataForm from './CompanyDataForm';
import TaxResults from './TaxResults';
import {
  CompanyData,
  TaxCalculationResult,
  TaxComparison
} from '@/features/taxSimulator/lib/types';
import {
  formatCurrency,
  formatPercentage
} from '@/features/taxSimulator/lib/utils';

// Importar novos hooks
import { useTaxCalculation } from '@/features/taxSimulator/hooks/useTaxCalculation';
import { useCompanyData } from '@/features/taxSimulator/hooks/useCompanyData';

// ==================== INTERFACES ====================

export interface TaxSimulatorProps {
  className?: string;
  onSaveSimulation?: (comparison: TaxComparison) => void;
  onShareResults?: (comparison: TaxComparison) => void;
  onExportPDF?: (comparison: TaxComparison) => void;
  initialData?: Partial<CompanyData>;
  showAdvancedInsights?: boolean;
}

interface SimulatorState {
  stage: 'form' | 'results' | 'loading';
}

// ==================== MAIN COMPONENT ====================

const TaxSimulator: React.FC<TaxSimulatorProps> = ({
  className = '',
  onSaveSimulation,
  onShareResults,
  onExportPDF,
  initialData,
  showAdvancedInsights = true
}) => {
  const [state, setState] = useState<SimulatorState>({
    stage: 'form'
  });

  // Usar novos hooks
  const {
    isCalculating,
    results,
    comparison,
    error: calculationError,
    calculate,
    clear: clearCalculation,
    getBestOption,
    getEconomyAnalysis
  } = useTaxCalculation();

  const {
    data: companyData,
    isValid: isDataValid,
    errors: dataErrors,
    updateData,
    save: saveCompanyData
  } = useCompanyData(initialData);

  // ==================== EFFECTS ====================

  // Sincronizar estágio com estados dos hooks
  useEffect(() => {
    if (isCalculating) {
      setState(prev => ({ ...prev, stage: 'loading' }));
    } else if (results && results.length > 0) {
      setState(prev => ({ ...prev, stage: 'results' }));
    } else {
      setState(prev => ({ ...prev, stage: 'form' }));
    }
  }, [isCalculating, results]);

  // ==================== HANDLERS ====================

  const handleFormSubmit = async (formData: CompanyData) => {
    try {
      // Atualizar dados da empresa
      updateData(formData);

      // Salvar dados localmente
      saveCompanyData();

      // Executar cálculos usando o hook
      await calculate(formData);

      // Notificação de sucesso será mostrada pelo hook se bem-sucedido
      const economyAnalysis = getEconomyAnalysis();
      if (economyAnalysis && economyAnalysis.economiaAnual > 0) {
        toast.success('Simulação concluída!', {
          description: `Potencial economia de ${formatCurrency(economyAnalysis.economiaAnual)} identificada.`,
          action: {
            label: 'Ver Detalhes',
            onClick: () => setState(prev => ({ ...prev, stage: 'results' }))
          }
        });
      } else {
        toast.success('Análise tributária completa!', {
          description: 'Confira os resultados detalhados abaixo.'
        });
      }

    } catch (error) {
      // Error já tratado pelo hook
      console.error('Erro no submit:', error);
    }
  };

  const handleNewSimulation = () => {
    clearCalculation();
    setState({ stage: 'form' });
  };

  const handleEditData = () => {
    setState(prev => ({ ...prev, stage: 'form' }));
  };

  const handleSaveSimulation = () => {
    if (comparison && onSaveSimulation) {
      onSaveSimulation(comparison);
      toast.success('Simulação salva com sucesso!', {
        description: 'Você pode acessar suas simulações salvas a qualquer momento.'
      });
    }
  };

  const handleShareResults = () => {
    if (comparison && onShareResults) {
      onShareResults(comparison);
      toast.success('Link de compartilhamento gerado!', {
        description: 'Compartilhe os resultados com seu contador ou equipe.'
      });
    }
  };

  const handleExportPDF = () => {
    if (comparison && onExportPDF) {
      onExportPDF(comparison);
      toast.success('PDF gerado com sucesso!', {
        description: 'Relatório detalhado pronto para download.'
      });
    }
  };

  // ==================== HELPER FUNCTIONS ====================

  const getResultsSummary = () => {
    if (!results || !comparison) return null;

    const eligible = results.filter(r => r.elegivel);
    const bestOption = getBestOption();
    const economyAnalysis = getEconomyAnalysis();

    return {
      eligibleCount: eligible.length,
      bestOption,
      comparison,
      economyAnalysis,
      insights: comparison.insights || [],
      alerts: comparison.alertas || [],
      nextActions: comparison.proximasAcoes || []
    };
  };

  const getAdvancedInsights = () => {
    if (!comparison || !showAdvancedInsights) return null;

    return {
      hasInsights: comparison.insights.length > 0,
      hasAlerts: comparison.alertas.length > 0,
      hasActions: comparison.proximasAcoes.length > 0,
      economyPotential: comparison.economiaMaxima > 0
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
      {calculationError && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-3 text-red-800">
              <AlertCircle className="w-5 h-5" />
              <div>
                <div className="font-medium">Erro na Simulação</div>
                <div className="text-sm">{calculationError}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advanced Insights Banner */}
      {showAdvancedInsights && state.stage === 'results' && getAdvancedInsights()?.economyPotential && (
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardContent className="py-4">
            <div className="flex items-center gap-3 text-green-800">
              <Brain className="w-5 h-5" />
              <div>
                <div className="font-medium flex items-center gap-2">
                  Análise Inteligente Concluída
                  <Badge variant="secondary" className="text-xs">
                    IA
                  </Badge>
                </div>
                <div className="text-sm">
                  Nossa IA identificou oportunidades de otimização tributária específicas para seu negócio.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Stage */}
      {state.stage === 'form' && (
        <CompanyDataForm
          initialData={companyData}
          onSubmit={handleFormSubmit}
          isLoading={isCalculating}
          errors={dataErrors}
          className="animate-slide-up"
        />
      )}

      {/* Loading Stage */}
      {state.stage === 'loading' && (
        <Card className="text-center py-16 animate-slide-up">
          <CardContent>
            <div className="space-y-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-r from-accent to-accent-subtle rounded-full flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 text-white animate-pulse" />
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Análise Inteligente em Andamento...
                </h3>
                <p className="text-muted-foreground">
                  Nossa IA está analisando os melhores regimes tributários para seu negócio
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="max-w-md mx-auto space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progresso da Análise</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Validando dados da empresa</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Verificando elegibilidade avançada</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Calculando impostos detalhados</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Target className="w-4 h-4 text-accent animate-pulse" />
                    <span>Identificando oportunidades de economia</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <BarChart3 className="w-4 h-4 animate-pulse" />
                    <span>Gerando insights personalizados</span>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground text-center">
                  ⚡ Processamento otimizado com IA • Análise em tempo real
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Stage */}
      {state.stage === 'results' && results && comparison && (
        <div className="space-y-8 animate-slide-up">
          {/* Results Summary Header */}
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <CheckCircle className="w-5 h-5" />
                Análise Tributária Completa
                {showAdvancedInsights && (
                  <Badge variant="gradient" className="ml-2">
                    IA Enhanced
                  </Badge>
                )}
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

                    {summary.economyAnalysis && summary.economyAnalysis.economiaAnual > 0 && (
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-700">
                          {formatCurrency(summary.economyAnalysis.economiaAnual)}
                        </div>
                        <div className="text-sm text-purple-600">
                          Economia Potencial
                        </div>
                        <div className="text-xs text-purple-500">
                          {formatPercentage(summary.economyAnalysis.economiaPercentual)} de redução
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </CardContent>
          </Card>

          {/* Advanced Insights Section */}
          {showAdvancedInsights && getAdvancedInsights() && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Insights */}
              {comparison.insights.length > 0 && (
                <Card className="border-blue-200 bg-blue-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-blue-800">
                      <Brain className="w-5 h-5" />
                      Insights Inteligentes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {comparison.insights.slice(0, 3).map((insight, index) => (
                        <li key={index} className="text-sm text-blue-700 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {insight}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Alertas */}
              {comparison.alertas.length > 0 && (
                <Card className="border-amber-200 bg-amber-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-amber-800">
                      <AlertCircle className="w-5 h-5" />
                      Pontos de Atenção
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {comparison.alertas.slice(0, 3).map((alerta, index) => (
                        <li key={index} className="text-sm text-amber-700 flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {alerta}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Próximas Ações */}
              {comparison.proximasAcoes.length > 0 && (
                <Card className="border-green-200 bg-green-50/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2 text-green-800">
                      <Target className="w-5 h-5" />
                      Próximas Ações
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {comparison.proximasAcoes.slice(0, 3).map((acao, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start gap-2">
                          <Target className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          {acao}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

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
            results={results}
            companyData={companyData as CompanyData}
            comparison={comparison}
            onExportPDF={handleExportPDF}
            onShare={handleShareResults}
            showAdvancedInsights={showAdvancedInsights}
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