import { readDB } from '../lib/db.js'

// Generates a styled HTML dashboard showing users and their request counts and progress towards the daily limit
export default function handler(req, res) {
  const db = readDB()
  const today = new Date().toISOString().slice(0, 10)
  // Build rows for each registered user with a progress bar relative to the 100 requests/day limit
  const rows = Object.values(db.users).map(user => {
    const count = (db.usage[today] && db.usage[today][user.id]) || 0
    const percentage = Math.min(100, Math.round((count / 100) * 100))
    return `<tr>
      <td>${user.username}</td>
      <td>${count}</td>
      <td>
        <div class="progress" role="progressbar" aria-valuemin="0" aria-valuemax="100">
          <div class="progress-bar" style="width: ${percentage}%">${percentage}%</div>
        </div>
      </td>
    </tr>`
  }).join('')

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>API Usage Dashboard</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css">
  <style>
    body { padding: 20px; }
    .progress { height: 20px; }
    .progress-bar { background-color: #4caf50; }
  </style>
</head>
<body>
  <h1 class="mb-4">API Usage Dashboard</h1>
  <table class="table table-striped">
    <thead>
      <tr><th>User</th><th>Requests Today</th><th>Usage Progress</th></tr>
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
