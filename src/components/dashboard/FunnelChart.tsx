import ReactECharts from 'echarts-for-react'
import { useSevenStore } from '../../store/useSevenStore'
import { countByFunnel, findBottleneck, calculateRates } from '../../utils/calculations'
import { Filter } from 'lucide-react'

export function FunnelChart() {
  const { leads, config } = useSevenStore()

  const counts = countByFunnel(leads)
  const rates = calculateRates(counts)
  const bottleneck = findBottleneck(rates, config)

  const data = [
    { value: counts.aquisicao, name: 'Aquisição', rate: 1 },
    { value: counts.ligacao, name: 'Ligação / Filtro', rate: rates.contato },
    { value: counts.convidados, name: 'Convidado (Aceitou)', rate: rates.qualificacao },
    { value: counts.compareceram, name: 'Compareceu (Mesa)', rate: rates.presenca },
    { value: counts.entrevista, name: 'Entrevista', rate: rates.selecao },
    { value: counts.fechamento, name: 'Fechamento', rate: rates.fechamento }
  ]

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      formatter: function(params: any) {
        const rate = params.data.rate * 100;
        const rateText = rate === 100 ? '' : `<br/><span style="color:#C5A059;font-size:12px">Taxa de Conversão: ${rate.toFixed(1)}%</span>`;
        return `${params.name}: <b>${params.value} Leads</b>${rateText}`;
      },
      backgroundColor: 'rgba(10, 10, 10, 0.95)',
      borderColor: 'rgba(212, 175, 55, 0.2)',
      textStyle: { color: '#fff', fontFamily: 'Plus Jakarta Sans' },
      padding: [12, 16],
      borderRadius: 8
    },
    series: [
      {
        name: 'Funil',
        type: 'funnel',
        left: '10%',
        right: '10%',
        top: '5%',
        bottom: '5%',
        width: '80%',
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 6,
        itemStyle: {
          borderColor: 'transparent',
          borderWidth: 0,
          borderRadius: 4
        },
        label: {
          show: true,
          position: 'inside',
          formatter: '{c}',
          fontFamily: 'JetBrains Mono',
          fontSize: 16,
          color: '#fff',
          fontWeight: 'bold',
          textShadowColor: 'rgba(0,0,0,0.5)',
          textShadowBlur: 4,
          textShadowOffsetX: 0,
          textShadowOffsetY: 2
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        emphasis: {
          label: { fontSize: 20 },
          itemStyle: {
            shadowBlur: 20,
            shadowColor: 'rgba(212, 175, 55, 0.5)'
          }
        },
        data: data.map((item, index) => {
          // Gradient from Gold to Dark Gold based on position
          const opacity = 1 - (index * 0.12)
          return {
            ...item,
            itemStyle: {
              color: `rgba(212, 175, 55, ${opacity})`
            }
          }
        })
      }
    ]
  }

  return (
    <div className="bento-card h-full flex flex-col min-h-[400px] animate-slide-up" style={{ animationDelay: '200ms' }}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg text-white">
            <Filter size={20} aria-hidden="true" />
          </div>
          <div>
            <h2 className="heading-playfair text-lg text-white">Funil de Conversão</h2>
            <p className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-wider mt-1">Volume Absoluto</p>
          </div>
        </div>
        {bottleneck && (
          <div className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full flex items-center relative">
            <span className="absolute -left-1 -top-1 w-3 h-3 bg-red-500 rounded-full animate-ping opacity-75"></span>
            <span className="absolute -left-1 -top-1 w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-[10px] text-red-400 font-medium ml-3 uppercase tracking-wider">
              Gargalo: {bottleneck.label}
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 -mx-4 -mb-4 mt-4">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%', minHeight: '350px' }}
          opts={{ renderer: 'svg' }}
        />
      </div>
    </div>
  )
}
