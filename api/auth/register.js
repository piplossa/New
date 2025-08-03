import { readDB, writeDB } from '../../lib/db.js'
import crypto from 'crypto'

export default function handler(req, res) {
  const { username } = req.body
  const db = readDB()
  const id = crypto.randomUUID()
  const key = crypto.randomBytes(16).toString('hex')
  db.users[id] = { id, username, key }
  writeDB(db)
  res.json({ success: true, key })
}