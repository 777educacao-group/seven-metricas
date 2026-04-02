# PROMPT MASTER AUTÔNOMO — PAINEL COMERCIAL SEVEN
> Versão definitiva. Gerado autonomamente com escolha de tecnologia otimizada.

---

## 📌 CONTEXTO DO NEGÓCIO (absorver completamente antes de qualquer ação)

A **SEVEN** é uma operação comercial de alto ticket que vende um produto de R$ 91.000 bruto / R$ 75.000 líquido.

O processo comercial é estruturado em torno de um evento presencial chamado **"Mesa de Negócios"** — seguido de pitch do clube de negócios, entrevista one-a-one e fechamento.

O **gestor comercial** usa este painel para:
- Saber se a operação está longe ou perto da meta
- Identificar onde o funil está travando
- Monitorar dinheiro potencial parado em follow-up
- Conduzir reuniões de time com visualização em TV
- Substituir completamente uma planilha operacional

**Público do sistema:** gestor + time comercial. Desktop e TV. Foco executivo.

---

## 🔀 FUNIL OFICIAL (imutável)

```
Aquisição
    ↓  [taxa de contato]
Ligação / Qualificação
    ↓  [taxa de qualificação]
Convidados
    ↓  [taxa de presença ⚡ — crítica]
Compareceram
    ↓  [taxa de seleção]
Entrevista
    ↓  [taxa de fechamento 🎯]
Fechamento
    ├── Comprou ✅
    ├── Follow Up 🔄  ←  não é perda. É dinheiro em espera.
    └── Não Comprou ❌
```

### Taxas calculadas automaticamente:
Colocar de alguma forma no painel um icone pequeno de interrogação que ao passar o mouse explica o que é cada taxa.

| Cálculo | Nome |
|---------|------|
| Ligação / Aquisição | Taxa de contato |
| Convidados / Ligação | Taxa de qualificação |
| Compareceram / Convidados | **Taxa de presença** |
| Entrevista / Compareceram | Taxa de seleção |
| Comprou / Entrevista | **Taxa de fechamento** |
| (Comprou + FU) / Entrevista | Taxa de interesse total |

O sistema identifica automaticamente o **gargalo** (menor taxa entre etapas consecutivas) e destaca com sinalização visual crítica.

### Follow Up — regra de negócio especial:
- Lead com objeção oculta, respondeu "vou ver", está em acompanhamento ativo
- Valor financeiro: usar valor informado ou R$ 75.000 como default
- KPI estratégico: **Potencial em Follow Up = Σ valores dos leads em FU**
- Deve ser destacado visualmente como dinheiro que pode ser recuperado

---

## 🛠️ STACK TECNOLÓGICA (decisão autônoma)

### Por quê Vite + React?
- Componentes reutilizáveis = melhor manutenção do funil e cards
- State management limpo para dados complexos
- Dev experience superior, HMR instantâneo
- Build estático final = funciona localmente sem servidor
- Ecosystem rico para charts e animações

### Por quê Apache ECharts?
- Melhor biblioteca de funil visual disponível (FunnelChart nativo)
- Alta performance com Canvas
- Tooltips ricos, animações out-of-the-box
- Suporte a dark theme nativo
- Recharts tem funil limitado; ECharts é a escolha superior para este caso

### Por quê Tailwind CSS v4?
- Utility-first = consistência de spacing e cores via tokens
- Dark mode trivial com `dark:` prefix
- Sem overhead de CSS não utilizado em produção
- Integração nativa com Vite

### Por quê Zustand + persist middleware?
- Estado global simples sem boilerplate de Redux
- `persist` middleware = localStorage transparente e automático
- Reidratação automática ao abrir o app
- Perfeito para CRUD de leads + configurações de meta

### Stack final:
```
Vite 6 + React 19
Tailwind CSS v4
Apache ECharts (react-echarts)
Zustand + zustand/middleware (persist)
date-fns (manipulação de datas)
Lucide React (ícones consistentes, SVG)
```

---

