/**
 * RegimeCard Component - Card de Regime Tributário
 *
 * Exibe informações de um regime tributário específico seguindo o design system TaxHub
 * Cores: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Info,
  Star,
  DollarSign
} from "lucide-react";

import {
  TaxCalculationResult,
  TaxRegime
} from '@/features/taxSimulator/lib/types';
import {
  formatCurrency,
  formatPercentage
} from '@/features/taxSimulator/lib/utils';

// ==================== INTERFACES ====================

export interface RegimeCardProps {
  result: TaxCalculationResult;
  isBest?: boolean;
  isRecommended?: boolean;
  isSelected?: boolean;
  variant?: 'default' | 'highlighted' | 'compact';
  showDetails?: boolean;
  onSelect?: () => void;
  onShowDetails?: () => void;
  className?: string;
}

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
  onSelect,
  onShowDetails,
  className = ''
}) => {
  const regimeInfo = getRegimeInfo(result.regime);
  const StatusIcon = getStatusIcon(result.elegivel, result.recomendado);
  const statusColor = getStatusColor(result.elegivel, result.recomendado);

  // Classes CSS baseadas no variant e estados
  const cardClasses = [
    'group transition-all duration-300',
    variant === 'highlighted' || isBest ? 'ring-2 ring-accent shadow-glow' : '',
    variant === 'compact' ? 'p-4' : '',
    isSelected ? 'ring-2 ring-accent-subtle' : '',
    result.elegivel ? 'hover-lift cursor-pointer' : 'opacity-60',
    className
  ].filter(Boolean).join(' ');

  const handleCardClick = () => {
    if (result.elegivel && onSelect) {
      onSelect();
    }
  };

  return (
    <Card className={cardClasses} onClick={handleCardClick}>
      <CardHeader className="pb-4">
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

        <CardTitle className="text-xl font-sans font-semibold tracking-tight">
          {regimeInfo.fullName}
        </CardTitle>

        {variant !== 'compact' && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {regimeInfo.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-6">
        {result.elegivel ? (
          <>
            {/* Valores principais */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-accent to-accent-subtle bg-clip-text text-transparent">
                  {formatCurrency(result.impostos.total)}
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                  impostos por ano
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-lg font-semibold text-foreground">
                    {formatPercentage(result.impostos.aliquotaEfetiva)}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    alíquota efetiva
                  </div>
                </div>
                <div>
                  <div className="text-lg font-semibold text-foreground">
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
                <div className="text-xs text-red-600">
                  ({formatPercentage(result.economiaPercentual || 0)} a mais)
                </div>
              </div>
            )}

            {/* Breakdown de impostos */}
            {showDetails && variant !== 'compact' && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-foreground">
                  Breakdown de Impostos:
                </h4>

                <div className="space-y-2 text-sm">
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
                <h4 className="text-sm font-medium text-foreground">
                  Principais Vantagens:
                </h4>
                <div className="space-y-1">
                  {result.vantagens.slice(0, 3).map((vantagem, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground leading-relaxed">
                        {vantagem}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            {onShowDetails && variant !== 'compact' && (
              <div className="pt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full text-accent hover:text-accent hover:bg-accent/10 group-hover:bg-accent/20 transition-all duration-300"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShowDetails();
                  }}
                >
                  <Info className="w-4 h-4 mr-2" />
                  Ver Detalhes Completos
                </Button>
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