/**
 * RegimeCard Component - Card de Regime Tributário
 *
 * Exibe informações de um regime tributário específico seguindo o design system TaxHub
 * Cores: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Info,
  Star,
  DollarSign,
  Calculator,
  FileText,
  Target,
  AlertCircle
} from "lucide-react";

import {
  TaxCalculationResult,
  TaxRegime,
  RegimeCardProps
} from '@/features/taxSimulator/lib/types';
import {
  formatCurrency,
  formatPercentage
} from '@/features/taxSimulator/lib/utils';

// ==================== HELPER FUNCTIONS ====================

const getRegimeInfo = (regime: TaxRegime) => {
  const info = {
    [TaxRegime.MEI]: {
      name: 'MEI',
      fullName: 'Microempreendedor Individual',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      icon: '👤',
      description: 'Regime simplificado com valor fixo mensal'
    },
    [TaxRegime.SIMPLES_NACIONAL]: {
      name: 'Simples Nacional',
      fullName: 'Simples Nacional',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      icon: '📊',
      description: 'Regime unificado com alíquotas progressivas'
    },
    [TaxRegime.LUCRO_PRESUMIDO]: {
      name: 'Lucro Presumido',
      fullName: 'Lucro Presumido',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      icon: '📈',
      description: 'Tributação sobre margem presumida de lucro'
    },
    [TaxRegime.LUCRO_REAL]: {
      name: 'Lucro Real',
      fullName: 'Lucro Real',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      icon: '🏢',
      description: 'Tributação sobre lucro líquido real'
    }
  };

  return info[regime] || {
    name: regime,
    fullName: regime,
    color: 'text-gray-600',
    bgColor: 'bg-gray-50',
    icon: '📄',
    description: 'Regime tributário'
  };
};

const getStatusColor = (elegivel: boolean, recomendado: boolean) => {
  if (!elegivel) return 'text-red-600';
  if (recomendado) return 'text-green-600';
  return 'text-orange-600';
};

const getStatusIcon = (elegivel: boolean, recomendado: boolean) => {
  if (!elegivel) return AlertTriangle;
  if (recomendado) return CheckCircle;
  return Info;
};

// ==================== MAIN COMPONENT ====================

const RegimeCard: React.FC<RegimeCardProps> = ({
  result,
  isBest = false,
  isRecommended = false,
  isSelected = false,
  variant = 'default',
  showDetails = true,
  showAdvancedInsights = false,
  className,
  onClick,
  onShowDetails
}) => {
  const regimeInfo = getRegimeInfo(result.regime);
  const StatusIcon = getStatusIcon(result.elegivel, result.recomendado);
  const statusColor = getStatusColor(result.elegivel, result.recomendado);

  // Gerar insights inteligentes
  const getSmartInsights = () => {
    if (!showAdvancedInsights || !result.elegivel) return [];

    const insights: string[] = [];

    // Insights específicos por regime
    switch (result.regime) {
      case TaxRegime.MEI:
        if (result.impostos.aliquotaEfetiva < 0.02) {
          insights.push('💡 Carga tributária extremamente baixa');
        }
        insights.push('⚡ Ideal para operação simples');
        break;

      case TaxRegime.SIMPLES_NACIONAL:
        if (result.impostos.aliquotaEfetiva < 0.10) {
          insights.push('💡 Alíquota competitiva para seu faturamento');
        }
        if (result.scoreRecomendacao > 80) {
          insights.push('⭐ Altamente recomendado para seu perfil');
        }
        break;

      case TaxRegime.LUCRO_PRESUMIDO:
        if (result.scoreRecomendacao > 70) {
          insights.push('📈 Margem presumida favorável');
        }
        insights.push('⚖️ Tributação previsível');
        break;

      case TaxRegime.LUCRO_REAL:
        if (result.impostos.aliquotaEfetiva < 0.15) {
          insights.push('💰 Baixa margem favorece este regime');
        }
        insights.push('🔍 Tributação sobre lucro real');
        break;
    }

    // Insights baseados no score
    if (result.scoreRecomendacao >= 90) {
      insights.push('🏆 Excelente opção para seu caso');
    } else if (result.scoreRecomendacao >= 70) {
      insights.push('✅ Boa opção a considerar');
    }

    return insights.slice(0, 2); // Máximo 2 insights
  };

  const smartInsights = getSmartInsights();

  // Classes CSS baseadas no variant e estados
  const cardClasses = [
    'group transition-all duration-300 h-full flex flex-col',
    variant === 'highlighted' || isBest ? 'ring-2 ring-accent shadow-glow' : '',
    variant === 'compact' ? 'p-4' : '',
    isSelected ? 'ring-2 ring-accent-subtle' : '',
    result.elegivel ? 'hover-lift cursor-pointer hover:shadow-md' : 'opacity-60',
    'min-h-[450px]', // Altura mínima fixa para todos os cards
    className
  ].filter(Boolean).join(' ');

  const handleCardClick = () => {
    if (result.elegivel && onClick) {
      onClick();
    }
  };

  return (
    <Card className={cardClasses} onClick={handleCardClick}>
      <CardHeader className="pb-3">
        {/* Header com badges e status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full ${regimeInfo.bgColor} flex items-center justify-center text-sm`}>
              {regimeInfo.icon}
            </div>
            <Badge
              variant="secondary"
              className={`${regimeInfo.color} ${regimeInfo.bgColor} border-0`}
            >
              {regimeInfo.name}
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {isBest && (
              <Badge variant="gradient" size="sm" className="shadow-glow">
                🏆 Melhor
              </Badge>
            )}
            {isRecommended && (
              <Badge variant="gradient" size="sm">
                <Star className="w-3 h-3 mr-1" />
                Recomendado
              </Badge>
            )}
            <StatusIcon className={`w-5 h-5 ${statusColor}`} />
          </div>
        </div>

        <CardTitle className="text-lg font-sans font-semibold tracking-tight leading-tight">
          {regimeInfo.fullName}
        </CardTitle>

        {variant !== 'compact' && (
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {regimeInfo.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        {result.elegivel ? (
          <>
            {/* Valores principais */}
            <div className="space-y-4">
              <div className="text-center py-2">
                <div className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-accent to-accent-subtle bg-clip-text text-transparent">
                  {formatCurrency(result.impostos.total)}
                </div>
                <div className="text-sm text-muted-foreground font-medium mt-1">
                  impostos por ano
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center bg-muted/30 rounded-lg p-3">
                <div>
                  <div className="text-base font-semibold text-foreground">
                    {formatPercentage(result.impostos.aliquotaEfetiva)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    alíquota efetiva
                  </div>
                </div>
                <div>
                  <div className="text-base font-semibold text-foreground">
                    {result.scoreRecomendacao}/100
                  </div>
                  <div className="text-xs text-muted-foreground">
                    score
                  </div>
                </div>
              </div>
            </div>

            {/* Economia comparativa */}
            {result.economia && result.economia > 0 && (
              <div className="text-center p-3 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm font-medium text-red-700">
                  +{formatCurrency(result.economia)} vs melhor opção
                </div>
                <div className="text-xs text-red-600 mt-1">
                  ({formatPercentage(result.economiaPercentual || 0)} a mais)
                </div>
              </div>
            )}

            {/* Smart Insights */}
            {smartInsights.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 text-accent" />
                  Insights Inteligentes:
                </h4>
                <div className="space-y-1">
                  {smartInsights.map((insight, index) => (
                    <div
                      key={index}
                      className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded border border-blue-200"
                    >
                      {insight}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Breakdown de impostos */}
            {showDetails && variant !== 'compact' && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
                  Breakdown de Impostos:
                </h4>

                <div className="space-y-2 text-sm bg-muted/20 rounded-lg p-3">
                  {result.impostos.simplesNacional && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Simples Nacional:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.simplesNacional)}</span>
                    </div>
                  )}

                  {result.impostos.irpj && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IRPJ:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.irpj)}</span>
                    </div>
                  )}

                  {result.impostos.csll && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CSLL:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.csll)}</span>
                    </div>
                  )}

                  {result.impostos.pis && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PIS:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.pis)}</span>
                    </div>
                  )}

                  {result.impostos.cofins && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">COFINS:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.cofins)}</span>
                    </div>
                  )}

                  {result.impostos.icms && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ICMS:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.icms)}</span>
                    </div>
                  )}

                  {result.impostos.iss && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ISS:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.iss)}</span>
                    </div>
                  )}

                  {result.impostos.cpp && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CPP:</span>
                      <span className="font-medium">{formatCurrency(result.impostos.cpp)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Principais vantagens */}
            {showDetails && result.vantagens.length > 0 && variant !== 'compact' && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
                  Principais Vantagens:
                </h4>
                <div className="space-y-2 bg-green-50/50 rounded-lg p-3">
                  {result.vantagens.slice(0, 3).map((vantagem, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed text-xs line-clamp-2">
                        {vantagem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {variant !== 'compact' && (
              <div className="pt-2 mt-auto">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-accent hover:text-accent hover:bg-accent/10 group-hover:bg-accent/20 transition-all duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Ver Detalhes Completos
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2 text-xl">
                        {regimeInfo.icon} {regimeInfo.fullName}
                        {isBest && <Badge variant="gradient" size="sm">🏆 Melhor Opção</Badge>}
                        {isRecommended && <Badge variant="gradient" size="sm">⭐ Recomendado</Badge>}
                      </DialogTitle>
                      <DialogDescription className="text-base">
                        {regimeInfo.description}
                      </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                      {/* Resumo Financeiro */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center p-4 border border-border rounded-lg bg-muted/20">
                          <div className="text-2xl font-bold text-accent mb-1">
                            {formatCurrency(result.impostos.total)}
                          </div>
                          <div className="text-sm text-muted-foreground">Total de Impostos/Ano</div>
                        </div>
                        <div className="text-center p-4 border border-border rounded-lg bg-muted/20">
                          <div className="text-2xl font-bold text-foreground mb-1">
                            {formatPercentage(result.impostos.aliquotaEfetiva)}
                          </div>
                          <div className="text-sm text-muted-foreground">Alíquota Efetiva</div>
                        </div>
                        <div className="text-center p-4 border border-border rounded-lg bg-muted/20">
                          <div className="text-2xl font-bold text-foreground mb-1">
                            {result.scoreRecomendacao}/100
                          </div>
                          <div className="text-sm text-muted-foreground">Score de Recomendação</div>
                        </div>
                      </div>

                      {/* Breakdown Detalhado */}
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                          <Calculator className="w-5 h-5 text-accent" />
                          Breakdown Detalhado de Impostos
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {result.impostos.simplesNacional && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Simples Nacional</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.simplesNacional)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.irpj && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">IRPJ</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.irpj)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.csll && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">CSLL</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.csll)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.pis && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">PIS</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.pis)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.cofins && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">COFINS</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.cofins)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.icms && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">ICMS</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.icms)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.iss && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">ISS</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.iss)}</span>
                              </div>
                            </div>
                          )}
                          {result.impostos.cpp && (
                            <div className="p-3 border border-border rounded bg-muted/10">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">CPP</span>
                                <span className="text-accent font-bold">{formatCurrency(result.impostos.cpp)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Vantagens e Desvantagens */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Vantagens */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-green-700">
                            <CheckCircle className="w-5 h-5" />
                            Vantagens
                          </h3>
                          <div className="space-y-2">
                            {result.vantagens.map((vantagem, index) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-green-50 rounded border border-green-200">
                                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-green-800">{vantagem}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Desvantagens */}
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-red-700">
                            <AlertCircle className="w-5 h-5" />
                            Desvantagens
                          </h3>
                          <div className="space-y-2">
                            {result.desvantagens.map((desvantagem, index) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-red-50 rounded border border-red-200">
                                <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-red-800">{desvantagem}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Limitações */}
                      {result.limitacoes.length > 0 && (
                        <div className="space-y-3">
                          <h3 className="text-lg font-semibold flex items-center gap-2 text-amber-700">
                            <Target className="w-5 h-5" />
                            Limitações e Critérios
                          </h3>
                          <div className="space-y-2">
                            {result.limitacoes.map((limitacao, index) => (
                              <div key={index} className="flex items-start gap-2 p-2 bg-amber-50 rounded border border-amber-200">
                                <Target className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-amber-800">{limitacao}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Call to Action */}
                      <div className="flex gap-2 pt-4">
                        <Button className="flex-1" size="lg">
                          💬 Falar com Especialista
                        </Button>
                        <Button variant="outline" size="lg">
                          📄 Baixar Relatório PDF
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            )}

          </>
        ) : (
          /* Estado não elegível */
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-50 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>

            <div>
              <h4 className="font-medium text-foreground mb-2">
                Não Elegível
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {result.motivoInelegibilidade || 'Esta empresa não se enquadra nos critérios deste regime.'}
              </p>
            </div>

            {/* Principais limitações */}
            {result.limitacoes.length > 0 && (
              <div className="space-y-2 text-left">
                <h5 className="text-sm font-medium text-foreground">
                  Principais Limitações:
                </h5>
                <div className="space-y-1">
                  {result.limitacoes.slice(0, 2).map((limitacao, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <AlertTriangle className="w-4 h-4 text-orange-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {limitacao}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RegimeCard;