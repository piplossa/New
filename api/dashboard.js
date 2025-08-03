import verifyKey from '../utils/verifyKey.js'
import { readDB } from '../lib/db.js'

export default function handler(req, res) {
  verifyKey(req, res, () => {
    const db = readDB()
    const today = new Date().toISOString().slice(0, 10)
    const todayCount = db.usage[today]?.[req.user.id] || 0
    const total = Object.values(db.usage).reduce((sum, day) => sum + (day[req.user.id] || 0), 0)
    res.json({ requestsToday: todayCount, requestsTotal: total })
  })
}
