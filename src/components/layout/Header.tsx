import { Tv, Edit, RefreshCw } from 'lucide-react'
import { useSevenStore } from '../../store/useSevenStore'

export function Header() {
  const { isTvMode, toggleTvMode, loadDemoData } = useSevenStore()

  return (
    <header className="sticky top-0 z-50 bg-[#030303]/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          <div className="flex items-center gap-4">
            {/* Logo placeholder, replacing image for now since they lost it */}
            <div className="flex flex-col">
              <span className="text-2xl font-bold tracking-widest text-[#D4AF37]" style={{ fontFamily: 'var(--font-display)' }}>
                SEVEN
              </span>
              <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[rgba(255,255,255,0.5)] -mt-1">
                Executive Dashboard
              </span>
            </div>
            
            <div className="hidden md:block h-8 w-px bg-[rgba(255,255,255,0.1)] mx-4"></div>
            
            <div className="hidden md:block">
              <span className="badge-premium badge-gold">
                Ciclo Atual
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!isTvMode && (
              <button 
                onClick={loadDemoData}
                className="btn-ghost !text-xs hidden sm:flex"
                aria-label="Carregar Dados Demo"
              >
                <RefreshCw size={14} className="mr-2" aria-hidden="true" />
                Demo Data
              </button>
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
    </header>
  )
}
