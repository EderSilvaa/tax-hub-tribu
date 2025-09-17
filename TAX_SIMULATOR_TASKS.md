# Tax Simulator - Development Tasks

## 🎯 **Feature Overview**

**Objetivo**: Implementar simulador de regimes tributários em tempo real para startups e PMEs, começando com funcionalidade básica e evoluindo para cenários complexos.

**Escopo MVP**: Comparação entre Simples Nacional, Lucro Presumido e Lucro Real com interface visual intuitiva.

---

## 📋 **Tasks de Desenvolvimento**

### **PHASE 1: Foundation & Setup** (Semana 1)

#### **Task 1.1: Estrutura Base**
- [ ] **1.1.1** Criar pasta `src/features/taxSimulator/`
- [ ] **1.1.2** Criar estrutura de arquivos:
  ```
  src/features/taxSimulator/
  ├── components/
  │   ├── TaxSimulator.tsx
  │   ├── CompanyDataForm.tsx
  │   ├── TaxResults.tsx
  │   └── RegimeCard.tsx
  ├── lib/
  │   ├── taxCalculations.ts
  │   ├── taxTables.ts
  │   └── types.ts
  ├── hooks/
  │   └── useTaxCalculation.ts
  └── index.ts
  ```
- [ ] **1.1.3** Definir interfaces TypeScript base
- [ ] **1.1.4** Configurar rota `/simulador` no React Router

**Tempo estimado**: 4 horas

#### **Task 1.2: Data Types & Interfaces**
```typescript
// src/features/taxSimulator/lib/types.ts
interface CompanyData {
  faturamentoAnual: number;
  atividade: ActivityType;
  regimeAtual: TaxRegime;
  estadoOperacao: string;
  numeroFuncionarios: number;
  setor: BusinessSector;
}

interface TaxCalculationResult {
  regime: TaxRegime;
  impostos: TaxBreakdown;
  aliquotaEfetiva: number;
  valorTotal: number;
  economia?: number;
  vantagens: string[];
  desvantagens: string[];
}
```

- [ ] **1.2.1** Definir interface `CompanyData`
- [ ] **1.2.2** Definir interface `TaxCalculationResult`
- [ ] **1.2.3** Criar enums para `TaxRegime`, `ActivityType`, `BusinessSector`
- [ ] **1.2.4** Definir interface `TaxBreakdown` para detalhamento

**Tempo estimado**: 3 horas

---

### **PHASE 2: Tax Calculation Logic** (Semana 1-2)

#### **Task 2.1: Tabelas Tributárias**
```typescript
// src/features/taxSimulator/lib/taxTables.ts
export const simplesNacionalTable = {
  anexo1: [ // Comércio
    { min: 0, max: 180000, aliquota: 4.0, irpj: 0.0, csll: 0.0, cofins: 0.0, pis: 0.0, cpp: 2.75, icms: 1.25 },
    { min: 180001, max: 360000, aliquota: 7.3, irpj: 0.0, csll: 0.0, cofins: 0.86, pis: 0.0, cpp: 2.75, icms: 1.86 },
    // ... resto da tabela
  ],
  anexo3: [ // Serviços
    { min: 0, max: 180000, aliquota: 6.0, irpj: 4.0, csll: 3.5, cofins: 0.0, pis: 0.0, cpp: 43.4, iss: 2.0 },
    // ... resto da tabela
  ]
};
```

- [ ] **2.1.1** Implementar tabela Simples Nacional 2024 (Anexos I, III, IV, V)
- [ ] **2.1.2** Implementar alíquotas Lucro Presumido
- [ ] **2.1.3** Implementar alíquotas Lucro Real básico
- [ ] **2.1.4** Criar mapeamento CNAE → Anexo do Simples

**Tempo estimado**: 6 horas

#### **Task 2.2: Calculadoras por Regime**
- [ ] **2.2.1** Implementar `calculateSimplesNacional()`
  ```typescript
  export const calculateSimplesNacional = (data: CompanyData): TaxCalculationResult => {
    const anexo = getAnexoByActivity(data.atividade);
    const faixa = getFaixaByFaturamento(data.faturamentoAnual, anexo);
    const aliquota = calculateProgressiveRate(data.faturamentoAnual, anexo);
    // ...
  };
  ```
- [ ] **2.2.2** Implementar `calculateLucroPresumido()`
- [ ] **2.2.3** Implementar `calculateLucroReal()` (versão simplificada)
- [ ] **2.2.4** Implementar `calculateMEI()` (quando aplicável)
- [ ] **2.2.5** Criar função `compareAllRegimes()`

**Tempo estimado**: 8 horas

