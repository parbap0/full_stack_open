const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token("data", (req, res) =>{
  return req.method === 'POST' ? JSON.stringify(req.body) : " "
})

app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :data")
);

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]




app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
  })

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).json({ message: "person deleted" });
  })

// const generateId = () => {
//   const maxId = persons.length > 0
//     ? Math.max(...persons.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(persons.some(person => person.name === body.name)){
    return response.status(400).json({
        error: 'Name already exists in the phonebook'
      });
  }
  else if (!body.name && !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    id: Date.now(),
    name: body.name,
    number: body.number,
    
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})