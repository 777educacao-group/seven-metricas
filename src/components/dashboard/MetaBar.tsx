import { useMemo } from 'react'
import { useSevenStore } from '../../store/useSevenStore'
import { formatBRLCompact, formatPercent } from '../../utils/formatters'
import { Target } from 'lucide-react'

export function MetaBar() {
  const { leads, config } = useSevenStore()

  const valorColetado = useMemo(() => 
    leads.reduce((acc, lead) => acc + (lead.valorColetado || 0), 0)
  , [leads])

  const progress = Math.min(100, Math.max(0, (valorColetado / config.metaAnual) * 100))
  
  // Luxury gradient for the progress bar
  const gradient = progress >= 100 
    ? 'linear-gradient(90deg, #34D399 0%, #10B981 100%)' 
    : 'linear-gradient(90deg, #8A6D3B 0%, #D4AF37 50%, #F3E5AB 100%)'

  return (
    <div className="bento-card">
      <div className="flex justify-between items-end mb-4">
        <div>
          <h2 className="heading-playfair text-lg text-[rgba(255,255,255,0.7)] flex items-center gap-2">
            <Target size={18} className="text-[#D4AF37]" aria-hidden="true" />
            Meta Executiva Anual
          </h2>
          <div className="mt-2 flex items-baseline gap-3">
            <span className="text-4xl metric-value text-white font-bold tracking-tight">
              {formatBRLCompact(valorColetado)}
            </span>
            <span className="text-sm font-medium text-[rgba(255,255,255,0.4)]">
              de {formatBRLCompact(config.metaAnual)}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-3xl metric-value font-medium text-[#D4AF37]">
            {formatPercent(progress / 100)}
          </span>
        </div>
      </div>
      
      {/* Progress Track */}
      <div className="h-3 w-full bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden border border-[rgba(255,255,255,0.02)]">
        <div 
          className="h-full rounded-full transition-all duration-1000 ease-out relative"
          style={{ 
            width: `${progress}%`,
            background: gradient,
            boxShadow: '0 0 10px rgba(212, 175, 55, 0.4)'
          }}
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.3)] to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </div>
  )
}
