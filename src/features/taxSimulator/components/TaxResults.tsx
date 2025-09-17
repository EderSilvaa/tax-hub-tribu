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
  TrendingUp,
  Download,
  Share2,
  BarChart3,
  Grid3X3,
  List,
  Trophy,
  Star,
  AlertCircle
} from "lucide-react";

import RegimeCard from './RegimeCard';
import {
  TaxCalculationResult,
  CompanyData
} from '@/features/taxSimulator/lib/types';
import {
  formatCurrency
} from '@/features/taxSimulator/lib/utils';
import {
  getBestEconomicOption,
  getRecommendedRegime
} from '@/features/taxSimulator/lib/taxCalculations';

// ==================== INTERFACES ====================

export interface TaxResultsProps {
  results: TaxCalculationResult[];
  companyData: CompanyData;
  className?: string;
  layout?: 'grid' | 'list' | 'comparison';
  onSelectRegime?: (regime: string) => void;
  onShowDetails?: (regime: string) => void;
  onExportPDF?: () => void;
  onShare?: () => void;
}

// ==================== MAIN COMPONENT ====================

const TaxResults: React.FC<TaxResultsProps> = ({
  results,
  companyData,
  className = '',
  layout = 'grid',
  onSelectRegime,
  onShowDetails,
  onExportPDF,
  onShare
}) => {
  const [selectedLayout, setSelectedLayout] = useState<'grid' | 'list' | 'comparison'>(layout);
  const [selectedRegime, setSelectedRegime] = useState<string | null>(null);

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
    <div className={`space-y-8 animate-slide-up ${className}`}>
      {/* Header com resumo e ações */}
      <div className="space-y-6">
        {/* Resumo executivo */}
        <Card className="bg-gradient-to-r from-accent/5 to-accent-subtle/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Trophy className="w-5 h-5 text-accent" />
              Resumo da Análise Tributária
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Melhor opção econômica */}
              {bestOption && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent mb-1">
                    {formatCurrency(bestOption.impostos.total)}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    🏆 Melhor Opção Econômica
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {bestOption.regime.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              )}

              {/* Economia máxima */}
              {maxEconomy > 0 && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">
                    {formatCurrency(maxEconomy)}
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    💰 Economia Máxima
                  </div>
                  <div className="text-sm text-muted-foreground">
                    vs regime mais caro
                  </div>
                </div>
              )}

              {/* Regime recomendado */}
              {recommended && (
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent-subtle mb-1">
                    {recommended.scoreRecomendacao}/100
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    ⭐ Regime Recomendado
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {recommended.regime.replace('_', ' ').toUpperCase()}
                  </div>
                </div>
              )}
            </div>

            {/* Insights principais */}
            {bestOption && recommended && bestOption.regime !== recommended.regime && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-blue-900 mb-1">
                      💡 Insight Importante
                    </div>
                    <p className="text-sm text-blue-800 leading-relaxed">
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

          <div className="flex gap-2">
            {onExportPDF && (
              <Button variant="outline" size="sm" onClick={onExportPDF}>
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
            )}
            {onShare && (
              <Button variant="outline" size="sm" onClick={onShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Regimes elegíveis */}
      {eligibleResults.length > 0 && (
        <div className="space-y-6">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {eligibleResults.map((result) => (
                <RegimeCard
                  key={result.regime}
                  result={result}
                  isBest={bestOption?.regime === result.regime}
                  isRecommended={recommended?.regime === result.regime}
                  isSelected={selectedRegime === result.regime}
                  onSelect={() => handleSelectRegime(result.regime)}
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
        <div className="space-y-6">
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
  );
};

export default TaxResults;