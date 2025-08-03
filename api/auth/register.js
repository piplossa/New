import { readDB, writeDB } from '../../lib/db.js'
import crypto from 'crypto'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ error: 'Faltan datos' })
  const db = readDB()
  const id = crypto.randomUUID()
  const key = `Adonixv2-${Math.floor(10000 + Math.random() * 90000)}`
  const hashed = await bcrypt.hash(password, 10)
  db.users[id] = { id, username, password: hashed, key }
  writeDB(db)
  res.json({ success: true, key })
}