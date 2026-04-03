export const formatBRL = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0
  }).format(value)
}

export const formatBRLCompact = (value: number) => {
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(1)}k`
  return formatBRL(value)
}

export const formatPercent = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    maximumFractionDigits: 1
  }).format(value)
}

export const formatDate = (dateString: string) => {
  if (!dateString) return '-'
  try {
    const [y, m, d] = dateString.split('-')
    return `${d}/${m}/${y.substring(2)}`
  } catch (e) {
    return dateString
  }
}
