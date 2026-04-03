import type { Lead, Config } from '../types'

let id = 0
function genId(): string {
  return `lead_${++id}_${Date.now()}`
}

export const MOCK_LEADS: Lead[] = [
  // === AQUISIÇÃO (3 leads) ===
  { id: genId(), nome: 'Roberto Lima', origem: 'Instagram', responsavel: 'SDR 01', dataEntrada: '2026-03-25', etapa: 'aquisicao', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Chegou pelo story do Dennis' },
  { id: genId(), nome: 'Fernanda Alves', origem: 'SDR', responsavel: 'SDR 01', dataEntrada: '2026-03-26', etapa: 'aquisicao', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Formulário preenchido via LinkedIn' },
  { id: genId(), nome: 'Thiago Mendes', origem: 'Indicação', responsavel: 'Ana Costa', dataEntrada: '2026-03-27', etapa: 'aquisicao', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Indicado por cliente antigo' },

  // === LIGAÇÃO / QUALIFICAÇÃO (3 leads) ===
  { id: genId(), nome: 'Patrícia Rocha', origem: 'SDR', responsavel: 'SDR 01', dataEntrada: '2026-03-20', etapa: 'ligacao', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Validação de perfil em andamento' },
  { id: genId(), nome: 'Eduardo Santos', origem: 'Instagram', responsavel: 'Carlos M.', dataEntrada: '2026-03-18', etapa: 'ligacao', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Empresa de tech, bom perfil' },
  { id: genId(), nome: 'Juliana Freitas', origem: 'Contato Direto', responsavel: 'Ana Costa', dataEntrada: '2026-03-15', etapa: 'ligacao', status: 'reagendado', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Pediu p/ ligar na semana seguinte' },

  // === CONVIDADOS (2 leads) ===
  { id: genId(), nome: 'Marcos Oliveira', origem: 'SDR', responsavel: 'Carlos M.', dataEntrada: '2026-03-10', etapa: 'convidados', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Confirmou presença para 05/04' },
  { id: genId(), nome: 'Camila Duarte', origem: 'Indicação', responsavel: 'Dennis N.', dataEntrada: '2026-03-08', etapa: 'convidados', status: 'ativo', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'No grupo de aquecimento' },

  // === COMPARECERAM (2 leads, 1 é no-show) ===
  { id: genId(), nome: 'André Vieira', origem: 'SDR', responsavel: 'Ana Costa', dataEntrada: '2026-03-01', etapa: 'compareceram', status: 'ativo', compareceu: true, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Participou da mesa' },
  { id: genId(), nome: 'Beatriz Nunes', origem: 'Instagram', responsavel: 'SDR 01', dataEntrada: '2026-02-28', etapa: 'convidados', status: 'no_show', compareceu: false, foiEntrevistado: false, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Faltou sem aviso' },

  // === ENTREVISTA (2 leads) ===
  { id: genId(), nome: 'Ricardo Gomes', origem: 'Indicação', responsavel: 'Dennis N.', dataEntrada: '2026-02-15', etapa: 'entrevista', status: 'ativo', compareceu: true, foiEntrevistado: true, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Entrevista marcada' },
  { id: genId(), nome: 'Luciana Castro', origem: 'SDR', responsavel: 'Carlos M.', dataEntrada: '2026-02-10', etapa: 'entrevista', status: 'ativo', compareceu: true, foiEntrevistado: true, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Forte interesse' },

  // === FECHAMENTO: COMPROU (2 leads) ===
  { id: genId(), nome: 'Felipe Araújo', origem: 'Indicação', responsavel: 'Dennis N.', dataEntrada: '2026-01-20', etapa: 'fechamento', status: 'comprou', compareceu: true, foiEntrevistado: true, comprou: true, valorVendido: 91000, valorColetado: 91000, observacoes: 'Pagamento à vista' },
  { id: genId(), nome: 'Daniela Martins', origem: 'SDR', responsavel: 'Ana Costa', dataEntrada: '2026-02-05', etapa: 'fechamento', status: 'comprou', compareceu: true, foiEntrevistado: true, comprou: true, valorVendido: 91000, valorColetado: 45000, observacoes: 'Parcelado em 2x' },

  // === FECHAMENTO: FOLLOW-UP (3 leads) ===
  { id: genId(), nome: 'Bruno Teixeira', origem: 'Instagram', responsavel: 'Carlos M.', dataEntrada: '2026-02-12', etapa: 'fechamento', status: 'follow_up', compareceu: true, foiEntrevistado: true, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Falar com sócio' },
  { id: genId(), nome: 'Amanda Souza', origem: 'Contato Direto', responsavel: 'Dennis N.', dataEntrada: '2026-02-20', etapa: 'fechamento', status: 'follow_up', compareceu: true, foiEntrevistado: true, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Ver e retornar' },
  { id: genId(), nome: 'Gabriel Pereira', origem: 'SDR', responsavel: 'Ana Costa', dataEntrada: '2026-03-02', etapa: 'fechamento', status: 'follow_up', compareceu: true, foiEntrevistado: true, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Negociar valor' },

  // === FECHAMENTO: NÃO COMPROU (1 lead) ===
  { id: genId(), nome: 'Vanessa Cardoso', origem: 'Instagram', responsavel: 'SDR 01', dataEntrada: '2026-01-28', etapa: 'fechamento', status: 'nao_comprou', compareceu: true, foiEntrevistado: true, comprou: false, valorVendido: 0, valorColetado: 0, observacoes: 'Sem fit' },
]

export const DEFAULT_CONFIG: Config = {
  metaAnual: 6000000,
  taxaPresencaEsperada: 0.70,
  taxaEntrevistaEsperada: 0.65,
  taxaFechamentoEsperada: 0.35,
  taxaQualificacaoEsperada: 0.80,
  taxaContatoEsperada: 0.85,
  precoLiquido: 75000,
  precoBruto: 91000,
}
