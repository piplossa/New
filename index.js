import express from 'express'
import register from './api/auth/register.js'
import login from './api/auth/login.js'
import endpoint1 from './api/endpoint1.js'
import endpoint2 from './api/endpoint2.js'
import path from 'path'
import { readDB } from './lib/db.js'

const app = express()
app.use(express.json())

app.post('/api/auth/register', register)
app.post('/api/auth/login', login)
app.get('/api/endpoint1', endpoint1)
app.get('/api/endpoint2', endpoint2)

// Serve static assets from the public directory
app.use(express.static('public'))

// Route to serve the professional dashboard HTML
app.get('/dashboard', (req, res) => {
  // Send the pre‑built dashboard HTML from the project root.  Keeping
  // this simple avoids the need for nested paths when uploading the file
  res.sendFile('wapi.html', { root: process.cwd() })
})

// JSON endpoint exposing API usage by user for the front‑end
app.get('/api/usage', (req, res) => {
  const db = readDB()
  const today = new Date().toISOString().slice(0, 10)
  const usageToday = db.usage[today] || {}
  const users = Object.values(db.users).map(user => ({
    username: user.username,
    id: user.id,
    count: usageToday[user.id] || 0
  }))
  res.json(users)
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
