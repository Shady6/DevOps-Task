import express from 'express'
import { Person, syncDb } from './models/person'

const PORT = 4000
const app = express()
app.use(express.json())
syncDb()

app.get('/people', async (req, res) => {
  const people = await Person.findAll()
  res.json(people)
})

app.post('/people', async (req, res) => {
  if (!req.body || !req.body.name || !req.body.age) {
    res.status(404).json({
      error: `Please specify data in following format: 
        {
            "name": string,
            "age": number
        }`,
    })
    return
  }
  const person = await Person.create(req.body)
  res.json(person)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
