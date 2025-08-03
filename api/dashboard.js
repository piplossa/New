import { readDB } from '../lib/db.js'

// Generates a simple HTML dashboard showing users and their request counts for today
export default function handler(req, res) {
  const db = readDB()
  const today = new Date().toISOString().slice(0, 10)
  // Build rows for each registered user
  const rows = Object.values(db.users).map(user => {
    const count = (db.usage[today] && db.usage[today][user.id]) || 0
    return `<tr><td>${user.username}</td><td>${count}</td></tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>API Usage Dashboard</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    table { border-collapse: collapse; width: 50%; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #f2f2f2; }
  </style>
</head>
<body>
  <h1>API Usage Dashboard</h1>
  <table>
    <thead>
      <tr><th>User</th><th>Requests Today</th></tr>
    </thead>
    <tbody>
      ${rows}
    </tbody>
  </table>
</body>
</html>`
  res.setHeader('Content-Type', 'text/html')
  res.send(html)
}
