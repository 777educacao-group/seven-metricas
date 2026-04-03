import { useMemo } from 'react'
import { useSevenStore } from '../../store/useSevenStore'
import { countByFunnel, calculateRates, reversePlanning } from '../../utils/calculations'
import { CalendarDays } from 'lucide-react'

export default function ReversePlanning() {
  const { leads, config } = useSevenStore()
  const counts = useMemo(() => countByFunnel(leads), [leads])
  const rates = useMemo(() => calculateRates(counts), [counts])

  const metaVendas = Math.ceil(config.metaAnual / config.precoLiquido)
  const plan = useMemo(() => reversePlanning(metaVendas, config), [metaVendas, config])

  const semanal = {
    vendas: (plan.vendas / 52).toFixed(1),
    entrevistas: (plan.entrevistas / 52).toFixed(1),
    presencas: (plan.presencas / 52).toFixed(1),
    convidados: (plan.convidados / 52).toFixed(1),
    ligacoes: (plan.ligacoes / 52).toFixed(1),
    aquisicoes: (plan.aquisicoes / 52).toFixed(1),
  }

  return (
    <div className="bento-card flex-1 flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg text-white">
          <CalendarDays size={20} aria-hidden="true" />
        </div>
        <h2 className="heading-playfair text-lg text-white">Engenharia Reversa</h2>
      </div>

      <div className="space-y-4 mb-6">
        <p className="text-sm text-[rgba(255,255,255,0.6)] leading-relaxed">
          Para atingir <strong className="text-[#D4AF37] font-semibold">{metaVendas} vendas</strong> no ano mantendo as taxas atuais, 
          seu funil exige a seguinte tração semanal:
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'Aquisições', val: semanal.aquisicoes, icon: '🎯' },
            { label: 'Ligações', val: semanal.ligacoes, icon: '📞' },
            { label: 'Convidados', val: semanal.convidados, icon: '✉️' },
            { label: 'Mesa (Presença)', val: semanal.presencas, icon: '🤝' },
            { label: 'Entrevistas', val: semanal.entrevistas, icon: '📋' },
            { label: 'Fechamentos', val: semanal.vendas, icon: '💎' },
          ].map((item, i) => (
            <div key={i} className="p-3 bg-[rgba(0,0,0,0.2)] border border-[rgba(255,255,255,0.03)] rounded-xl flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[rgba(255,255,255,0.4)] mb-1">{item.label}</p>
                <p className="text-xl metric-value text-white">{item.val}</p>
              </div>
              <span className="text-lg opacity-50 grayscale">{item.icon}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.05)]">
        <h3 className="text-xs uppercase tracking-widest text-[rgba(255,255,255,0.4)] mb-3">Auditoria de Taxas (Real vs Projeto)</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: 'Contato', r: rates.contato, e: config.taxaContatoEsperada },
            { label: 'Qualifica.', r: rates.qualificacao, e: config.taxaQualificacaoEsperada },
            { label: 'Presença', r: rates.presenca, e: config.taxaPresencaEsperada },
            { label: 'Seleção', r: rates.selecao, e: config.taxaEntrevistaEsperada },
            { label: 'Conversão', r: rates.fechamento, e: config.taxaFechamentoEsperada }
          ].map((t, i) => {
            const isOk = t.r >= t.e;
            return (
              <div key={i} className={`text-[10px] px-2 py-1 rounded border ${isOk ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {t.label}: {Math.round(t.r * 100)}%
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
