import { useState, useEffect } from 'react'
import { useSevenStore } from '../../store/useSevenStore'
import { formatBRLCompact } from '../../utils/formatters'
import { X, Settings } from 'lucide-react'

interface MetaModalProps {
  isOpen: boolean
  onClose: () => void
}

export function MetaModal({ isOpen, onClose }: MetaModalProps) {
  const { config, updateConfig } = useSevenStore()

  const [form, setForm] = useState(config)

  useEffect(() => {
    setForm(config)
  }, [config, isOpen])

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

  function handleSave() {
    updateConfig(form)
    onClose()
  }

  const metaMensal = form.metaAnual / 12
  const metaTrimestral = form.metaAnual / 4

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Configurar Meta">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[rgba(255,255,255,0.06)]">
          <div className="flex items-center gap-3">
            <Settings size={20} className="text-[#C5A059]" />
            <h2 className="heading-playfair text-xl text-white">Configuração de Meta</h2>
          </div>
          <button onClick={onClose} className="btn-icon" aria-label="Fechar modal">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Meta Anual */}
          <div>
            <label htmlFor="meta-anual" className="label-premium">Meta Anual (R$)</label>
            <input
              id="meta-anual"
              name="metaAnual"
              type="number"
              inputMode="numeric"
              className="input-premium text-2xl metric-value"
              value={form.metaAnual}
              onChange={e => setForm(p => ({ ...p, metaAnual: Number(e.target.value) || 0 }))}
              autoComplete="off"
            />
            <div className="mt-2 flex gap-4 text-xs text-[rgba(255,255,255,0.4)]">
              <span>Mensal: <strong className="text-[rgba(255,255,255,0.7)] metric-value">{formatBRLCompact(metaMensal)}</strong></span>
              <span>Trimestral: <strong className="text-[rgba(255,255,255,0.7)] metric-value">{formatBRLCompact(metaTrimestral)}</strong></span>
            </div>
          </div>

          {/* Preços */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="meta-bruto" className="label-premium">Preço Bruto (R$)</label>
              <input
                id="meta-bruto"
                name="precoBruto"
                type="number"
                inputMode="numeric"
                className="input-premium"
                value={form.precoBruto}
                onChange={e => setForm(p => ({ ...p, precoBruto: Number(e.target.value) || 0 }))}
                autoComplete="off"
              />
            </div>
            <div>
              <label htmlFor="meta-liquido" className="label-premium">Preço Líquido (R$)</label>
              <input
                id="meta-liquido"
                name="precoLiquido"
                type="number"
                inputMode="numeric"
                className="input-premium"
                value={form.precoLiquido}
                onChange={e => setForm(p => ({ ...p, precoLiquido: Number(e.target.value) || 0 }))}
                autoComplete="off"
              />
            </div>
          </div>

          {/* Taxas Esperadas */}
          <div>
            <h3 className="text-xs uppercase tracking-widest text-[rgba(255,255,255,0.4)] mb-4 font-semibold">Taxas Esperadas de Conversão</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'taxa-contato', label: 'Taxa de Contato', key: 'taxaContatoEsperada' as const },
                { id: 'taxa-qualif', label: 'Taxa de Qualificação', key: 'taxaQualificacaoEsperada' as const },
                { id: 'taxa-presenca', label: 'Taxa de Presença', key: 'taxaPresencaEsperada' as const },
                { id: 'taxa-entrevista', label: 'Taxa de Seleção', key: 'taxaEntrevistaEsperada' as const },
                { id: 'taxa-fechamento', label: 'Taxa de Fechamento', key: 'taxaFechamentoEsperada' as const },
              ].map(t => (
                <div key={t.key}>
                  <label htmlFor={t.id} className="label-premium">{t.label} (%)</label>
                  <input
                    id={t.id}
                    name={t.key}
                    type="number"
                    inputMode="decimal"
                    className="input-premium"
                    value={Math.round(form[t.key] * 100)}
                    onChange={e => setForm(p => ({ ...p, [t.key]: (Number(e.target.value) || 0) / 100 }))}
                    min={0}
                    max={100}
                    autoComplete="off"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[rgba(255,255,255,0.06)]">
          <button onClick={onClose} className="btn-ghost">Cancelar</button>
          <button onClick={handleSave} className="btn-gold">Salvar Configuração</button>
        </div>
      </div>
    </div>
  )
}
