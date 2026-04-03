import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Lead, Config, Period } from '../types'
import { MOCK_LEADS, DEFAULT_CONFIG } from '../utils/mockData'
import { isWithinInterval, startOfMonth, endOfMonth, startOfQuarter, endOfQuarter, startOfYear, endOfYear, parseISO } from 'date-fns'

interface SevenState {
  leads: Lead[]
  config: Config
  period: Period
  isTvMode: boolean
  addLead: (lead: Lead) => void
  updateLead: (lead: Lead) => void
  deleteLead: (id: string) => void
  updateConfig: (newConfig: Partial<Config>) => void
  setPeriod: (period: Period) => void
  toggleTvMode: () => void
  loadDemoData: () => void
}

export const useSevenStore = create<SevenState>()(
  persist(
    (set) => ({
      leads: MOCK_LEADS,
      config: DEFAULT_CONFIG,
      period: { tipo: 'ano' },
      isTvMode: false,

      addLead: (lead) => set((state) => ({ leads: [...state.leads, lead] })),
      updateLead: (updated) => set((state) => ({
        leads: state.leads.map(l => l.id === updated.id ? updated : l)
      })),
      deleteLead: (id) => set((state) => ({
        leads: state.leads.filter(l => l.id !== id)
      })),
      updateConfig: (newConfig) => set((state) => ({
        config: { ...state.config, ...newConfig }
      })),
      setPeriod: (period) => set({ period }),
      toggleTvMode: () => set((state) => ({ isTvMode: !state.isTvMode })),
      loadDemoData: () => set({ leads: MOCK_LEADS, config: DEFAULT_CONFIG })
    }),
    {
      name: 'seven-executive-storage',
      partialize: (state) => ({ leads: state.leads, config: state.config, isTvMode: state.isTvMode, period: state.period })
    }
  )
)

export function useFilteredLeads() {
  const leads = useSevenStore(s => s.leads)
  const period = useSevenStore(s => s.period)

  if (period.tipo === 'geral') return leads

  const now = new Date()
  let start: Date
  let end: Date

  switch (period.tipo) {
    case 'mes':
      start = startOfMonth(now)
      end = endOfMonth(now)
      break
    case 'trimestre':
      start = startOfQuarter(now)
      end = endOfQuarter(now)
      break
    case 'ano':
      start = startOfYear(now)
      end = endOfYear(now)
      break
    case 'custom':
      if (!period.inicio || !period.fim) return leads
      start = parseISO(period.inicio)
      end = parseISO(period.fim)
      break
    default:
      return leads
  }

  return leads.filter(l => {
    const leadDate = parseISO(l.dataEntrada)
    return isWithinInterval(leadDate, { start, end })
  })
}
