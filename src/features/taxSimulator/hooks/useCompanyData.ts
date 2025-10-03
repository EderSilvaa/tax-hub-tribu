/**
 * useCompanyData Hook - Task 4.1: Gerenciamento de Estado da Empresa
 *
 * Hook para gerenciar dados da empresa com persistência local e validação
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import {
  CompanyData,
  UseCompanyDataReturn,
  TaxRegime,
  ActivityType,
  BusinessSector
} from '../lib/types';

import {
  validateCompanyData,
  saveToLocalStorage,
  loadFromLocalStorage,
  removeFromLocalStorage
} from '../lib/utils';

const STORAGE_KEYS = {
  COMPANY_DATA: 'taxhub_company_data',
  COMPANY_DATA_HISTORY: 'taxhub_company_data_history',
  LAST_SIMULATION: 'taxhub_last_simulation'
} as const;

const DEFAULT_COMPANY_DATA: Partial<CompanyData> = {
  faturamentoAnual: 0,
  atividade: ActivityType.SERVICOS_GERAIS,
  setor: BusinessSector.SERVICOS,
  regimeAtual: TaxRegime.SIMPLES_NACIONAL,
  estadoOperacao: 'SP',
  numeroFuncionarios: 1
};

export function useCompanyData(initialData?: Partial<CompanyData>): UseCompanyDataReturn {
  // ==================== STATE ====================

  const [data, setData] = useState<Partial<CompanyData>>(() => {
    if (initialData) return { ...DEFAULT_COMPANY_DATA, ...initialData };

    // Tentar carregar dados salvos
    const savedData = loadFromLocalStorage<Partial<CompanyData>>(STORAGE_KEYS.COMPANY_DATA, {});
    return { ...DEFAULT_COMPANY_DATA, ...savedData };
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDirty, setIsDirty] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // ==================== COMPUTED VALUES ====================

  const isValid = useMemo(() => {
    const validationErrors = validateCompanyData(data);
    return Object.keys(validationErrors).length === 0;
  }, [data]);

  // ==================== ACTIONS ====================

  const updateField = useCallback(<K extends keyof CompanyData>(
    field: K,
    value: CompanyData[K]
  ) => {
    setData(prev => {
      const newData = { ...prev, [field]: value };

      // Auto-ajustes baseados na lógica de negócio
      return applyBusinessRules(newData, field);
    });

    setIsDirty(true);

    // Limpar erro do campo se houver
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  const updateData = useCallback((newData: Partial<CompanyData>) => {
    setData(prev => {
      const mergedData = { ...prev, ...newData };
      return applyBusinessRules(mergedData);
    });
    setIsDirty(true);
  }, []);

  const validate = useCallback((): boolean => {
    const validationErrors = validateCompanyData(data);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  }, [data]);

  const reset = useCallback(() => {
    setData(DEFAULT_COMPANY_DATA);
    setErrors({});
    setIsDirty(false);
    removeFromLocalStorage(STORAGE_KEYS.COMPANY_DATA);
  }, []);

  const save = useCallback(() => {
    if (!isValid) {
      validate();
      return;
    }

    // Salvar dados atuais
    saveToLocalStorage(STORAGE_KEYS.COMPANY_DATA, data);

    // Salvar no histórico
    const history = loadFromLocalStorage<Array<{ data: Partial<CompanyData>; timestamp: string }>>(
      STORAGE_KEYS.COMPANY_DATA_HISTORY,
      []
    );

    history.unshift({
      data: { ...data },
      timestamp: new Date().toISOString()
    });

    // Manter apenas últimos 10 registros
    if (history.length > 10) {
      history.splice(10);
    }

    saveToLocalStorage(STORAGE_KEYS.COMPANY_DATA_HISTORY, history);

    setIsDirty(false);
    setLastSaved(new Date());
  }, [data, isValid, validate]);

  const load = useCallback((id: string) => {
    // Por enquanto, apenas carrega do localStorage
    // Futuramente pode integrar com API
    const savedData = loadFromLocalStorage<Partial<CompanyData>>(
      id === 'default' ? STORAGE_KEYS.COMPANY_DATA : `${STORAGE_KEYS.COMPANY_DATA}_${id}`,
      DEFAULT_COMPANY_DATA
    );

    setData(savedData);
    setErrors({});
    setIsDirty(false);
  }, []);

  // ==================== AUTO-SAVE EFFECT ====================

  useEffect(() => {
    if (isDirty && isValid) {
      const timeoutId = setTimeout(() => {
        save();
      }, 2000); // Auto-save após 2 segundos de inatividade

      return () => clearTimeout(timeoutId);
    }
  }, [isDirty, isValid, save]);

  // ==================== RETURN ====================

  return {
    data,
    isValid,
    errors,
    isDirty,
    updateField,
    updateData,
    validate,
    reset,
    save,
    load,
    lastSaved
  };
}

// ==================== BUSINESS RULES ====================

/**
 * Aplica regras de negócio automáticas baseadas nos dados
 */
