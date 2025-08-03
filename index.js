import express from 'express'
import endpoint1 from './api/endpoint1.js'
import endpoint2 from './api/endpoint2.js'

const app = express()
app.use(express.json())
app.use(express.static('public'))

app.get('/api/endpoint1', endpoint1)
app.get('/api/endpoint2', endpoint2)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Servidor escuchando en el puerto ${port}`))
