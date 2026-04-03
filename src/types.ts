export type FunnelStage = 
  | 'aquisicao'
  | 'ligacao' 
  | 'convidados'
  | 'compareceram'
  | 'entrevista'
  | 'fechamento';

export type LeadStatus = 
  | 'ativo'
  | 'reagendado'
  | 'no_show'
  | 'comprou'
  | 'nao_comprou'
  | 'follow_up';

export interface Lead {
  id: string;
  nome: string;
  origem: string;
  responsavel: string;
  dataEntrada: string;
  etapa: FunnelStage;
  status: LeadStatus;
  compareceu: boolean;
  foiEntrevistado: boolean;
  comprou: boolean;
  valorVendido: number;
  valorColetado: number;
  observacoes: string;
}

export interface Config {
  metaAnual: number;
  taxaPresencaEsperada: number;
  taxaEntrevistaEsperada: number;
  taxaFechamentoEsperada: number;
  taxaQualificacaoEsperada: number;
  taxaContatoEsperada: number;
  precoLiquido: number;
  precoBruto: number;
}
