import { useSevenStore } from './store/useSevenStore'
import { Header } from './components/layout/Header'
import { MetaBar } from './components/dashboard/MetaBar'
import { KPIGrid } from './components/dashboard/KPIGrid'
import { FunnelChart } from './components/dashboard/FunnelChart'
import { ExecutiveSummary } from './components/dashboard/ExecutiveSummary'
import ReversePlanning from './components/dashboard/ReversePlanning'
import { LeadsTable } from './components/table/LeadsTable'

function App() {
  const { isTvMode } = useSevenStore()

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="flex flex-col space-y-6">
          {/* Row 1: Meta Anual */}
          <section>
            <MetaBar />
          </section>

          {/* Row 2: KPIs Principais (Bento grid style) */}
          <section>
            <KPIGrid />
          </section>

          {/* Row 3: Funil e Planejamento */}
          <section className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <div className={`flex flex-col gap-6 ${isTvMode ? 'lg:col-span-5' : 'lg:col-span-3'}`}>
              <ExecutiveSummary />
              <div className="flex-1">
                <FunnelChart />
              </div>
            </div>
            {!isTvMode && (
              <div className="lg:col-span-2 flex flex-col">
                <ReversePlanning />
              </div>
            )}
          </section>

          {/* Row 4: Tabela de Leads (oculta no modo TV) */}
          {!isTvMode && (
            <section className="mt-8">
              <LeadsTable />
            </section>
          )}
        </div>
      </main>
    </div>
  )
}

export default App
