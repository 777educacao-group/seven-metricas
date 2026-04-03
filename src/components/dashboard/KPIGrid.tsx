import { useSevenStore } from '../../store/useSevenStore'
import { formatBRLCompact, formatPercent } from '../../utils/formatters'
import { calculateRates, countByFunnel } from '../../utils/calculations'
import { TrendingUp, Users, CheckCircle, AlertCircle, DollarSign, Activity } from 'lucide-react'

// Sub-component for individual KPI Card
function KPICard({ title, value, subtitle, icon: Icon, colorClass, delay }: any) {
  return (
    <div 
      className="bento-card flex flex-col justify-between animate-fade-in"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'both' }}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2 rounded-lg bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] ${colorClass}`}>
          <Icon size={20} aria-hidden="true" />
        </div>
      </div>
      <div>
        <p className="text-3xl metric-value font-semibold mb-1 text-white tracking-tight">{value}</p>
        <h3 className="text-xs font-semibold uppercase tracking-widest text-[rgba(255,255,255,0.5)] font-body">
          {title}
        </h3>
        {subtitle && (
          <p className="text-[10px] text-[rgba(255,255,255,0.3)] mt-1 tracking-wider uppercase">{subtitle}</p>
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
  
  // Follow Up Potential Calculation
  const followUpLeads = leads.filter(l => l.etape === 'fechamento' && l.status === 'follow_up')
  const potencialFU = followUpLeads.length * config.precoLiquido
  
  const ticketMedio = leads.filter(l => l.comprou).length > 0 
    ? valorVendido / leads.filter(l => l.comprou).length 
    : 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      <KPICard 
        title="Contratos (VGV)" 
        value={formatBRLCompact(valorVendido)} 
        subtitle="Volume Geral"
        icon={TrendingUp} 
        colorClass="text-emerald-400"
        delay={100}
      />
      <KPICard 
        title="Presença" 
        value={formatPercent(rates.presenca)} 
        subtitle={`Meta: ${formatPercent(config.taxaPresencaEsperada)}`} 
        icon={Users} 
        colorClass={rates.presenca >= config.taxaPresencaEsperada ? "text-emerald-400" : "text-[#FACC15]"}
        delay={150}
      />
      <KPICard 
        title="Conversão Final" 
        value={formatPercent(rates.fechamento)} 
        subtitle={`Meta: ${formatPercent(config.taxaFechamentoEsperada)}`} 
        icon={CheckCircle} 
        colorClass={rates.fechamento >= config.taxaFechamentoEsperada ? "text-emerald-400" : "text-[#FACC15]"}
        delay={200}
      />
      <KPICard 
        title="Follow Ups" 
        value={followUpLeads.length.toString()} 
        subtitle={formatBRLCompact(potencialFU) + " potencial"} 
        icon={AlertCircle} 
        colorClass="text-[#D4AF37]"
        delay={250}
      />
      <KPICard 
        title="Ticket Médio" 
        value={formatBRLCompact(ticketMedio)} 
        subtitle="Valor Bruto/Liq"
        icon={DollarSign} 
        colorClass="text-[rgba(255,255,255,0.8)]"
        delay={300}
      />
      <KPICard 
        title="Leads Ativos" 
        value={leads.filter(l => l.status === 'ativo').length.toString()} 
        subtitle="Em negociação"
        icon={Activity} 
        colorClass="text-[rgba(255,255,255,0.8)]"
        delay={350}
      />
    </div>
  )
}