## 🧠 ORQUESTRAÇÃO DAS SKILLS (ordem obrigatória)

### SKILL 1 — ui-ux-pro-max → DESIGN SYSTEM (executar PRIMEIRO)

**Por que primeiro:** Esta skill analisa o tipo de produto, o contexto B2B executivo e o público antes de qualquer decisão visual. Ela retorna paleta, tipografia, estilo e padrões UX validados para um dashboard de alta performance.

Execute na ordem:
```bash
# Design system completo com persistência
python skills/ui-ux-pro-max/scripts/search.py "executive B2B commercial operations sales dashboard premium dark high-ticket" --design-system --persist -p "SEVEN Painel Comercial"

# Padrão de produto: dashboard executivo
python skills/ui-ux-pro-max/scripts/search.py "executive dashboard KPI commercial admin panel metrics" --domain product

# Estilo visual: dark premium executivo
python skills/ui-ux-pro-max/scripts/search.py "dark mode premium executive strong bold high contrast" --domain style

# Paleta de cores: operação comercial de alto ticket
python skills/ui-ux-pro-max/scripts/search.py "sales high-ticket commercial premium dark golden amber warm" --domain color

# Tipografia: números grandes, hierarquia executiva
python skills/ui-ux-pro-max/scripts/search.py "executive dashboard bold strong tabular numbers data display" --domain typography

# Tipo de gráfico: funil de vendas com conversão
python skills/ui-ux-pro-max/scripts/search.py "funnel sales pipeline conversion stage visualization" --domain chart

# UX: modo TV, legibilidade à distância, kiosk
python skills/ui-ux-pro-max/scripts/search.py "dashboard TV display large screen kiosk readability distance" --domain ux
```

Salvar resultado em `design-system/MASTER.md` com `--persist`.
Criar override específico para o dashboard:
```bash
python skills/ui-ux-pro-max/scripts/search.py "sales funnel conversion KPI metrics cards" --design-system --persist -p "SEVEN Painel Comercial" --page "dashboard"
```

---

### SKILL 2 — frontend-design → IMPLEMENTAÇÃO (usar ao codificar)

**Por que aqui:** Guia cada decisão de código para evitar estética genérica. Garante que a tipografia, layout, micro-animações e hierarquia visual sejam intencionais e premiums.

Princípios a aplicar durante o código:
- Direção estética única e clara: **dark executive — forte, elegante, quase brutal nos números**
- Fonte display para títulos/labels ≠ fonte tabular para números — pares distintos
- Cards entram com stagger animation (0ms, 80ms, 160ms...)
- Funil anima preenchimento progressivo ao carregar
- Barra de meta com animação de progresso
- Backgrounds com gradient atmosférico, não cor plana
- Glow discreto nos elementos de destaque (KPIs críticos, gargalo do funil)
- Hierarquia: **o número fala antes do label** — tamanho 3x maior

---

### SKILL 3 — web-design-guidelines → AUDITORIA FINAL (após entregar código)

**Por que no fim:** Audita o código entregue contra as Web Interface Guidelines da Vercel. Captura problemas de contraste, acessibilidade, targets de toque e responsividade que passaram despercebidos.

```
Fetch: https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
Arquivos a revisar: src/App.tsx, src/components/*.tsx, src/index.css
Formato de output: file:line findings
```

---

## 🏗️ ARQUITETURA DE COMPONENTES

