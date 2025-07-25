const morgan = require('morgan')
const express = require('express')
const app = express()
const cors = require('cors')

// Needed to parse JSON bodies

let persons = [
  { id: 1, name: 'Arto Hellas', number: '040-123456' },
  { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
  { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
  { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' },
  { id: 5, name: 'Modi', number: '123-33-444' }
]
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
app.use(express.json())
app.use(requestLogger)
app.use(morgan('tiny'))
app.use(cors())
app.use(express.static('dist'))

// GET all
app.get('/api/persons', (req, res) => {
  res.json(persons)
})
// GET a specific person by id
app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).json({ error: 'Person not found' })
  }
})

app.post('/api/persons', (req, res) => {
  const body = req.body;

  // Check if name or number is missing
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'Name or number missing' });
  }

  // Check if name already exists
  const nameExists = persons.find(p => p.name === body.name);
  if (nameExists) {
    return res.status(400).json({ error: 'Name must be unique' });
  }

  const newId = persons.length > 0
    ? Math.max(...persons.map(p => p.id)) + 1
    : 1;

  const person = {
    id: newId,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);
  res.json(person);
});


// ✅ DELETE person by id
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
