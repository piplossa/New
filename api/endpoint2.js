import verifyKey from '../utils/verifyKey.js'

export default function handler(req, res) {
  verifyKey(req, res, () => {
    res.json({ success: true, data: [1, 2, 3] })
  })
}