#### **Task 2.3: Business Logic**
- [ ] **2.3.1** Implementar lógica de elegibilidade por regime
- [ ] **2.3.2** Criar validações de entrada de dados
- [ ] **2.3.3** Implementar cálculo de economia comparativa
- [ ] **2.3.4** Adicionar identificação do "melhor regime"
- [ ] **2.3.5** Implementar cálculo de alíquota efetiva

**Tempo estimado**: 5 horas

---

### **PHASE 3: React Components** (Semana 2)

#### **Task 3.1: Form de Entrada de Dados**
```typescript
// src/features/taxSimulator/components/CompanyDataForm.tsx
const CompanyDataForm = ({ onSubmit }: { onSubmit: (data: CompanyData) => void }) => {
  const [formData, setFormData] = useState<CompanyData>();

  return (
    <form className="space-y-6">
      <Input
        label="Faturamento Anual"
        type="currency"
        value={formData.faturamentoAnual}
      />
      <Select
        label="Atividade Principal"
        options={activityOptions}
      />
      // ...
    </form>
  );
};
```

- [ ] **3.1.1** Criar form com shadcn/ui components
- [ ] **3.1.2** Implementar validação com react-hook-form + zod
- [ ] **3.1.3** Adicionar formatação de moeda brasileira
- [ ] **3.1.4** Implementar select de atividades/CNAEs
- [ ] **3.1.5** Adicionar select de estados
- [ ] **3.1.6** Criar UX responsiva mobile-first

**Tempo estimado**: 6 horas

#### **Task 3.2: Exibição de Resultados**
```typescript
// src/features/taxSimulator/components/TaxResults.tsx
const TaxResults = ({ results }: { results: TaxCalculationResult[] }) => {
  const bestOption = findBestOption(results);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {results.map(result => (
        <RegimeCard
          key={result.regime}
          data={result}
          isBest={result.regime === bestOption.regime}
        />
      ))}
    </div>
  );
};
```

- [ ] **3.2.1** Criar componente `RegimeCard` com design card
- [ ] **3.2.2** Implementar destaque visual para melhor opção
- [ ] **3.2.3** Adicionar breakdown detalhado de impostos
- [ ] **3.2.4** Criar seção de vantagens/desvantagens
- [ ] **3.2.5** Implementar animações de entrada
- [ ] **3.2.6** Adicionar botões de ação (salvar, compartilhar)

**Tempo estimado**: 8 horas

#### **Task 3.3: Container Principal**
- [ ] **3.3.1** Criar componente `TaxSimulator` principal
- [ ] **3.3.2** Implementar estado local com useState
- [ ] **3.3.3** Adicionar loading states
- [ ] **3.3.4** Implementar error handling
- [ ] **3.3.5** Criar fluxo step-by-step (wizard)
- [ ] **3.3.6** Adicionar breadcrumbs de navegação

**Tempo estimado**: 4 horas

---

### **PHASE 4: Hooks & State Management** (Semana 2)

#### **Task 4.1: Custom Hooks**
```typescript
// src/features/taxSimulator/hooks/useTaxCalculation.ts
export const useTaxCalculation = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<TaxCalculationResult[]>();
  const [error, setError] = useState<string>();

  const calculate = useCallback(async (data: CompanyData) => {
    setIsCalculating(true);
    try {
      const results = compareAllRegimes(data);
      setResults(results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCalculating(false);
    }
  }, []);

  return { calculate, results, isCalculating, error };
};
```

- [ ] **4.1.1** Criar hook `useTaxCalculation`
- [ ] **4.1.2** Implementar hook `useCompanyData` para persistir dados
- [ ] **4.1.3** Criar hook `useTaxComparison` para análises
- [ ] **4.1.4** Implementar `useLocalStorage` para salvar simulações

**Tempo estimado**: 4 horas

---

### **PHASE 5: Integration & Routing** (Semana 2-3)

#### **Task 5.1: Roteamento**
- [ ] **5.1.1** Adicionar rota `/simulador` no App.tsx
- [ ] **5.1.2** Criar página `SimulatorPage.tsx`
- [ ] **5.1.3** Implementar navegação from/to outras páginas
- [ ] **5.1.4** Adicionar link no Header principal

**Tempo estimado**: 2 horas

#### **Task 5.2: Layout & Design**
- [ ] **5.2.1** Criar layout responsivo da página
- [ ] **5.2.2** Implementar hero section do simulador
- [ ] **5.2.3** Adicionar breadcrumbs e navegação
- [ ] **5.2.4** Implementar footer com CTAs
- [ ] **5.2.5** Otimizar para mobile

**Tempo estimado**: 4 horas

---

### **PHASE 6: Enhancement & Polish** (Semana 3)

