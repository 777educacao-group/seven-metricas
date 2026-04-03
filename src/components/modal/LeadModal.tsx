import { useState, useEffect, useRef } from 'react'
import { useSevenStore } from '../../store/useSevenStore'
import type { Lead, FunnelStage, LeadStatus } from '../../types'
import { X, Trash2 } from 'lucide-react'

interface LeadModalProps {
  isOpen: boolean
  onClose: () => void
  lead?: Lead | null
}

const STAGES: { value: FunnelStage; label: string }[] = [
  { value: 'aquisicao', label: 'Aquisição' },
  { value: 'ligacao', label: 'Ligação / Qualificação' },
  { value: 'convidados', label: 'Convidado' },
  { value: 'compareceram', label: 'Compareceu' },
  { value: 'entrevista', label: 'Entrevista' },
  { value: 'fechamento', label: 'Fechamento' },
]

const STATUSES: { value: LeadStatus; label: string }[] = [
  { value: 'ativo', label: 'Ativo' },
  { value: 'reagendado', label: 'Reagendado' },
  { value: 'no_show', label: 'No Show' },
  { value: 'comprou', label: 'Comprou' },
  { value: 'nao_comprou', label: 'Não Comprou' },
  { value: 'follow_up', label: 'Follow Up' },
]

const ORIGENS = ['SDR', 'Instagram', 'Indicação', 'Contato Direto']
const RESPONSAVEIS = ['Ana Costa', 'Carlos M.', 'SDR 01', 'Dennis N.']

