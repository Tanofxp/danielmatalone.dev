const BASE = '/api'

export async function fetchPortfolio() {
  const res = await fetch(`${BASE}/portfolio`)
  if (!res.ok) throw new Error('API error')
  return res.json()
}
