const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
morgan.token('person', function (request) { 
  return JSON.stringify(request.body)
 })
 

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))



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
    response.send('<h1> Hello World ! </h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
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

  response.status(204).end()
})

const generateId = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
 if(!body.number)
  {
    return response.status(400).json({ 
      error: 'number missing' 
    })
  }
 if(persons.find(person => person.name == body.name))
 {
  return response.status(400).json({ 
    error: 'name must be unique' 
  })
 }

  const person = {
    id: generateId(0,50),
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/info', (request, response)=> {
    const time = new Date()
    const size = persons.length

    response.send(`<p> Phonebook has info for ${size} people <p> ${time}`)
    

})
const PORT = process.env.PORT || 3001
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}`)
})


