import express from 'express'
import register from './api/auth/register.js'
import login from './api/auth/login.js'
import endpoint1 from './api/endpoint1.js'
import endpoint2 from './api/endpoint2.js'
import dashboard from './api/dashboard.js'

const app = express()
app.use(express.json())

app.post('/api/auth/register', register)
app.post('/api/auth/login', login)
app.get('/api/endpoint1', endpoint1)
app.get('/api/endpoint2', endpoint2)
app.get('/api/dashboard', dashboard)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
