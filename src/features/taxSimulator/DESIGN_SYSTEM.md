# Tax Simulator - Design System Guidelines

## 🎨 **Guia de Design System para Tax Simulator**

Este documento garante que todos os componentes do Tax Simulator sigam consistentemente o design system estabelecido no TaxHub.

---

## 🎯 **Core Design Principles**

### **1. Consistência Visual**
- Todas as cores devem usar as variáveis CSS definidas em `src/index.css`
- Typography deve seguir as classes base definidas no Tailwind
- Componentes devem reutilizar patterns do shadcn/ui

### **2. Responsividade**
- Mobile-first approach
- Breakpoints: `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Grid responsivo para cards de resultado

### **3. Acessibilidade**
- Contraste adequado entre texto e background
- Focus states visíveis
- Semântica HTML correta

---

## 🎨 **Color Palette**

### **Primary Colors**
```css
/* Cores principais do TaxHub */
--accent: 25 45% 35%;           /* #8B4513 - Cor principal */
--accent-subtle: 25 25% 45%;    /* Tom mais claro do accent */
--accent-foreground: 220 9% 95%; /* Texto sobre accent */

/* Cores base */
--background: 0 0% 100%;         /* Fundo principal */
--foreground: 222 15% 15%;       /* Texto principal */
--muted-foreground: 215 16% 47%; /* Texto secundário */
```

### **Usage Guidelines**
```typescript
// ✅ CORRETO - Usar classes Tailwind
<div className="bg-accent text-accent-foreground">
<p className="text-muted-foreground">

// ❌ INCORRETO - Cores hardcoded
<div style={{ backgroundColor: '#8B4513' }}>
<p style={{ color: '#666' }}>
```

---

## 🔤 **Typography**

### **Font Stack**
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
```

### **Typography Scale**
```typescript
// Headings - Sempre usar classes base
h1: "text-4xl font-bold tracking-tight lg:text-5xl"
h2: "text-3xl font-semibold tracking-tight lg:text-4xl"
h3: "text-2xl font-semibold tracking-tight"
h4: "text-xl font-semibold tracking-tight"

// Body text
body: "leading-7 [&:not(:first-child)]:mt-6"
small: "text-sm text-muted-foreground"
```

### **Tax Simulator Specific**
```typescript
// Títulos de seção
sectionTitle: "text-3xl lg:text-4xl font-sans font-semibold tracking-tight"

// Valores monetários
currencyValue: "text-2xl font-bold text-accent"
currencyLabel: "text-sm text-muted-foreground"

// Labels de regime
regimeTitle: "text-xl font-sans font-semibold tracking-tight"
```

---

## 🧩 **Component Patterns**

### **1. Cards (RegimeCard)**
```typescript
// Base card structure
<Card className="group hover-lift cursor-pointer border-0 shadow-soft hover:shadow-glow bg-card/50 backdrop-blur-sm">
  <CardHeader className="pb-4">
    <Badge variant="glass" size="sm">Label</Badge>
    <CardTitle className="text-xl font-sans font-semibold tracking-tight">
      Regime Name
    </CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

### **2. Forms (CompanyDataForm)**
```typescript
// Form layout
<form className="space-y-6">
  <div className="space-y-4">
    <Label className="text-sm font-medium">Field Label</Label>
    <Input
      className="focus-ring"
      placeholder="Placeholder text"
    />
  </div>
</form>
```

### **3. Results Display**
```typescript
// Results grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up">
  {results.map(result => (
    <RegimeCard key={result.regime} {...result} />
  ))}
</div>
```

---

## 🎭 **Animation Guidelines**

### **Available Animations**
```css
/* Entrada de elementos */
.animate-fade-in      /* 0.5s ease-out */
.animate-slide-up     /* 0.6s ease-out */
.animate-scale-in     /* 0.4s ease-out */
.animate-slide-down   /* 0.6s ease-out */

/* Hover effects */
.hover-lift           /* Transform + shadow on hover */
.hover-lift:hover     /* translateY(-2px) + shadow */

/* Pulsing glow */
.animate-pulse-glow   /* 2s ease-in-out infinite */
```

### **Usage in Tax Simulator**
```typescript
// Página inicial
heroSection: "animate-fade-in"
benefitsGrid: "animate-slide-up"
ctaSection: "animate-scale-in"

// Formulário
formSteps: "animate-slide-up"
fieldErrors: "animate-fade-in"