```
src/
├── App.tsx                    ← roteamento de modos (View / Edit)
├── main.tsx
├── index.css                  ← design tokens, global styles
│
├── store/
│   └── useSevenStore.ts       ← Zustand: leads, meta, config
│
├── types/
│   └── index.ts               ← Lead, FunnelStep, Config, Period
│
├── utils/
│   ├── calculations.ts        ← taxas, totais, gargalo, projeção
│   ├── formatters.ts          ← BRL, %, datas
│   └── mockData.ts            ← 15+ leads realistas
│
└── components/
    ├── layout/
    │   ├── Header.tsx          ← logo, modo, período, ações
    │   └── ModeToggle.tsx      ← TV vs Edit toggle
    │
    ├── dashboard/
    │   ├── MetaBar.tsx         ← barra de meta animada + semáforo
    │   ├── KPIGrid.tsx         ← grid de cards KPI
    │   ├── KPICard.tsx         ← card individual com semáforo + glow
    │   ├── FunnelChart.tsx     ← ECharts FunnelChart com gargalo
    │   ├── ExecutiveSummary.tsx ← frases automáticas JS
    │   └── ReversePlanning.tsx ← planejamento reverso da meta
    │
    ├── table/
    │   ├── LeadsTable.tsx      ← tabela de registros com filtros
    │   └── LeadRow.tsx         ← linha individual com ações
    │
    └── modal/
        ├── LeadModal.tsx       ← modal cadastro/edição
        └── MetaModal.tsx       ← modal edição de meta e taxas
```

---

## 🖥️ LAYOUT DA TELA (wireframe conceitual)

```
┌─────────────────────────────────────────────────────────────┐
│  [LOGO SEVEN]   PAINEL COMERCIAL SEVEN   [TV] [EDIT] [EXP]  │
│                                     [período ▼]             │
├─────────────────────────────────────────────────────────────┤
│  ████████████████████████████░░░░░░  63% da meta anual      │
│  R$ 567.000 realizado de R$ 900.000  |  Meta mensal: R$75k  │
├──────────┬──────────┬──────────┬──────────┬─────────────────┤
│  VENDIDO │COLETADO  │PRESENÇA  │FECHAMENTO│  FU POTENCIAL   │
│ R$567k   │ R$420k  │   72%    │   40%    │   R$375k (5)    │
│  [verde] │ [verde]  │ [amarelo]│ [vermelho│   [âmbar]       │
├──────────┴──────────┴──────────┴──────────┴─────────────────┤
│                                                             │
│                  🔻 FUNIL DE VENDAS                         │
│  ┌──────────────────────────────────┐                       │
│  │▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ AQUISIÇÃO    100  → Ligação: 80%  │
│  │  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  │ LIGAÇÃO       80  → Convidados:81%│
│  │    ▓▓▓▓▓▓▓▓▓▓▓▓    │ CONVIDADOS    65  → Presença: 69%⚠│
│  │      ▓▓▓▓▓▓▓▓      │ COMPARECERAM  45  → Entrevista:67%│
│  │        ▓▓▓▓        │ ENTREVISTA    30  → GARGALO 🔴     │
│  │   [✅4][🔄6][❌3]   │ FECHAMENTO  12C / 10FU / 8NC      │
│  └──────────────────────────────────┘                       │
│                                                             │
│  💬 RESUMO EXECUTIVO                                        │
│  "Estamos em 63% da meta anual."                            │
│  "O maior gargalo está entre Entrevista e Fechamento (40%)" │
│  "R$ 375.000 em potencial parado em 5 leads de follow-up."  │
├─────────────────────────────────────────────────────────────┤
│  PLANEJAMENTO REVERSO  |  Meta: X vendas → N entrevistas... │
├─────────────────────────────────────────────────────────────┤
│  REGISTROS DE LEADS [tabela com filtros + ações]            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🔧 MODELO DE DADOS

```typescript
interface Lead {
  id: string
  nome: string
  origem: 'SDR' | 'Instagram' | 'Indicacao' | 'Contato Direto'
  responsavel: string
  dataEntrada: string         // ISO 8601
  etapa: FunnelStage
  status: LeadStatus
  compareceu: boolean
  foiEntrevistado: boolean
  comprou: boolean
  valorVendido: number        // 0 se não comprou
  valorColetado: number       // quanto entrou no caixa
  observacoes: string
}

type FunnelStage =
  | 'aquisicao'
  | 'ligacao'
  | 'convidados'
  | 'compareceram'
  | 'entrevista'
  | 'fechamento'

type LeadStatus =
  | 'ativo'
  | 'comprou'
  | 'nao_comprou'
  | 'follow_up'
  | 'no_show'
  | 'reagendado'

