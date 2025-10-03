/**
 * TaxReportPDF Component - Geração de Relatório PDF
 *
 * Template profissional para export de resultados da simulação tributária
 * Seguindo o design system TaxHub com branding corporativo
 */

import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet
} from '@react-pdf/renderer';

import {
  TaxCalculationResult,
  CompanyData
} from '@/features/taxSimulator/lib/types';
import {
  formatCurrency,
  formatPercentage
} from '@/features/taxSimulator/lib/utils';

// ==================== INTERFACES ====================

export interface TaxReportPDFProps {
  results: TaxCalculationResult[];
  companyData: CompanyData;
  generatedAt?: Date;
  reportTitle?: string;
}

// ==================== STYLES ====================

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 40,
    fontFamily: 'Helvetica',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#8B4513', // TaxHub accent color
  },

  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#8B4513',
  },

  logoSubtitle: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },

  headerInfo: {
    textAlign: 'right',
  },

  reportTitle: {
    fontSize: 12,
    color: '#333333',
    fontWeight: 'bold',
  },

  reportDate: {
    fontSize: 10,
    color: '#666666',
    marginTop: 2,
  },

  // Company Info
  companySection: {
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
  },

  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },

  companyGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  companyColumn: {
    flex: 1,
    marginRight: 10,
  },

  companyField: {
    flexDirection: 'row',
    marginBottom: 5,
  },

  fieldLabel: {
    fontSize: 10,
    color: '#666666',
    width: 80,
  },

  fieldValue: {
    fontSize: 10,
    color: '#333333',
    fontWeight: 'bold',
    flex: 1,
  },

  // Results Section
  resultsSection: {
    marginBottom: 25,
  },

  summaryCard: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },

  summaryTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 8,
  },

  summaryText: {
    fontSize: 10,
    color: '#333333',
    lineHeight: 1.4,
  },

  // Regime Cards
  regimeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  regimeCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },

  regimeCardBest: {
    borderColor: '#8B4513',
    borderWidth: 2,
    backgroundColor: '#FFF8DC',
  },

  regimeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  regimeName: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#333333',
  },

  regimeBadge: {
    backgroundColor: '#8B4513',
    color: '#FFFFFF',
    fontSize: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },

  regimeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8B4513',
    textAlign: 'center',
    marginBottom: 5,
  },

  regimeLabel: {
    fontSize: 8,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },

  regimeDetails: {
    marginTop: 8,
  },

  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 3,
  },

  detailLabel: {
    fontSize: 8,
    color: '#666666',
  },

  detailValue: {
    fontSize: 8,
    color: '#333333',
    fontWeight: 'bold',
  },

  // Breakdown Section
  breakdownSection: {
    marginTop: 20,
  },

  breakdownTable: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
  },

  tableHeader: {
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },

  tableRow: {
    flexDirection: 'row',
    padding: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },

  tableCell: {
    flex: 1,
    fontSize: 9,
    color: '#333333',
  },

  tableCellHeader: {
    flex: 1,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#333333',
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
  },

  footerText: {
    fontSize: 8,
    color: '#666666',
  },

  // Recommendations
  recommendationsSection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#FFF8DC',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFB000',
  },

  recommendationTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#8B4513',
    marginBottom: 8,
  },

  recommendationItem: {
    fontSize: 10,
    color: '#333333',
    marginBottom: 4,
    paddingLeft: 10,
  },
});

// ==================== HELPER FUNCTIONS ====================

const getRegimeName = (regime: string): string => {
  const names = {
    'MEI': 'Microempreendedor Individual',
    'SIMPLES_NACIONAL': 'Simples Nacional',
    'LUCRO_PRESUMIDO': 'Lucro Presumido',
    'LUCRO_REAL': 'Lucro Real'
  };
  return names[regime as keyof typeof names] || regime;
};

const getBestRegime = (results: TaxCalculationResult[]): TaxCalculationResult | null => {
  const eligibleResults = results.filter(r => r.elegivel);
  if (eligibleResults.length === 0) return null;

  return eligibleResults.reduce((best, current) =>
    current.impostos.total < best.impostos.total ? current : best
  );
};

const calculateTotalEconomy = (results: TaxCalculationResult[]): number => {
  const eligibleResults = results.filter(r => r.elegivel);
  if (eligibleResults.length < 2) return 0;

  const sortedResults = eligibleResults.sort((a, b) => a.impostos.total - b.impostos.total);
  return sortedResults[sortedResults.length - 1].impostos.total - sortedResults[0].impostos.total;
};

// ==================== MAIN COMPONENT ====================

