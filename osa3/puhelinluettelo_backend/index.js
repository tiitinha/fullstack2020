const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', req => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let phonebook= [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ahte Alto",
        number: "040-654321",
        id: 2
    },
    {
        name: "Tim John",
        number: "070-112345",
        id: 3
    },
    {
        name: "John Tim",
        number: "1800-123456",
        id: 4
    }
]

const missingResponse = (res, missingComponent) => {
    return res.status(400).json({
        error: `${missingComponent} missing`
    })
}

const generateId = () => {
    return Math.floor(Math.random() * Math.floor(1000))
}

app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info of ${phonebook.length} people</p>
    <p>${new Date()}</p>`)
})

app.get('/api/persons', (req, res) => {
    console.log('haetaan')
    res.json(phonebook)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = phonebook.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    phonebook = phonebook.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (!body.name) {
        return missingResponse(res, 'name')
    } else if (!body.number) {
        return missingResponse(res, 'number')
    }

    if (phonebook.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    }

    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    phonebook = phonebook.concat(person)

    res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on the port ${PORT}`)
})