interface Config {
  metaAnual: number           // ex: 6.000.000
  taxaPresencaEsperada: number  // ex: 0.70
  taxaEntrevistaEsperada: number
  taxaFechamentoEsperada: number
  precoLiquido: number        // default: 75000
  precoBruto: number          // default: 91000
}

interface Period {
  tipo: 'mes' | 'trimestre' | 'ano' | 'geral' | 'custom'
  inicio?: string
  fim?: string
}
```

---

## 📊 LÓGICA DE CÁLCULO (utils/calculations.ts)

```typescript
// Contagens por etapa (respeitando filtro de período)
const counts = {
  aquisicao: leads.filter(l => l.etapa === 'aquisicao').length,
  ligacao: leads.filter(l => l.etapa === 'ligacao').length,
  convidados: leads.filter(l => l.etapa === 'convidados').length,
  compareceram: leads.filter(l => l.compareceu).length,
  entrevista: leads.filter(l => l.foiEntrevistado).length,
  comprou: leads.filter(l => l.comprou).length,
  followUp: leads.filter(l => l.status === 'follow_up').length,
  naoComprou: leads.filter(l => l.status === 'nao_comprou').length,
}

// Taxas de conversão entre etapas
const rates = {
  contato: counts.ligacao / counts.aquisicao,
  qualificacao: counts.convidados / counts.ligacao,
  presenca: counts.compareceram / counts.convidados,   // crítica
  selecao: counts.entrevista / counts.compareceram,
  fechamento: counts.comprou / counts.entrevista,      // KPI principal
  interesse: (counts.comprou + counts.followUp) / counts.entrevista,
}

// Gargalo = etapa com menor taxa de conversão
const gargalo = Object.entries(rates).sort(([,a],[,b]) => a - b)[0]

// Potencial em follow-up
const potencialFU = leads
  .filter(l => l.status === 'follow_up')
  .reduce((sum, l) => sum + (l.valorVendido || config.precoLiquido), 0)

// Valor vendido total (soma dos que compraram)
const totalVendido = leads
  .filter(l => l.comprou)
  .reduce((sum, l) => sum + l.valorVendido, 0)

// Projeção simples: (totalVendido / diasPercorridos) * diasNoAno
const projecao = (totalVendido / diasPercorridos) * 365

// Meta mensal/trimestral
const metaMensal = config.metaAnual / 12
const metaTrimestral = config.metaAnual / 4