const TaxReportPDF: React.FC<TaxReportPDFProps> = ({
  results,
  companyData,
  generatedAt = new Date(),
  reportTitle = "Relatório de Simulação Tributária"
}) => {
  const bestRegime = getBestRegime(results);
  const totalEconomy = calculateTotalEconomy(results);
  const eligibleResults = results.filter(r => r.elegivel);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>TaxHub</Text>
            <Text style={styles.logoSubtitle}>Inteligência Tributária</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.reportTitle}>{reportTitle}</Text>
            <Text style={styles.reportDate}>
              Gerado em: {generatedAt.toLocaleDateString('pt-BR')} às {generatedAt.toLocaleTimeString('pt-BR')}
            </Text>
          </View>
        </View>

        {/* Company Information */}
        <View style={styles.companySection}>
          <Text style={styles.sectionTitle}>📊 Dados da Empresa</Text>
          <View style={styles.companyGrid}>
            <View style={styles.companyColumn}>
              <View style={styles.companyField}>
                <Text style={styles.fieldLabel}>Faturamento:</Text>
                <Text style={styles.fieldValue}>{formatCurrency(companyData.faturamentoAnual)} / ano</Text>
              </View>
              <View style={styles.companyField}>
                <Text style={styles.fieldLabel}>Atividade:</Text>
                <Text style={styles.fieldValue}>{companyData.atividade.replace(/_/g, ' ')}</Text>
              </View>
              <View style={styles.companyField}>
                <Text style={styles.fieldLabel}>Setor:</Text>
                <Text style={styles.fieldValue}>{companyData.setor.replace(/_/g, ' ')}</Text>
              </View>
            </View>
            <View style={styles.companyColumn}>
              <View style={styles.companyField}>
                <Text style={styles.fieldLabel}>Estado:</Text>
                <Text style={styles.fieldValue}>{companyData.estadoOperacao}</Text>
              </View>
              <View style={styles.companyField}>
                <Text style={styles.fieldLabel}>Funcionários:</Text>
                <Text style={styles.fieldValue}>{companyData.numeroFuncionarios}</Text>
              </View>
              <View style={styles.companyField}>
                <Text style={styles.fieldLabel}>Regime Atual:</Text>
                <Text style={styles.fieldValue}>{companyData.regimeAtual.replace(/_/g, ' ')}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Summary */}
        {bestRegime && (
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>🏆 Resumo Executivo</Text>
            <Text style={styles.summaryText}>
              O regime tributário mais vantajoso para sua empresa é o {getRegimeName(bestRegime.regime)},
              com um custo anual de {formatCurrency(bestRegime.impostos.total)} em impostos
              ({formatPercentage(bestRegime.impostos.aliquotaEfetiva)} de alíquota efetiva).
              {totalEconomy > 0 && ` Economia potencial de até ${formatCurrency(totalEconomy)} por ano comparado ao regime mais caro.`}
            </Text>
          </View>
        )}

        {/* Results */}
        <View style={styles.resultsSection}>
          <Text style={styles.sectionTitle}>📈 Comparação de Regimes Tributários</Text>
          <View style={styles.regimeGrid}>
            {eligibleResults.map((result) => (
              <View
                key={result.regime}
                style={[
                  styles.regimeCard,
                  bestRegime?.regime === result.regime && styles.regimeCardBest
                ]}
              >
                <View style={styles.regimeHeader}>
                  <Text style={styles.regimeName}>
                    {getRegimeName(result.regime)}
                  </Text>
                  {bestRegime?.regime === result.regime && (
                    <Text style={styles.regimeBadge}>MELHOR</Text>
                  )}
                </View>

                <Text style={styles.regimeValue}>
                  {formatCurrency(result.impostos.total)}
                </Text>
                <Text style={styles.regimeLabel}>impostos por ano</Text>

                <View style={styles.regimeDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Alíquota Efetiva:</Text>
                    <Text style={styles.detailValue}>
                      {formatPercentage(result.impostos.aliquotaEfetiva)}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Score:</Text>
                    <Text style={styles.detailValue}>
                      {result.scoreRecomendacao}/100
                    </Text>
                  </View>
                  {result.economia && result.economia > 0 && (
                    <View style={styles.detailRow}>
                      <Text style={styles.detailLabel}>vs Melhor:</Text>
                      <Text style={styles.detailValue}>
                        +{formatCurrency(result.economia)}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            TaxHub - Inteligência Tributária | www.taxhub.com.br
          </Text>
          <Text style={styles.footerText}>
            Página 1 de 1
          </Text>
        </View>
      </Page>

      {/* Segunda página com breakdown detalhado */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>TaxHub</Text>
            <Text style={styles.logoSubtitle}>Inteligência Tributária</Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.reportTitle}>Breakdown Detalhado</Text>
          </View>
        </View>

        {/* Breakdown Table */}
        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>📋 Detalhamento de Impostos</Text>
          <View style={styles.breakdownTable}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCellHeader}>Regime</Text>
              <Text style={styles.tableCellHeader}>IRPJ</Text>
              <Text style={styles.tableCellHeader}>CSLL</Text>
              <Text style={styles.tableCellHeader}>PIS</Text>
              <Text style={styles.tableCellHeader}>COFINS</Text>
              <Text style={styles.tableCellHeader}>Total</Text>
            </View>
            {eligibleResults.map((result) => (
              <View key={result.regime} style={styles.tableRow}>
                <Text style={styles.tableCell}>
                  {getRegimeName(result.regime)}
                </Text>
                <Text style={styles.tableCell}>
                  {result.impostos.irpj ? formatCurrency(result.impostos.irpj) : '-'}
                </Text>
                <Text style={styles.tableCell}>
                  {result.impostos.csll ? formatCurrency(result.impostos.csll) : '-'}
                </Text>
                <Text style={styles.tableCell}>
                  {result.impostos.pis ? formatCurrency(result.impostos.pis) : '-'}
                </Text>
                <Text style={styles.tableCell}>
                  {result.impostos.cofins ? formatCurrency(result.impostos.cofins) : '-'}
                </Text>
                <Text style={styles.tableCell}>
                  {formatCurrency(result.impostos.total)}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recommendations */}
        {bestRegime && (
          <View style={styles.recommendationsSection}>
            <Text style={styles.recommendationTitle}>💡 Recomendações Estratégicas</Text>
            {bestRegime.vantagens.slice(0, 5).map((vantagem, index) => (
              <Text key={index} style={styles.recommendationItem}>
                • {vantagem}
              </Text>
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            TaxHub - Inteligência Tributária | www.taxhub.com.br
          </Text>
          <Text style={styles.footerText}>
            Página 2 de 2
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default TaxReportPDF;