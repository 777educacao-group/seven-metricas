import { useState } from 'react'
import { useSevenStore } from '../../store/useSevenStore'
import { formatBRLCompact, formatDate } from '../../utils/formatters'
import { User, Plus, Edit2 } from 'lucide-react'
import { LeadModal } from '../modal/LeadModal'
import type { Lead } from '../../types'

export function LeadsTable() {
  const { leads, isTvMode } = useSevenStore()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)

  function openNewLead() {
    setSelectedLead(null)
    setIsModalOpen(true)
  }

  function openEditLead(lead: Lead) {
    setSelectedLead(lead)
    setIsModalOpen(true)
  }
  
  // Status Badge Helper
  const statusColors: Record<string, string> = {
    ativo: 'bg-[rgba(255,255,255,0.05)] text-white border-[rgba(255,255,255,0.1)]',
    reagendado: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    no_show: 'bg-red-500/10 text-red-400 border-red-500/20',
    comprou: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    nao_comprou: 'bg-[rgba(255,255,255,0.02)] text-[rgba(255,255,255,0.3)] border-[rgba(255,255,255,0.05)]',
    follow_up: 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20',
  }
  
  const statusLabels: Record<string, string> = {
    ativo: 'Ativo', reagendado: 'Reagendado', no_show: 'No Show',
    comprou: 'Ganho', nao_comprou: 'Perdido', follow_up: 'Follow Up'
  }

  const stageLabels: Record<string, string> = {
    aquisicao: 'Aquisição', ligacao: 'Ligação', convidados: 'Convidado',
    compareceram: 'Compareceu', entrevista: 'Entrevista', fechamento: 'Fechamento'
  }

  return (
    <div className="bento-card">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.05)] rounded-lg text-white">
            <User size={20} aria-hidden="true" />
          </div>
          <div>
            <h2 className="heading-playfair text-lg text-white">Pipeline de Leads</h2>
            <p className="text-xs text-[rgba(255,255,255,0.4)] mt-1">{leads.length} leads totais no pipeline</p>
          </div>
        </div>
        
        {!isTvMode && (
          <button onClick={openNewLead} className="btn-gold !h-9 !py-0 !text-xs">
            <Plus size={14} className="mr-1" /> Novo Lead
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-xl border border-[rgba(255,255,255,0.05)]">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-[rgba(255,255,255,0.02)] border-b border-[rgba(255,255,255,0.05)]">
              <th className="p-4 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest w-1/4">Nome</th>
              <th className="p-4 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest">Etapa Atual</th>
              <th className="p-4 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest">Status</th>
              <th className="p-4 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest text-right">Potencial</th>
              {!isTvMode && <th className="p-4 w-12"></th>}
            </tr>
          </thead>
          <tbody>
            {leads.slice(0, 10).map((l) => (
              <tr key={l.id} className="border-b border-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                <td className="p-4">
                  <div className="font-semibold text-sm text-white">{l.nome}</div>
                  <div className="text-[10px] text-[rgba(255,255,255,0.4)] mt-1">{formatDate(l.dataEntrada)} • SDR: {l.responsavel}</div>
                </td>
                <td className="p-4">
                  <span className="text-xs text-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.05)] px-2 py-1 rounded">
                    {stageLabels[l.etapa]}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`text-[10px] px-2 py-1 rounded-md border font-medium ${statusColors[l.status]}`}>
                    {statusLabels[l.status]}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className="metric-value font-medium text-[rgba(255,255,255,0.8)]">
                    {l.comprou ? formatBRLCompact(l.valorVendido) : (l.status === 'follow_up' ? '-' /* UI handles this differently if needed */ : '-')}
                  </span>
                </td>
                {!isTvMode && (
                  <td className="p-4 text-center">
                    <button 
                      onClick={() => openEditLead(l)}
                      className="text-[rgba(255,255,255,0.3)] hover:text-[#C5A059] transition-colors p-1"
                      aria-label="Editar"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length > 10 && (
          <div className="p-3 text-center border-t border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.01)]">
            <span className="text-xs text-[rgba(255,255,255,0.4)] uppercase tracking-widest">Mostrando 10 recentes de {leads.length}</span>
          </div>
        )}
      </div>
      
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lead={selectedLead} 
      />
    </div>
  )
}