// Planejamento reverso
const reverso = {
  entrevistasNecessarias: Math.ceil(metaVendas / config.taxaFechamentoEsperada),
  presencasNecessarias: Math.ceil(entrevistas / config.taxaEntrevistaEsperada),
  convidadosNecessarios: Math.ceil(presencas / config.taxaPresencaEsperada),
}
```

---

## 📺 MODO VISUALIZAÇÃO (TV)

No modo TV, **esconder:**
- Tabela de leads
- Botões de edição, cadastro, exclusão
- Formulários e modais
- Planejamento reverso (tabela de inputs)

**Ampliar:**
- Cards KPI: fonte 1.4x
- Funil: altura 1.5x
- Meta bar: altura 2x
- Resumo executivo: fonte 1.2x
- Barra do header: simplificada, logo centralizada

**Comportamento:**
- Botão Fullscreen disponível em modo TV
- Transição suave ao alternar modos (fade 300ms)

---

## 🎨 DIRETRIZES VISUAIS (a skill ui-ux-pro-max define os tokens finais)

| Elemento | Diretriz |
|----------|----------|
| Background | Profundo escuro com gradiente sutil (#08090f → #0f1118) |
| Cor de destaque | Âmbar/dourado quente — não laranja barato, não amarelo |
| Cards | bg ligeiramente elevado, border opacity 15%, glow no hover |
| Gargalo do funil | Ring vermelho pulsante, badge "GARGALO" |
| Semáforo | Verde ≥70% | Âmbar 50-70% | Vermelho <50% |
| Números KPI | Fonte tabular, 2.5rem–4rem, font-weight 700–800 |
| Labels | Uppercase, letter-spacing largo, font 0.7rem, opacity 60% |
| Glow follow-up | Âmbar/ouro — chama atenção sem alarmar |
| Animações | Stagger 80ms por card, ease-out, duração 300ms |
| Funil ECharts | Animação de colapso progressivo das etapas, 600ms total |

---

## 📦 DADOS MOCKADOS (mockData.ts — 15 leads realistas)

Distribuição:
- 3 leads em Aquisição (origem: SDR, Instagram)
- 3 leads em Ligação / Qualificação
- 2 leads em Convidados
- 2 leads em Compareceram (1 no-show)
- 2 leads em Entrevista
- 3 em Fechamento: 1 Comprou (R$91k vendido, R$45k coletado), 2 Follow Up, 1 Não Comprou

Responsáveis: "Ana Costa", "Carlos M.", "SDR 01", "Dennis N."
Origens variadas: SDR, Instagram, Indicação, Contato Direto

---

## ✅ CHECKLIST DE ENTREGA

### Funcional
- [ ] CRUD completo de leads (criar, editar, excluir)
- [ ] Persistência Zustand + localStorage
- [ ] Filtro de período funcional (mês/trimestre/ano/geral/custom)
- [ ] Cálculo automático de todas as taxas
- [ ] Identificação automática do gargalo
- [ ] Meta anual editável com cálculo automático de mensal/trimestral
- [ ] Potencial financeiro de follow-up calculado
- [ ] Projeção simples baseada no ritmo atual
- [ ] Planejamento reverso com taxas configuráveis

### Visual
- [ ] Funil ECharts com formato visual de funil real
- [ ] Semáforo em todos os KPI cards
- [ ] Gargalo destacado com sinalização visual
- [ ] Barra de meta animada
- [ ] Resumo executivo com frases automáticas geradas por JS
- [ ] Stagger animation nos cards ao carregar
- [ ] Modo TV e Modo Edição com transição suave

### Qualidade
- [ ] Design system gerado pela skill ui-ux-pro-max aplicado
- [ ] Auditoria web-design-guidelines executada
- [ ] Responsivo (otimizado desktop + TV, funcional mobile)
- [ ] Sem emojis como ícones (usar Lucide React)
- [ ] Contraste mínimo 4.5:1 em todo texto
- [ ] Dados mock demonstram funcionamento completo do sistema

---

## 🚀 COMANDOS PARA INICIAR O PROJETO

```bash
# Criar projeto Vite + React + TypeScript
npx -y create-vite@latest ./ --template react-ts

# Instalar dependências
npm install

# Instalar stack
npm install echarts echarts-for-react
npm install zustand
npm install tailwindcss @tailwindcss/vite
npm install lucide-react
npm install date-fns

# Rodar dev
npm run dev
```

---

## 🏁 INSTRUÇÃO FINAL PARA O AGENTE

1. **ANTES DE QUALQUER CÓDIGO:** Executar todos os comandos da skill `ui-ux-pro-max` e salvar o design system em `design-system/MASTER.md`. Ler o arquivo antes de escrever uma linha de CSS.

2. **AO IMPLEMENTAR:** Seguir os princípios da skill `frontend-design` — especialmente tipografia distintiva, atmosfera visual (não fundo sólido), e hierarquia onde o número lidera.

3. **O FUNIL É O CORAÇÃO DO SISTEMA.** O componente `FunnelChart.tsx` deve ser o mais elaborado visualmente. Usar ECharts com série do tipo `'funnel'`, itemStyle customizado por performance, e marcação especial no gargalo.

4. **O DINHEIRO EM FOLLOW-UP É ESTRATÉGICO.** O card de potencial em FU deve ter glow âmbar, número grande e label chamativa — é o "dinheiro que pode ser salvo".

5. **APÓS ENTREGAR:** Executar a skill `web-design-guidelines` e corrigir todos os findings antes da entrega final.
