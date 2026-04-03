import { useSevenStore, useFilteredLeads } from '../../store/useSevenStore'
import { countByFunnel, calculateRates, findBottleneck } from '../../utils/calculations'
import { formatBRLCompact, formatPercent } from '../../utils/formatters'
import { MessageSquare } from 'lucide-react'

export function ExecutiveSummary() {
  const { config } = useSevenStore()
  const leads = useFilteredLeads()

  const counts = countByFunnel(leads)
  const rates = calculateRates(counts)
  const bottleneck = findBottleneck(rates, config)

  const valorColetado = leads.reduce((acc, l) => acc + (l.valorColetado || 0), 0)
  const progress = config.metaAnual > 0 ? valorColetado / config.metaAnual : 0

  const followUpLeads = leads.filter(l => l.etapa === 'fechamento' && l.status === 'follow_up')
  const potencialFU = followUpLeads.reduce(
    (sum, l) => sum + (l.valorVendido > 0 ? l.valorVendido : config.precoLiquido), 0
  )

  const phrases: string[] = [
    `A operação está em ${formatPercent(progress)} da meta anual — ${formatBRLCompact(valorColetado)} de ${formatBRLCompact(config.metaAnual)}.`,
  ]

  if (bottleneck && bottleneck.diff < 0) {
    phrases.push(
      `O maior gargalo está na ${bottleneck.label.toLowerCase()} — performance ${Math.abs(Math.round(bottleneck.diff * 100))}pp abaixo do esperado.`
    )
  } else {
    phrases.push('Todas as taxas de conversão estão dentro ou acima das metas configuradas.')
  }

  if (followUpLeads.length > 0) {
    phrases.push(
      `${formatBRLCompact(potencialFU)} em potencial parado em ${followUpLeads.length} lead${followUpLeads.length > 1 ? 's' : ''} de follow-up.`
    )
  }

  return (
    <div className="bento-card animate-fade-in" style={{ animationDelay: '400ms' }}>
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg text-[#C5A059]">
          <MessageSquare size={18} aria-hidden="true" />
        </div>
        <h2 className="heading-playfair text-base text-white">Resumo Executivo</h2>
      </div>

      <div className="space-y-2">
        {phrases.map((p, i) => (
          <p key={i} className="text-sm leading-relaxed text-[rgba(255,255,255,0.65)]" aria-live="polite">
            <span className="text-[rgba(255,255,255,0.25)] mr-2">—</span>
            {p}
          </p>
        ))}
      </div>
    </div>
  )
}
