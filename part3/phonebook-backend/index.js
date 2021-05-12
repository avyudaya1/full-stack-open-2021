const express = require("express");
const cors = require('cors')
const app = express()
const morgan = require('morgan')

app.use(cors())
app.use(express.static('build'))
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

var persons = [
    {
        id: 1,
        name: "Arto Hellas",
        number: "123-456789",
    },
    {
        id: 2,
        name: "Ada Lovelace",
        number: "987-654321",
    },
    {
        id: 3,
        name: "Dan Abramov",
        number: "867-12453",
    }
]

app.get('/', (request, response) => {
    response.send('<h1>phonebook backend</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const note = persons.find(person => person.id === id)
    
    if(note){
        response.json(note)
    } else {
        response.status(404).end()
    }
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${persons.length} persons </br>${new Date()}</p>`)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

// post a new person

const generateId = (max) => {
    const id = Math.floor(Math.random() * max)
    return id
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    if(!body.name || !body.number) {
        return response.status(400).json({
            error: 'name or number missing'
        })
    }

    const temp = persons.map(person => person.name)

    if(temp.includes(body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        date: new Date(),
        id: generateId(99999)
    }

    persons = persons.concat(person)

    response.json(person)
})


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`phonebook=backend running at http://localhost:${PORT}`)
})