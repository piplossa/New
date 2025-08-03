import { readDB } from '../../lib/db.js'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { username, password } = req.body
  const db = readDB()
  const user = Object.values(db.users).find(u => u.username === username)
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
  const ok = await bcrypt.compare(password, user.password)
  if (!ok) return res.status(401).json({ error: 'Contraseña incorrecta' })
  res.json({ key: user.key })
}