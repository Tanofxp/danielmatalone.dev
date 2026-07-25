import { portfolioData } from '../server/data.js'

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Content-Type', 'application/json')

  const url = req.url || ''

  if (url.startsWith('/api/projects/')) {
    const category = url.split('/api/projects/')[1]
    const list = category === 'all'
      ? portfolioData.projects
      : portfolioData.projects.filter(p => p.category === category)
    return res.status(200).json(list)
  }

  if (url === '/api/projects') {
    return res.status(200).json(portfolioData.projects)
  }

  if (url === '/api/skills') {
    return res.status(200).json(portfolioData.skills)
  }

  // /api/portfolio — ruta principal
  return res.status(200).json(portfolioData)
}
