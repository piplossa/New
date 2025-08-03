import { readDB, writeDB } from '../../lib/db.js'

export default function handler(req, res) {
  const { username } = req.body
  const db = readDB()
  const user = Object.values(db.users).find(u => u.username === username)
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
  res.json({ key: user.key })
}