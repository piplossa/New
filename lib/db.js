import fs from 'fs'
import path from 'path'

const dbFile = path.resolve('lib', 'db.json')

export function readDB() {
  if (!fs.existsSync(dbFile)) fs.writeFileSync(dbFile, JSON.stringify({ users: {}, usage: {} }, null, 2), 'utf8')
  return JSON.parse(fs.readFileSync(dbFile, 'utf8'))
}

export function writeDB(data) {
  fs.writeFileSync(dbFile, JSON.stringify(data, null, 2), 'utf8')
}