// Resultados
resultsGrid: "animate-slide-up"
regimeCards: "hover-lift"
```

---

## 🎨 **Glass Morphism & Shadows**

### **Glass Effects**
```css
/* Classe utilitária glass */
.glass {
  background: hsl(var(--glass-bg));      /* Fundo semi-transparente */
  backdrop-filter: blur(12px);           /* Blur effect */
  border: 1px solid hsl(var(--glass-border)); /* Borda sutil */
}
```

### **Shadow System**
```css
.shadow-soft   /* Sombra sutil para cards */
.shadow-glow   /* Sombra com glow colorido */
```

### **Usage Examples**
```typescript
// CTA sections
<div className="glass rounded-3xl p-12">

// Floating elements
<div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl animate-pulse-glow" />

// Cards com glass effect
<Card className="glass hover:shadow-glow">
```

---

## 🔧 **Component Variants**

### **Button Variants**
```typescript
// Primary action
<Button variant="gradient" size="xl" className="shadow-glow hover-lift">

// Secondary action
<Button variant="glass" size="xl" className="hover-lift">

// Outline action
<Button variant="outline" size="xl" className="hover-lift">
```

### **Badge Variants**
```typescript
// Section labels
<Badge variant="gradient" size="lg">

// Status indicators
<Badge variant="glass" size="sm">

// Best option highlight
<Badge variant="default" className="bg-accent text-accent-foreground">
```

---

## 📱 **Responsive Patterns**

### **Grid Breakpoints**
```typescript
// Mobile: 1 coluna
// Tablet: 2 colunas
// Desktop: 3 colunas
"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Cards de regime
"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"

// Form layout
"grid grid-cols-1 md:grid-cols-2 gap-6"
```

### **Text Scaling**
```typescript
// Hero titles
"text-4xl sm:text-5xl md:text-6xl lg:text-7xl"

// Section titles
"text-2xl sm:text-3xl lg:text-4xl"

// Buttons
"px-6 py-3 sm:px-8 sm:py-4"
```

---

## ✅ **Do's and Don'ts**

### **✅ DO's**
- Use variáveis CSS para cores
- Aplique `hover-lift` em elementos interativos
- Use `animate-slide-up` para grids de resultados
- Mantenha spacing consistente com `space-y-6`
- Use `tracking-tight` em títulos
- Aplique `glass` em CTAs importantes

### **❌ DON'Ts**
- Nunca use cores hardcoded
- Não misture diferentes sistemas de shadow
- Não use animações diferentes das estabelecidas
- Não quebre a hierarquia tipográfica
- Não use spacing inconsistente
- Não ignore states de hover/focus

---

## 🎯 **Tax Simulator Specific Patterns**

### **Currency Display**
```typescript
// Large monetary values
<div className="text-3xl font-bold text-accent">
  {formatCurrency(value)}
</div>
<div className="text-sm text-muted-foreground">
  por ano
</div>

// Compact monetary values
<span className="text-lg font-semibold text-foreground">
  {formatCurrency(value)}
</span>
```

### **Comparison Tables**
```typescript
// Side-by-side comparison
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <div className="space-y-4">
    <h3 className="text-xl font-semibold">Regime Atual</h3>
    {/* Current regime data */}
  </div>
  <div className="space-y-4">
    <h3 className="text-xl font-semibold text-accent">Melhor Opção</h3>
    {/* Best option data */}
  </div>
</div>
```

### **Progress Indicators**
```typescript
// Step indicator
<div className="flex items-center space-x-4">
  {steps.map((step, index) => (
    <div key={index} className={`
      w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
      ${index <= currentStep ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'}
    `}>
      {index + 1}
    </div>
  ))}
</div>
```

---

## 🔍 **Quality Checklist**

Antes de fazer commit, verifique:

- [ ] Todas as cores usam variáveis CSS
- [ ] Typography segue as classes base
- [ ] Responsividade testada em 3 breakpoints
- [ ] Hover states implementados
- [ ] Focus states acessíveis
- [ ] Animações seguem o padrão
- [ ] Glass effects aplicados consistentemente
- [ ] Shadows usando classes utilitárias
- [ ] Spacing consistente
- [ ] Texto tem contraste adequado

---

**Criado em**: Setembro 2024
**Versão**: 1.0
**Mantido por**: TaxHub Design Team