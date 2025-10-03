/**
 * CompanyDataForm Component - Formulário de Dados da Empresa
 *
 * Wizard step-by-step seguindo o design system TaxHub
 * Cores: accent, accent-subtle, muted-foreground
 * Typography: font-sans, tracking-tight, leading-relaxed
 */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ChevronLeft,
  ChevronRight,
  Building2,
  MapPin,
  Users,
  Calculator,
  CheckCircle,
  AlertCircle,
  HelpCircle
} from "lucide-react";

import {
  CompanyData,
  ActivityType,
  BusinessSector,
  TaxRegime,
  StartupStage
} from '@/features/taxSimulator/lib/types';

import {
  step1Schema,
  step2Schema,
  step3Schema
} from '@/features/taxSimulator/lib/schemas';

import {
  useAdvancedValidation,
  useEligibilityCheck
} from '@/features/taxSimulator/hooks/useTaxCalculation';

import {
  ACTIVITY_TYPES,
  BUSINESS_SECTORS,
  TAX_REGIMES,
  STARTUP_STAGES,
  BRAZILIAN_STATES,
  FORM_OPTIONS
} from '@/features/taxSimulator/lib/constants';

import {
  formatCurrency,
  parseCurrency
} from '@/features/taxSimulator/lib/utils';

// ==================== INTERFACES ====================

export interface CompanyDataFormProps {
  initialData?: Partial<CompanyData>;
  onSubmit: (data: CompanyData) => void;
  onCancel?: () => void;
  className?: string;
  showStepIndicator?: boolean;
  isLoading?: boolean;
  errors?: Record<string, string>;
}

interface FormStep {
  title: string;
  description: string;
  icon: React.ElementType;
  fields: string[];
}

// ==================== FORM STEPS ====================

const FORM_STEPS: FormStep[] = [
  {
    title: 'Dados Básicos',
    description: 'Informações fundamentais da empresa',
    icon: Building2,
    fields: ['faturamentoAnual', 'atividade', 'setor']
  },
  {
    title: 'Localização & Estrutura',
    description: 'Estado de operação e equipe',
    icon: MapPin,
    fields: ['regimeAtual', 'estadoOperacao', 'numeroFuncionarios']
  },
  {
    title: 'Dados Complementares',
    description: 'Informações opcionais para cálculo mais preciso',
    icon: Calculator,
    fields: ['startupStage', 'lucroLiquido', 'folhaPagamento', 'exportacao']
  }
];

// ==================== MAIN COMPONENT ====================

