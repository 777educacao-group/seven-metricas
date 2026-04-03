import type { Lead, Config, FunnelStage } from '../types'

export function countByFunnel(leads: Lead[]): Record<FunnelStage, number> {
  const counts = { aquisicao: 0, ligacao: 0, convidados: 0, compareceram: 0, entrevista: 0, fechamento: 0 }
  leads.forEach(l => {
    // Lead is counted in its current stage AND all previous stages logically
    counts.aquisicao++
    if (['ligacao', 'convidados', 'compareceram', 'entrevista', 'fechamento'].includes(l.etapa)) counts.ligacao++
    if (['convidados', 'compareceram', 'entrevista', 'fechamento'].includes(l.etapa)) counts.convidados++
    if (l.compareceu) counts.compareceram++
    if (l.foiEntrevistado) counts.entrevista++
    if (['fechamento'].includes(l.etapa)) counts.fechamento++
  })
  return counts
}

export function calculateRates(counts: Record<FunnelStage, number>) {
  return {
    contato: counts.aquisicao > 0 ? counts.ligacao / counts.aquisicao : 0,
    qualificacao: counts.ligacao > 0 ? counts.convidados / counts.ligacao : 0,
    presenca: counts.convidados > 0 ? counts.compareceram / counts.convidados : 0,
    selecao: counts.compareceram > 0 ? counts.entrevista / counts.compareceram : 0,
    fechamento: counts.entrevista > 0 ? counts.fechamento / counts.entrevista : 0,
  }
}

export function findBottleneck(rates: any, config: Config) {
  const diffs = [
    { label: 'Taxa de Contato (Aq -> Lig)', diff: rates.contato - config.taxaContatoEsperada },
    { label: 'Taxa de Qualif. (Lig -> Conv)', diff: rates.qualificacao - config.taxaQualificacaoEsperada },
    { label: 'Taxa de Presença (Conv -> Comp)', diff: rates.presenca - config.taxaPresencaEsperada },
    { label: 'Taxa de Seleção (Comp -> Entrev)', diff: rates.selecao - config.taxaEntrevistaEsperada },
    { label: 'Taxa de Fechamento (Entrev -> Fech)', diff: rates.fechamento - config.taxaFechamentoEsperada }
  ]
  diffs.sort((a, b) => a.diff - b.diff)
  return diffs[0].diff < 0 ? diffs[0] : null
}

export function reversePlanning(metaVendas: number, config: Config) {
  const vendas = metaVendas
  const entrevistas = Math.ceil(vendas / config.taxaFechamentoEsperada)
  const presencas = Math.ceil(entrevistas / config.taxaEntrevistaEsperada)
  const convidados = Math.ceil(presencas / config.taxaPresencaEsperada)
  const ligacoes = Math.ceil(convidados / config.taxaQualificacaoEsperada)
  const aquisicoes = Math.ceil(ligacoes / config.taxaContatoEsperada)
  return { vendas, entrevistas, presencas, convidados, ligacoes, aquisicoes }
}
