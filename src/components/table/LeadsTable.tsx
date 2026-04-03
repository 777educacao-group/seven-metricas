import { useState } from 'react'
import { useSevenStore, useFilteredLeads } from '../../store/useSevenStore'
import { formatBRLCompact, formatDate } from '../../utils/formatters'
import { User, Plus, Edit2, ChevronLeft, ChevronRight } from 'lucide-react'
import { LeadModal } from '../modal/LeadModal'
import type { Lead } from '../../types'

const ITEMS_PER_PAGE = 7

export function LeadsTable() {
  const { isTvMode } = useSevenStore()
  const leads = useFilteredLeads()
  
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(leads.length / ITEMS_PER_PAGE))
  
  const currentLeads = leads.slice(
    (currentPage - 1) * ITEMS_PER_PAGE, 
    currentPage * ITEMS_PER_PAGE
  )

  function openNewLead() {
    setSelectedLead(null)
    setIsModalOpen(true)
  }

  function openEditLead(lead: Lead) {
    if (isTvMode) return
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
    <div className="bento-card flex flex-col">
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

      {/* Tabela com scroll horizontal e visual melhorado */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-[rgba(255,255,255,0.06)]">
              <th className="px-4 py-3 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest w-1/4">Nome</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest">Etapa Atual</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest">Status</th>
              <th className="px-4 py-3 text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest text-right">Potencial</th>
              {!isTvMode && <th className="px-4 py-3 w-12 text-center text-[10px] font-semibold text-[rgba(255,255,255,0.4)] uppercase tracking-widest">Ações</th>}
            </tr>
          </thead>
          <tbody>
            {currentLeads.length === 0 ? (
              <tr>
                <td colSpan={isTvMode ? 4 : 5} className="py-8 text-center text-[rgba(255,255,255,0.3)] text-sm">
                  Nenhum lead encontrado neste período.
                </td>
              </tr>
            ) : (
              currentLeads.map((l) => (
                <tr 
                  key={l.id} 
                  onClick={() => openEditLead(l)}
                  className={`border-b border-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.02)] transition-colors group ${!isTvMode ? 'cursor-pointer' : ''}`}
                >
                  <td className="px-4 py-4">
                    <div className="font-semibold text-sm text-[rgba(255,255,255,0.95)] group-hover:text-white transition-colors">
                      {l.nome}
                    </div>
                    <div className="text-[10px] text-[rgba(255,255,255,0.4)] mt-1">
                      {formatDate(l.dataEntrada)} • SDR: {l.responsavel}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-xs text-[rgba(255,255,255,0.65)]">
                      {stageLabels[l.etapa]}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-[10px] px-2 py-1 rounded-md border font-medium ${statusColors[l.status]}`}>
                      {statusLabels[l.status]}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <span className="metric-value font-medium text-[rgba(255,255,255,0.8)]">
                      {l.comprou 
                        ? formatBRLCompact(l.valorVendido) 
                        : (l.status === 'follow_up' ? formatBRLCompact(l.valorVendido > 0 ? l.valorVendido : 75000) : '-')}
                    </span>
                  </td>
                  {!isTvMode && (
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center text-[rgba(255,255,255,0.2)] group-hover:text-[#C5A059] transition-colors">
                        <Edit2 size={16} />
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Paginação */}
      <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.04)] flex items-center justify-between">
        <div className="text-xs text-[rgba(255,255,255,0.4)]">
          Mostrando {(currentPage - 1) * ITEMS_PER_PAGE + 1} a {Math.min(currentPage * ITEMS_PER_PAGE, leads.length)} de {leads.length}
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="btn-icon !w-8 !h-8 disabled:opacity-30 disabled:cursor-not-allowed border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
            aria-label="Página Anterior"
          >
            <ChevronLeft size={16} />
          </button>
          
          <span className="text-xs font-medium text-[rgba(255,255,255,0.6)] px-2 metric-value">
            {currentPage} / {totalPages}
          </span>
          
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="btn-icon !w-8 !h-8 disabled:opacity-30 disabled:cursor-not-allowed border border-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.02)]"
            aria-label="Próxima Página"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      
      <LeadModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        lead={selectedLead} 
      />
    </div>
  )
}