function generateId() {
  return `lead_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
}

const EMPTY_LEAD: Omit<Lead, 'id'> = {
  nome: '',
  origem: 'SDR',
  responsavel: 'SDR 01',
  dataEntrada: new Date().toISOString().split('T')[0],
  etapa: 'aquisicao',
  status: 'ativo',
  compareceu: false,
  foiEntrevistado: false,
  comprou: false,
  valorVendido: 0,
  valorColetado: 0,
  observacoes: '',
}

export function LeadModal({ isOpen, onClose, lead }: LeadModalProps) {
  const { addLead, updateLead, deleteLead } = useSevenStore()
  const isEditing = !!lead
  const firstInputRef = useRef<HTMLInputElement>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [form, setForm] = useState<Omit<Lead, 'id'>>(EMPTY_LEAD)

  useEffect(() => {
    if (lead) {
      const { id, ...rest } = lead
      setForm(rest)
    } else {
      setForm({ ...EMPTY_LEAD, dataEntrada: new Date().toISOString().split('T')[0] })
    }
    setShowDeleteConfirm(false)
  }, [lead, isOpen])

  // Guideline: autoFocus sparingly — single primary input, desktop only
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      const timer = setTimeout(() => firstInputRef.current?.focus(), 100)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKey)
      return () => document.removeEventListener('keydown', handleKey)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleChange(field: string, value: string | number | boolean) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSave() {
    if (!form.nome.trim()) {
      firstInputRef.current?.focus()
      return
    }
    if (isEditing && lead) {
      updateLead({ ...form, id: lead.id })
    } else {
      addLead({ ...form, id: generateId() })
    }
    onClose()
  }

  function handleDelete() {
    if (lead) {
      deleteLead(lead.id)
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label={isEditing ? 'Editar Lead' : 'Novo Lead'}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.06)]">
          <h2 className="heading-playfair text-xl text-white">
            {isEditing ? 'Editar Lead' : 'Novo Lead'}
          </h2>
          <button onClick={onClose} className="btn-icon" aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Row 1: Nome */}
          <div>
            <label htmlFor="lead-nome" className="label-premium">Nome Completo</label>
            <input
              ref={firstInputRef}
              id="lead-nome"
              name="nome"
              type="text"
              className="input-premium"
              value={form.nome}
              onChange={e => handleChange('nome', e.target.value)}
              placeholder="Ex: João Silva…"
              autoComplete="off"
            />
          </div>

          {/* Row 2: Origem + Responsável */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-origem" className="label-premium">Origem</label>
              <select
                id="lead-origem"
                name="origem"
                className="select-premium"
                value={form.origem}
                onChange={e => handleChange('origem', e.target.value)}
              >
                {ORIGENS.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="lead-responsavel" className="label-premium">Responsável</label>
              <select
                id="lead-responsavel"
                name="responsavel"
                className="select-premium"
                value={form.responsavel}
                onChange={e => handleChange('responsavel', e.target.value)}
              >
                {RESPONSAVEIS.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>

          {/* Row 3: Etapa + Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-etapa" className="label-premium">Etapa do Funil</label>
              <select
                id="lead-etapa"
                name="etapa"
                className="select-premium"
                value={form.etapa}
                onChange={e => handleChange('etapa', e.target.value)}
              >
                {STAGES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="lead-status" className="label-premium">Status</label>
              <select
                id="lead-status"
                name="status"
                className="select-premium"
                value={form.status}
                onChange={e => handleChange('status', e.target.value)}
              >
                {STATUSES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {/* Row 4: Data + Checkboxes */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-data" className="label-premium">Data de Entrada</label>
              <input
                id="lead-data"
                name="dataEntrada"
                type="date"
                className="input-premium"
                value={form.dataEntrada}
                onChange={e => handleChange('dataEntrada', e.target.value)}
              />
            </div>
            <div className="flex flex-col justify-end gap-2">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[rgba(255,255,255,0.7)] min-h-[44px]">
                <input type="checkbox" checked={form.compareceu} onChange={e => handleChange('compareceu', e.target.checked)} className="accent-[#C5A059] w-4 h-4" />
                Compareceu
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[rgba(255,255,255,0.7)] min-h-[44px]">
                <input type="checkbox" checked={form.foiEntrevistado} onChange={e => handleChange('foiEntrevistado', e.target.checked)} className="accent-[#C5A059] w-4 h-4" />
                Entrevistado
              </label>
            </div>
          </div>

          {/* Row 5: Valores */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="lead-vendido" className="label-premium">Valor Vendido (R$)</label>
              <input
                id="lead-vendido"
                name="valorVendido"
                type="number"
                inputMode="numeric"
                className="input-premium"
                value={form.valorVendido || ''}
                onChange={e => handleChange('valorVendido', Number(e.target.value) || 0)}
                placeholder="0…"
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="lead-coletado" className="label-premium">Valor Coletado (R$)</label>
              <input
                id="lead-coletado"
                name="valorColetado"
                type="number"
                inputMode="numeric"
                className="input-premium"
                value={form.valorColetado || ''}
                onChange={e => handleChange('valorColetado', Number(e.target.value) || 0)}
                placeholder="0…"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Row 6: Observações */}
          <div>
            <label htmlFor="lead-obs" className="label-premium">Observações</label>
            <textarea
              id="lead-obs"
              name="observacoes"
              className="input-premium !min-h-[80px] resize-none"
              value={form.observacoes}
              onChange={e => handleChange('observacoes', e.target.value)}
              placeholder="Notas sobre o lead…"
              autoComplete="off"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-[rgba(255,255,255,0.06)]">
          {isEditing ? (
            <div>
              {showDeleteConfirm ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[rgba(255,255,255,0.5)]">Confirmar exclusão?</span>
                  <button onClick={handleDelete} className="btn-danger !min-h-[36px] !text-xs">
                    Excluir
                  </button>
                  <button onClick={() => setShowDeleteConfirm(false)} className="btn-ghost !min-h-[36px] !text-xs">
                    Cancelar
                  </button>
                </div>
              ) : (
                <button onClick={() => setShowDeleteConfirm(true)} className="btn-icon text-[rgba(255,255,255,0.3)] hover:text-red-400" aria-label="Excluir lead">
                  <Trash2 size={18} />
                </button>
              )}
            </div>
          ) : (
            <div />
          )}
          <div className="flex gap-3">
            <button onClick={onClose} className="btn-ghost">Cancelar</button>
            <button onClick={handleSave} className="btn-gold">
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Lead'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
