import { useState } from 'react'
import { Tv, Edit, RefreshCw, Settings, Calendar } from 'lucide-react'
import { useSevenStore } from '../../store/useSevenStore'
import type { PeriodType } from '../../types'
import { MetaModal } from '../modal/MetaModal'

export function Header() {
  const { isTvMode, toggleTvMode, loadDemoData, period, setPeriod } = useSevenStore()
  const [isMetaModalOpen, setIsMetaModalOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-4">
            <img 
              src="/logo_seven.png" 
              alt="Seven Painel" 
              className="h-8 w-auto object-contain flex-shrink-0" 
              fetchPriority="high"
            />
            
            <div className="hidden md:block h-8 w-px bg-[rgba(255,255,255,0.1)] mx-4"></div>
            
            <div className="hidden md:flex items-center bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg px-3 min-h-[36px]">
              <Calendar size={14} className="text-[rgba(255,255,255,0.4)] mr-2" />
              <select 
                className="bg-transparent border-none text-xs text-[rgba(255,255,255,0.8)] outline-none focus:ring-0 cursor-pointer uppercase tracking-wider font-semibold"
                value={period.tipo}
                onChange={(e) => setPeriod({ ...period, tipo: e.target.value as PeriodType })}
                aria-label="Filtro de Período"
              >
                <option className="bg-[#0f1118]" value="mes">Este Mês</option>
                <option className="bg-[#0f1118]" value="trimestre">Este Trimestre</option>
                <option className="bg-[#0f1118]" value="ano">YTD (Ano)</option>
                <option className="bg-[#0f1118]" value="geral">Todo o Período</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isTvMode && (
              <>
                <button 
                  onClick={loadDemoData}
                  className="btn-ghost !text-xs hidden sm:flex"
                  aria-label="Carregar Dados Demo"
                >
                  <RefreshCw size={14} className="mr-2" aria-hidden="true" />
                  Demo Data
                </button>
                <button
                  onClick={() => setIsMetaModalOpen(true)}
                  className="btn-icon"
                  aria-label="Configurar Meta"
                >
                  <Settings size={18} aria-hidden="true" />
                </button>
              </>
            )}

            <button
              onClick={toggleTvMode}
              className={`btn-ghost ${isTvMode ? 'text-[#D4AF37] border-[#D4AF37]/30 bg-[#D4AF37]/10' : ''}`}
              aria-label={isTvMode ? 'Sair do Modo TV' : 'Entrar no Modo TV'}
            >
              {isTvMode ? <Tv size={18} aria-hidden="true" /> : <Edit size={18} aria-hidden="true" />}
              <span className="ml-2 hidden sm:inline">{isTvMode ? 'Modo TV' : 'Edição'}</span>
            </button>
          </div>
          
        </div>
      </div>
      
      <MetaModal isOpen={isMetaModalOpen} onClose={() => setIsMetaModalOpen(false)} />
    </header>
  )
}