function applyBusinessRules(
  data: Partial<CompanyData>,
  changedField?: keyof CompanyData
): Partial<CompanyData> {
  const newData = { ...data };

  // Regra 1: Ajustar setor baseado na atividade
  if (changedField === 'atividade' && newData.atividade) {
    const activityToSector: Record<ActivityType, BusinessSector> = {
      [ActivityType.COMERCIO_VAREJO]: BusinessSector.COMERCIO,
      [ActivityType.COMERCIO_ATACADO]: BusinessSector.COMERCIO,
      [ActivityType.INDUSTRIA_GERAL]: BusinessSector.INDUSTRIA,
      [ActivityType.SERVICOS_GERAIS]: BusinessSector.SERVICOS,
      [ActivityType.TECNOLOGIA]: BusinessSector.SERVICOS_ANEXO_V,
      [ActivityType.CONSULTORIA]: BusinessSector.SERVICOS_ANEXO_V,
      [ActivityType.SAUDE]: BusinessSector.SERVICOS_ANEXO_V,
      [ActivityType.EDUCACAO]: BusinessSector.SERVICOS_ANEXO_V,
      [ActivityType.FINANCEIRO]: BusinessSector.SERVICOS_ANEXO_V,
      [ActivityType.OUTROS]: BusinessSector.SERVICOS
    };

    newData.setor = activityToSector[newData.atividade];
  }

  // Regra 2: Sugerir regime baseado no faturamento
  if (changedField === 'faturamentoAnual' && newData.faturamentoAnual) {
    const faturamento = newData.faturamentoAnual;

    if (faturamento <= 81000) {
      newData.regimeAtual = TaxRegime.MEI;
    } else if (faturamento <= 4800000) {
      newData.regimeAtual = TaxRegime.SIMPLES_NACIONAL;
    } else if (faturamento <= 78000000) {
      newData.regimeAtual = TaxRegime.LUCRO_PRESUMIDO;
    } else {
      newData.regimeAtual = TaxRegime.LUCRO_REAL;
    }
  }

  // Regra 3: Ajustar número de funcionários para MEI
  if (newData.regimeAtual === TaxRegime.MEI && newData.numeroFuncionarios && newData.numeroFuncionarios > 1) {
    newData.numeroFuncionarios = 1;
  }

  // Regra 4: Validar atividade financeira
  if (newData.atividade === ActivityType.FINANCEIRO) {
    if (newData.regimeAtual === TaxRegime.MEI || newData.regimeAtual === TaxRegime.SIMPLES_NACIONAL) {
      newData.regimeAtual = TaxRegime.LUCRO_PRESUMIDO;
    }
  }

  return newData;
}

// ==================== COMPANY DATA HISTORY HOOK ====================

export function useCompanyDataHistory() {
  const [history, setHistory] = useState<Array<{
    data: Partial<CompanyData>;
    timestamp: string;
    label?: string;
  }>>([]);

  const loadHistory = useCallback(() => {
    const savedHistory = loadFromLocalStorage<Array<{
      data: Partial<CompanyData>;
      timestamp: string;
    }>>(STORAGE_KEYS.COMPANY_DATA_HISTORY, []);

    setHistory(savedHistory.map((item, index) => ({
      ...item,
      label: index === 0 ? 'Última simulação' : `Simulação ${index + 1}`
    })));
  }, []);

  const clearHistory = useCallback(() => {
    removeFromLocalStorage(STORAGE_KEYS.COMPANY_DATA_HISTORY);
    setHistory([]);
  }, []);

  const saveSnapshot = useCallback((data: Partial<CompanyData>, label?: string) => {
    const newSnapshot = {
      data: { ...data },
      timestamp: new Date().toISOString(),
      label
    };

    setHistory(prev => {
      const newHistory = [newSnapshot, ...prev];

      // Manter apenas últimos 10 registros
      if (newHistory.length > 10) {
        newHistory.splice(10);
      }

      saveToLocalStorage(STORAGE_KEYS.COMPANY_DATA_HISTORY, newHistory);
      return newHistory;
    });
  }, []);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  return {
    history,
    loadHistory,
    clearHistory,
    saveSnapshot
  };
}

// ==================== QUICK PRESETS HOOK ====================

export function useCompanyPresets() {
  const presets = useMemo(() => [
    {
      id: 'mei_servicos',
      name: 'MEI - Serviços',
      description: 'Microempreendedor Individual prestando serviços',
      data: {
        faturamentoAnual: 50000,
        atividade: ActivityType.SERVICOS_GERAIS,
        setor: BusinessSector.SERVICOS,
        regimeAtual: TaxRegime.MEI,
        numeroFuncionarios: 0,
        estadoOperacao: 'SP'
      } as Partial<CompanyData>
    },
    {
      id: 'startup_tech',
      name: 'Startup de Tecnologia',
      description: 'Empresa de tecnologia em crescimento',
      data: {
        faturamentoAnual: 500000,
        atividade: ActivityType.TECNOLOGIA,
        setor: BusinessSector.SERVICOS_ANEXO_V,
        regimeAtual: TaxRegime.SIMPLES_NACIONAL,
        numeroFuncionarios: 5,
        estadoOperacao: 'SP',
        startupStage: 'growth'
      } as Partial<CompanyData>
    },
    {
      id: 'comercio_medio',
      name: 'Comércio Médio Porte',
      description: 'Empresa comercial de médio porte',
      data: {
        faturamentoAnual: 1200000,
        atividade: ActivityType.COMERCIO_VAREJO,
        setor: BusinessSector.COMERCIO,
        regimeAtual: TaxRegime.SIMPLES_NACIONAL,
        numeroFuncionarios: 15,
        estadoOperacao: 'SP'
      } as Partial<CompanyData>
    },
    {
      id: 'consultoria_grande',
      name: 'Consultoria Grande',
      description: 'Empresa de consultoria de grande porte',
      data: {
        faturamentoAnual: 25000000,
        atividade: ActivityType.CONSULTORIA,
        setor: BusinessSector.SERVICOS_ANEXO_V,
        regimeAtual: TaxRegime.LUCRO_PRESUMIDO,
        numeroFuncionarios: 50,
        estadoOperacao: 'SP'
      } as Partial<CompanyData>
    }
  ], []);

  const applyPreset = useCallback((presetId: string) => {
    const preset = presets.find(p => p.id === presetId);
    return preset?.data || null;
  }, [presets]);

  return {
    presets,
    applyPreset
  };
}