const CompanyDataForm: React.FC<CompanyDataFormProps> = ({
  initialData,
  onSubmit,
  onCancel,
  className = '',
  showStepIndicator = true,
  isLoading = false,
  errors: externalErrors = {}
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showValidationInsights, setShowValidationInsights] = useState(false);

  // Usar novos hooks de validação
  const { validationResult, validate } = useAdvancedValidation();
  const { eligibilityResults, checkEligibility } = useEligibilityCheck();

  // Form setup com react-hook-form + zod
  const form = useForm<CompanyData>({
    defaultValues: {
      faturamentoAnual: 0,
      atividade: ActivityType.TECNOLOGIA,
      setor: BusinessSector.SERVICOS,
      regimeAtual: TaxRegime.SIMPLES_NACIONAL,
      estadoOperacao: 'SP',
      numeroFuncionarios: 1,
      ...initialData
    },
    mode: 'onChange'
  });

  const { register, handleSubmit, watch, setValue, getValues, formState: { errors, isValid } } = form;
  const watchedValues = watch();

  // Validação do step atual
  const validateCurrentStep = async () => {
    const currentFields = FORM_STEPS[currentStep].fields;
    const stepData = Object.fromEntries(
      currentFields.map(field => [field, watchedValues[field as keyof CompanyData]])
    );

    try {
      if (currentStep === 0) {
        step1Schema.parse(stepData);
      } else if (currentStep === 1) {
        step2Schema.parse(stepData);
      } else if (currentStep === 2) {
        // Step 3 é opcional, filtrar undefined/null values
        const cleanStepData = Object.fromEntries(
          Object.entries(stepData).filter(([_, value]) => value !== undefined && value !== null && value !== '')
        );
        step3Schema.parse(cleanStepData);
      }
      return true;
    } catch (error) {
      return false;
    }
  };

  const nextStep = async () => {
    const isStepValid = await validateCurrentStep();

    if (isStepValid) {
      // Executar validação avançada se estivermos no último step
      if (currentStep === FORM_STEPS.length - 1) {
        const allData = form.getValues();
        const advancedValidation = validate(allData);

        if (advancedValidation.warnings.length > 0 || advancedValidation.suggestions.length > 0) {
          setShowValidationInsights(true);
        }

        // Verificar elegibilidade se tivermos dados suficientes
        if (allData.faturamentoAnual && allData.atividade) {
          checkEligibility(allData as CompanyData);
        }
      }

      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps([...completedSteps, currentStep]);
      }
      setCurrentStep(Math.min(currentStep + 1, FORM_STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(currentStep - 1, 0));
    setShowValidationInsights(false);
  };

  const onFormSubmit = (data: CompanyData) => {
    // Validação final avançada
    const finalValidation = validate(data);

    if (!finalValidation.isValid) {
      console.warn('Dados com problemas, mas prosseguindo:', finalValidation.warnings);
    }

    // Processar dados antes de enviar
    const processedData = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    onSubmit(processedData);
  };

  const isStepComplete = (stepIndex: number) => {
    return completedSteps.includes(stepIndex);
  };

  const canProceed = () => {
    if (currentStep === FORM_STEPS.length - 1) {
      return isValid;
    }
    return true; // Validação será feita no nextStep
  };

  return (
    <TooltipProvider>
      <div className={`max-w-4xl mx-auto space-y-8 ${className}`}>
      {/* Step Indicator */}
      {showStepIndicator && (
        <Card className="bg-gradient-to-r from-accent/5 to-accent-subtle/5 border-accent/20">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              {FORM_STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep === index;
                const isCompleted = isStepComplete(index);

                return (
                  <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div
                        className={`
                          w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300
                          ${isActive
                            ? 'bg-accent text-accent-foreground shadow-glow'
                            : isCompleted
                            ? 'bg-green-600 text-white'
                            : 'bg-muted text-muted-foreground'
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : (
                          <Icon className="w-6 h-6" />
                        )}
                      </div>
                      <div className="mt-2 text-center">
                        <div className={`text-sm font-medium ${isActive ? 'text-accent' : 'text-muted-foreground'}`}>
                          {step.title}
                        </div>
                        <div className="text-xs text-muted-foreground hidden sm:block">
                          {step.description}
                        </div>
                      </div>
                    </div>

                    {index < FORM_STEPS.length - 1 && (
                      <div
                        className={`
                          hidden sm:block w-20 h-0.5 mx-4 transition-colors duration-300
                          ${isCompleted ? 'bg-green-600' : 'bg-border'}
                        `}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 text-center">
              <Badge variant="secondary">
                Passo {currentStep + 1} de {FORM_STEPS.length}
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Form Content */}
      <Card className="shadow-soft">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            {React.createElement(FORM_STEPS[currentStep].icon, { className: "w-6 h-6 text-accent" })}
            {FORM_STEPS[currentStep].title}
          </CardTitle>
          <p className="text-muted-foreground">
            {FORM_STEPS[currentStep].description}
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Step 1: Dados Básicos */}
            {currentStep === 0 && (
              <div className="space-y-6">
                {/* Faturamento Anual */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="faturamentoAnual" className="text-sm font-medium">
                      Faturamento Anual *
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-accent cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Receita bruta total da empresa nos últimos 12 meses, incluindo todas as vendas de produtos ou serviços, antes de qualquer dedução.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="faturamentoAnual"
                    type="text"
                    placeholder="Ex: R$ 2.500.000,00 (startup em crescimento) ou R$ 500.000,00 (pequena empresa)"
                    className="focus-ring"
                    {...register('faturamentoAnual', {
                      setValueAs: (value) => {
                        if (typeof value === 'string') {
                          return parseCurrency(value);
                        }
                        return value;
                      }
                    })}
                    onBlur={(e) => {
                      // Formatar apenas quando sair do campo (onBlur)
                      const numericValue = parseCurrency(e.target.value);
                      if (numericValue > 0) {
                        e.target.value = formatCurrency(numericValue);
                        setValue('faturamentoAnual', numericValue);
                      }
                    }}
                    onFocus={(e) => {
                      // Mostrar apenas números quando focar no campo
                      const currentValue = getValues('faturamentoAnual');
                      if (currentValue > 0) {
                        e.target.value = currentValue.toString();
                      }
                    }}
                    onChange={(e) => {
                      // Permitir digitação livre, validar apenas números
                      const input = e.target.value;
                      const onlyNumbers = input.replace(/[^\d]/g, '');
                      const numericValue = parseFloat(onlyNumbers) || 0;
                      setValue('faturamentoAnual', numericValue);
                    }}
                  />
                  {errors.faturamentoAnual && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.faturamentoAnual.message}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground space-y-2">
                    <div>Informe o faturamento bruto dos últimos 12 meses.</div>
                    <div>💡 Dica: Digite apenas números (ex: 500000 para R$ 500.000)</div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs">Valores comuns:</span>
                      {[100000, 500000, 1000000, 2000000].map((value) => (
                        <button
                          key={value}
                          type="button"
                          className="text-xs px-2 py-1 bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors"
                          onClick={() => {
                            setValue('faturamentoAnual', value);
                            const input = document.getElementById('faturamentoAnual') as HTMLInputElement;
                            if (input) {
                              input.value = formatCurrency(value);
                            }
                          }}
                        >
                          {formatCurrency(value, { compact: true })}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Atividade Principal */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="atividade" className="text-sm font-medium">
                      Atividade Principal *
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-accent cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Selecione a atividade que representa a maior parte da receita da empresa. Isso determinará qual anexo do Simples Nacional será aplicado.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Select
                    value={watchedValues.atividade}
                    onValueChange={(value) => setValue('atividade', value as ActivityType)}
                  >
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Ex: Tecnologia (SaaS), Comércio (e-commerce), Consultoria..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(ACTIVITY_TYPES).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex flex-col">
                            <span className="font-medium">{info.name}</span>
                            <span className="text-xs text-muted-foreground">{info.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.atividade && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.atividade.message}
                    </div>
                  )}
                </div>

                {/* Setor */}
                <div className="space-y-2">
                  <Label htmlFor="setor" className="text-sm font-medium">
                    Setor de Atuação *
                  </Label>
                  <Select
                    value={watchedValues.setor}
                    onValueChange={(value) => setValue('setor', value as BusinessSector)}
                  >
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Ex: Serviços (Anexo III), Comércio (Anexo I), Indústria (Anexo II)..." />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(BUSINESS_SECTORS).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{info.icon}</span>
                            <div className="flex flex-col">
                              <span className="font-medium">{info.name}</span>
                              <span className="text-xs text-muted-foreground">
                                Anexo {info.anexoSimples} - {info.description}
                              </span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.setor && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.setor.message}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2: Localização & Estrutura */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Regime Atual */}
                <div className="space-y-2">
                  <Label htmlFor="regimeAtual" className="text-sm font-medium">
                    Regime Tributário Atual *
                  </Label>
                  <Select
                    value={watchedValues.regimeAtual}
                    onValueChange={(value) => setValue('regimeAtual', value as TaxRegime)}
                  >
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Selecione o regime atual" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(TAX_REGIMES).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{info.icon}</span>
                            <div className="flex flex-col">
                              <span className="font-medium">{info.name}</span>
                              <span className="text-xs text-muted-foreground">{info.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.regimeAtual && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.regimeAtual.message}
                    </div>
                  )}
                </div>

                {/* Estado de Operação */}
                <div className="space-y-2">
                  <Label htmlFor="estadoOperacao" className="text-sm font-medium">
                    Estado de Operação *
                  </Label>
                  <Select
                    value={watchedValues.estadoOperacao}
                    onValueChange={(value) => setValue('estadoOperacao', value)}
                  >
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Ex: São Paulo, Rio de Janeiro, Minas Gerais..." />
                    </SelectTrigger>
                    <SelectContent>
                      {BRAZILIAN_STATES.map((state) => (
                        <SelectItem key={state.code} value={state.code}>
                          <div className="flex flex-col">
                            <span className="font-medium">{state.name}</span>
                            <span className="text-xs text-muted-foreground">{state.region}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.estadoOperacao && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.estadoOperacao.message}
                    </div>
                  )}
                </div>

                {/* Número de Funcionários */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor="numeroFuncionarios" className="text-sm font-medium">
                      Número de Funcionários *
                    </Label>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="w-4 h-4 text-muted-foreground hover:text-accent cursor-help" />
                      </TooltipTrigger>
                      <TooltipContent className="max-w-xs">
                        <p className="text-xs">
                          Total de funcionários registrados com carteira assinada. Para MEI, o limite é de até 1 funcionário recebendo no máximo 1 salário mínimo.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Input
                    id="numeroFuncionarios"
                    type="number"
                    min="0"
                    placeholder="Ex: 0 (apenas sócios), 5 (pequena equipe), 25 (empresa média)"
                    className="focus-ring"
                    {...register('numeroFuncionarios', { valueAsNumber: true })}
                  />
                  {errors.numeroFuncionarios && (
                    <div className="flex items-center gap-2 text-sm text-red-600">
                      <AlertCircle className="w-4 h-4" />
                      {errors.numeroFuncionarios.message}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Incluindo sócios que recebem pró-labore
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Dados Complementares */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-sm text-muted-foreground mb-4">
                  As informações abaixo são opcionais, mas ajudam a fazer cálculos mais precisos.
                </div>

                {/* Estágio da Startup */}
                <div className="space-y-2">
                  <Label htmlFor="startupStage" className="text-sm font-medium">
                    Estágio da Empresa (opcional)
                  </Label>
                  <Select
                    value={watchedValues.startupStage || 'none'}
                    onValueChange={(value) => setValue('startupStage', value === 'none' ? undefined : value as StartupStage)}
                  >
                    <SelectTrigger className="focus-ring">
                      <SelectValue placeholder="Selecione o estágio (opcional)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Não se aplica</SelectItem>
                      {Object.entries(STARTUP_STAGES).map(([key, info]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <span>{info.icon}</span>
                            <div className="flex flex-col">
                              <span className="font-medium">{info.name}</span>
                              <span className="text-xs text-muted-foreground">{info.description}</span>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Lucro Líquido */}
                <div className="space-y-2">
                  <Label htmlFor="lucroLiquido" className="text-sm font-medium">
                    Lucro Líquido Anual (opcional)
                  </Label>
                  <Input
                    id="lucroLiquido"
                    type="text"
                    placeholder="Ex: R$ 50.000"
                    className="focus-ring"
                    {...register('lucroLiquido', {
                      setValueAs: (value) => {
                        if (!value) return undefined;
                        if (typeof value === 'string') {
                          return parseCurrency(value);
                        }
                        return value;
                      }
                    })}
                    onChange={(e) => {
                      const numericValue = parseCurrency(e.target.value);
                      setValue('lucroLiquido', numericValue || undefined);
                      if (numericValue) {
                        e.target.value = formatCurrency(numericValue);
                      }
                    }}
                  />
                  <div className="text-xs text-muted-foreground">
                    Ajuda a calcular o Lucro Real com maior precisão
                  </div>
                </div>

                {/* Folha de Pagamento */}
                <div className="space-y-2">
                  <Label htmlFor="folhaPagamento" className="text-sm font-medium">
                    Folha de Pagamento Anual (opcional)
                  </Label>
                  <Input
                    id="folhaPagamento"
                    type="text"
                    placeholder="Ex: R$ 240.000"
                    className="focus-ring"
                    {...register('folhaPagamento', {
                      setValueAs: (value) => {
                        if (!value) return undefined;
                        if (typeof value === 'string') {
                          return parseCurrency(value);
                        }
                        return value;
                      }
                    })}
                    onChange={(e) => {
                      const numericValue = parseCurrency(e.target.value);
                      setValue('folhaPagamento', numericValue || undefined);
                      if (numericValue) {
                        e.target.value = formatCurrency(numericValue);
                      }
                    }}
                  />
                  <div className="text-xs text-muted-foreground">
                    Salários + encargos + pró-labore dos sócios
                  </div>
                </div>

                {/* Exportação */}
                <div className="space-y-2">
                  <Label htmlFor="exportacao" className="text-sm font-medium">
                    Receita de Exportação Anual (opcional)
                  </Label>
                  <Input
                    id="exportacao"
                    type="text"
                    placeholder="Ex: R$ 100.000"
                    className="focus-ring"
                    {...register('exportacao', {
                      setValueAs: (value) => {
                        if (!value) return undefined;
                        if (typeof value === 'string') {
                          return parseCurrency(value);
                        }
                        return value;
                      }
                    })}
                    onChange={(e) => {
                      const numericValue = parseCurrency(e.target.value);
                      setValue('exportacao', numericValue || undefined);
                      if (numericValue) {
                        e.target.value = formatCurrency(numericValue);
                      }
                    }}
                  />
                  <div className="text-xs text-muted-foreground">
                    Pode gerar benefícios fiscais específicos
                  </div>
                </div>
              </div>
            )}

            {/* Validation Insights */}
            {showValidationInsights && validationResult && (
              <div className="space-y-4 p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 text-blue-800">
                  <AlertCircle className="w-5 h-5" />
                  <h4 className="font-medium">Insights de Validação</h4>
                </div>

                {validationResult.warnings.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-amber-800 mb-2">⚠️ Pontos de Atenção:</h5>
                    <ul className="space-y-1">
                      {validationResult.warnings.map((warning, index) => (
                        <li key={index} className="text-sm text-amber-700">
                          • {warning}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {validationResult.suggestions.length > 0 && (
                  <div>
                    <h5 className="text-sm font-medium text-blue-800 mb-2">💡 Sugestões:</h5>
                    <ul className="space-y-1">
                      {validationResult.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-blue-700">
                          • {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Eligibility Quick Check */}
            {currentStep === FORM_STEPS.length - 1 && Object.keys(eligibilityResults).length > 0 && (
              <div className="space-y-4 p-4 bg-green-50/50 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 text-green-800">
                  <CheckCircle className="w-5 h-5" />
                  <h4 className="font-medium">Pré-verificação de Elegibilidade</h4>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(eligibilityResults).map(([regime, check]) => (
                    <div
                      key={regime}
                      className={`p-3 rounded-md border ${
                        check.eligible
                          ? 'bg-green-100 border-green-300'
                          : 'bg-red-100 border-red-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {regime.replace('_', ' ').toUpperCase()}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          check.eligible
                            ? 'bg-green-200 text-green-800'
                            : 'bg-red-200 text-red-800'
                        }`}>
                          {check.eligible ? 'Elegível' : 'Inelegível'}
                        </span>
                      </div>
                      {!check.eligible && check.reason && (
                        <p className="text-xs text-red-700 mt-1">{check.reason}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQ Inline */}
            <div className="pt-6 border-t">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-accent" />
                Dúvidas Frequentes
              </h3>
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="faq-1" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Como definir o faturamento anual correto?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p>O faturamento anual é a soma total de todas as receitas da empresa nos últimos 12 meses:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Inclua todas as vendas de produtos e serviços</li>
                        <li>Considere receitas antes de deduções e impostos</li>
                        <li>Para empresas novas, use a projeção para 12 meses</li>
                        <li>Não inclua investimentos ou empréstimos recebidos</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-2" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Qual a diferença entre os anexos do Simples Nacional?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p>Cada anexo tem alíquotas diferentes baseadas na atividade:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li><strong>Anexo I:</strong> Comércio - alíquotas de 4% a 19%</li>
                        <li><strong>Anexo II:</strong> Indústria - alíquotas de 4,5% a 30%</li>
                        <li><strong>Anexo III:</strong> Serviços gerais - alíquotas de 6% a 33%</li>
                        <li><strong>Anexo IV:</strong> Serviços específicos - alíquotas de 4,5% a 33%</li>
                        <li><strong>Anexo V:</strong> Serviços profissionais - alíquotas de 15,5% a 30,5%</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-3" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Quando vale a pena sair do Simples Nacional?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p>Considere migrar do Simples Nacional quando:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Faturamento próximo do limite (R$ 4,8 milhões)</li>
                        <li>Alta margem de lucro (acima de 20-25%)</li>
                        <li>Muitos créditos de PIS/COFINS para compensar</li>
                        <li>Prejuízos contábeis que podem compensar IR</li>
                        <li>Alíquota efetiva do Simples muito alta</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-4" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    MEI é sempre a melhor opção para pequenos negócios?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p>Nem sempre. MEI tem limitações importantes:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li>Limite de R$ 81.000/ano de faturamento</li>
                        <li>Máximo de 1 funcionário</li>
                        <li>Atividades limitadas</li>
                        <li>Sem emissão de nota fiscal para PJ</li>
                        <li>Para faturamentos acima de R$ 60.000, Simples pode ser melhor</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="faq-5" className="border border-border rounded-lg px-4">
                  <AccordionTrigger className="text-sm font-medium hover:no-underline">
                    Como funciona a migração entre regimes?
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    <div className="space-y-2">
                      <p>A migração tem prazos específicos:</p>
                      <ul className="list-disc list-inside space-y-1 ml-2">
                        <li><strong>Simples Nacional:</strong> Opção até 31 de janeiro</li>
                        <li><strong>Lucro Presumido:</strong> Opção até 31 de janeiro</li>
                        <li><strong>Lucro Real:</strong> Pode optar a qualquer momento</li>
                        <li>Mudanças só valem para o ano seguinte (exceto Lucro Real)</li>
                        <li>Sempre consulte um contador antes de migrar</li>
                      </ul>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <div>
                {currentStep > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={prevStep}
                    disabled={isLoading}
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Anterior
                  </Button>
                )}
              </div>

              <div className="flex gap-3">
                {onCancel && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={onCancel}
                    disabled={isLoading}
                  >
                    Cancelar
                  </Button>
                )}

                {currentStep < FORM_STEPS.length - 1 ? (
                  <Button
                    type="button"
                    variant="gradient"
                    onClick={nextStep}
                    disabled={isLoading || !canProceed()}
                    className="shadow-glow"
                  >
                    Próximo
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={isLoading || !isValid}
                    className="shadow-glow"
                  >
                    {isLoading ? (
                      <>Calculando...</>
                    ) : (
                      <>
                        <Calculator className="w-4 h-4 mr-2" />
                        Calcular Impostos
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
    </TooltipProvider>
  );
};

export default CompanyDataForm;