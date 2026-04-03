import { useSevenStore } from '../../store/useSevenStore'
import { formatBRLCompact, formatPercent } from '../../utils/formatters'
import { calculateRates, countByFunnel } from '../../utils/calculations'
import { TrendingUp, Users, CheckCircle, AlertCircle, DollarSign, Activity } from 'lucide-react'

type SemaforoLevel = 'verde' | 'ambar' | 'vermelho' | 'neutral'

function getSemaforo(value: number, threshold: number): SemaforoLevel {
  if (threshold <= 0) return 'neutral'
  const ratio = value / threshold
  if (ratio >= 1) return 'verde'
  if (ratio >= 0.7) return 'ambar'
  return 'vermelho'
}

function KPICard({ title, value, subtitle, icon: Icon, semaforo, glowClass, delay }: {
  title: string
  value: string
  subtitle?: string
  icon: React.ElementType
  semaforo: SemaforoLevel
  glowClass?: string
  delay: number
}) {
  const dotClass = {
    verde: 'semaforo-verde',
    ambar: 'semaforo-ambar',
    vermelho: 'semaforo-vermelho',
    neutral: '',
  }[semaforo]

  return (
    <div
      className={`bento-card flex flex-col justify-between animate-fade-in ${glowClass || ''}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.6)]">
          <Icon size={18} aria-hidden="true" />
        </div>
        {semaforo !== 'neutral' && <div className={`semaforo-dot ${dotClass}`} />}
      </div>
      <div>
        <p className="text-3xl metric-value font-semibold mb-1 text-white tracking-tight">{value}</p>
        <h3 className="text-[0.65rem] font-semibold uppercase tracking-widest text-[rgba(255,255,255,0.45)]">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[0.6rem] text-[rgba(255,255,255,0.28)] mt-1 tracking-wider uppercase">{subtitle}</p>
        )}
      </div>
    </div>
  )
}

export function KPIGrid() {
  const { leads, config } = useSevenStore()
  const counts = countByFunnel(leads)
  const rates = calculateRates(counts)

  const valorVendido = leads.reduce((acc, l) => acc + (l.valorVendido || 0), 0)
  const valorColetado = leads.reduce((acc, l) => acc + (l.valorColetado || 0), 0)

  const followUpLeads = leads.filter(l => l.etapa === 'fechamento' && l.status === 'follow_up')
  const potencialFU = followUpLeads.reduce(
    (sum, l) => sum + (l.valorVendido > 0 ? l.valorVendido : config.precoLiquido), 0
  )

  const ticketMedio = leads.filter(l => l.comprou).length > 0
    ? valorVendido / leads.filter(l => l.comprou).length
    : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <KPICard
        title="Volume Vendido"
        value={formatBRLCompact(valorVendido)}
        subtitle={`Coletado: ${formatBRLCompact(valorColetado)}`}
        icon={TrendingUp}
        semaforo="neutral"
        delay={80}
      />
      <KPICard
        title="Taxa de Presença"
        value={formatPercent(rates.presenca)}
        subtitle={`Meta: ${formatPercent(config.taxaPresencaEsperada)}`}
        icon={Users}
        semaforo={getSemaforo(rates.presenca, config.taxaPresencaEsperada)}
        delay={160}
      />
      <KPICard
        title="Taxa de Fechamento"
        value={formatPercent(rates.fechamento)}
        subtitle={`Meta: ${formatPercent(config.taxaFechamentoEsperada)}`}
        icon={CheckCircle}
        semaforo={getSemaforo(rates.fechamento, config.taxaFechamentoEsperada)}
        delay={240}
      />
      <KPICard
        title="Follow Up"
        value={followUpLeads.length.toString()}
        subtitle={`${formatBRLCompact(potencialFU)} potencial`}
        icon={AlertCircle}
        semaforo="neutral"
        glowClass="glow-gold"
        delay={320}
      />
      <KPICard
        title="Ticket Médio"
        value={formatBRLCompact(ticketMedio)}
        icon={DollarSign}
        semaforo="neutral"
        delay={400}
      />
      <KPICard
        title="Leads Ativos"
        value={leads.filter(l => l.status === 'ativo').length.toString()}
        subtitle="Em pipeline"
        icon={Activity}
        semaforo="neutral"
        delay={480}
      />
    </div>
  )
}
