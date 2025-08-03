import { readDB, writeDB } from '../lib/db.js'

export default function verifyKey(req, res, next) {
  const apiKey = req.headers['x-api-key']
  if (!apiKey) return res.status(401).json({ error: 'Falta la API Key' })

  const db = readDB()
  const user = Object.values(db.users).find(u => u.key === apiKey)
  if (!user) return res.status(403).json({ error: 'API Key inválida' })

  const today = new Date().toISOString().slice(0, 10)
  db.usage[today] = db.usage[today] || {}
  db.usage[today][user.id] = (db.usage[today][user.id] || 0) + 1

  if (db.usage[today][user.id] > 2000) return res.status(429).json({ error: 'Límite diario alcanzado' })

  writeDB(db)
  req.user = user
  next()
}