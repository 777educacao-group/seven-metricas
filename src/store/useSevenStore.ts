import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Lead, Config } from '../types'
import { MOCK_LEADS, DEFAULT_CONFIG } from '../utils/mockData'

interface SevenState {
  leads: Lead[]
  config: Config
  isTvMode: boolean
  addLead: (lead: Lead) => void
  updateLead: (lead: Lead) => void
  deleteLead: (id: string) => void
  updateConfig: (newConfig: Partial<Config>) => void
  toggleTvMode: () => void
  loadDemoData: () => void
}

export const useSevenStore = create<SevenState>()(
  persist(
    (set) => ({
      leads: MOCK_LEADS,
      config: DEFAULT_CONFIG,
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
      toggleTvMode: () => set((state) => ({ isTvMode: !state.isTvMode })),
      loadDemoData: () => set({ leads: MOCK_LEADS, config: DEFAULT_CONFIG })
    }),
    {
      name: 'seven-executive-storage',
    }
  )
)
