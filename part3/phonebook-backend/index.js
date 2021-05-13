require('dotenv').config()
const express = require('express')
const Person = require('./models/person')
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) => {
  const body = JSON.stringify(req.body)
  if (body === JSON.stringify({})) {
    return ''
  }
  else {
    return body
  }
})
app.use(morgan(':method :url :status :req[body] - :response-time ms :body'))

// var persons = [
//     {
//         id: 1,
//         name: "Arto Hellas",
//         number: "123-456789",
//     },
//     {
//         id: 2,
//         name: "Ada Lovelace",
//         number: "987-654321",
//     },
//     {
//         id: 3,
//         name: "Dan Abramov",
//         number: "867-12453",
//     }
// ]

app.get('/', (request, response) => {
  response.send('<h1>phonebook app</h1>')
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => response.json(persons))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

// app.get('/info', (request, response) => {
//     response.send(`<p>Phonebook has info for ${persons.length} persons </br>${new Date()}</p>`)
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
    date: new Date(),
  }) 

  person.save().then(savedPerson => response.json(savedPerson.toJSON()))
    .catch(error => next(error))
})

// unknownEndPoint middleware
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)
  
  
//only exception to the middleware being called as prev unknown point has no next method.
//error handler middleware
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`phonebook=backend running at http://localhost:${PORT}`)
})