#### **Task 6.1: UX Improvements**
- [ ] **6.1.1** Implementar tooltips explicativos
- [ ] **6.1.2** Adicionar examples/placeholders
- [ ] **6.1.3** Criar modal de detalhes por regime
- [ ] **6.1.4** Implementar FAQ inline
- [ ] **6.1.5** Adicionar progress indicator

**Tempo estimado**: 6 horas

#### **Task 6.2: Data Export & Sharing**
- [ ] **6.2.1** Implementar export PDF dos resultados
- [ ] **6.2.2** Criar função de compartilhamento via WhatsApp
- [ ] **6.2.3** Adicionar save/load de simulações
- [ ] **6.2.4** Implementar histórico de simulações

**Tempo estimado**: 5 horas

#### **Task 6.3: Analytics & Tracking**
- [ ] **6.3.1** Implementar tracking de eventos
- [ ] **6.3.2** Adicionar métricas de uso
- [ ] **6.3.3** Criar dashboard interno de analytics
- [ ] **6.3.4** Implementar A/B testing básico

**Tempo estimado**: 3 horas

---

## 🧪 **Testing Tasks**

### **Task T.1: Unit Tests**
- [ ] **T.1.1** Testes para funções de cálculo tributário
- [ ] **T.1.2** Testes para validação de dados
- [ ] **T.1.3** Testes para hooks customizados
- [ ] **T.1.4** Testes para utils e helpers

**Tempo estimado**: 6 horas

### **Task T.2: Integration Tests**
- [ ] **T.2.1** Testes end-to-end do fluxo completo
- [ ] **T.2.2** Testes de componentes React
- [ ] **T.2.3** Testes de roteamento
- [ ] **T.2.4** Testes de responsividade

**Tempo estimado**: 4 horas

---

## 📚 **Documentation Tasks**

### **Task D.1: Technical Documentation**
- [ ] **D.1.1** Documentar interfaces e tipos
- [ ] **D.1.2** Criar README do feature
- [ ] **D.1.3** Documentar lógica de cálculos
- [ ] **D.1.4** Criar guia de contribuição

**Tempo estimado**: 3 horas

### **Task D.2: User Documentation**
- [ ] **D.2.1** Criar tooltips explicativos
- [ ] **D.2.2** Escrever FAQ
- [ ] **D.2.3** Criar tutorial step-by-step
- [ ] **D.2.4** Documentar limitações conhecidas

**Tempo estimado**: 2 horas

---

## 📅 **Timeline Summary**

### **Week 1 (40h total)**
- **Days 1-2**: Foundation & Types (Tasks 1.1, 1.2)
- **Days 3-5**: Tax Calculation Logic (Tasks 2.1, 2.2, 2.3)

### **Week 2 (40h total)**
- **Days 1-3**: React Components (Tasks 3.1, 3.2, 3.3)
- **Days 4-5**: Hooks & Integration (Tasks 4.1, 5.1, 5.2)

### **Week 3 (30h total)**
- **Days 1-3**: Enhancement & Polish (Tasks 6.1, 6.2, 6.3)
- **Days 4-5**: Testing & Documentation (Tasks T.1, T.2, D.1, D.2)

---

## 🎯 **Definition of Done**

### **Para cada Task:**
- [ ] Código implementado e funcionando
- [ ] Testes unitários passando
- [ ] Code review aprovado
- [ ] Documentação atualizada
- [ ] Responsivo em mobile
- [ ] Acessibilidade básica implementada

### **Para o Feature Completo:**
- [ ] Fluxo end-to-end funcionando
- [ ] Performance adequada (< 2s para cálculos)
- [ ] UX validada com usuários teste
- [ ] Integração com analytics
- [ ] Deploy em staging
- [ ] Aprovação final do produto

---

## 🚀 **Next Steps After MVP**

### **Version 1.1 - Enhanced Calculations**
- Cálculo de Lucro Real mais preciso
- Incentivos fiscais (Lei do Bem, PADIS)
- Simulação de crescimento temporal
- Comparação com concorrentes

### **Version 1.2 - Smart Features**
- IA para recomendações personalizadas
- Integração com APIs de dados públicos
- Alertas de mudanças tributárias
- Otimização automática

### **Version 2.0 - Advanced Platform**
- Módulo de compliance
- Integração com ERPs
- API para terceiros
- Mobile app nativo

---

## 📋 **Dependencies & Prerequisites**

### **External Dependencies**
- shadcn/ui components (já instalado)
- react-hook-form + zod (para validação)
- date-fns (para cálculos temporais)
- recharts (para gráficos futuros)

### **Internal Dependencies**
- Design system atualizado
- Padrões de código definidos
- CI/CD pipeline configurado
- Analytics tools configuradas

---

**Criado em**: Setembro 2024
**Versão**: 1.0
**Responsável**: Dev Team
**Reviewer**: Product Owner