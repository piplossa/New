import verifyKey from '../utils/verifyKey.js'

export default function handler(req, res) {
  verifyKey(req, res, () => {
    res.json({ success: true, message: 'Endpoint 1 funcionando 😎' })
  })
}