const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)

describe('no existing users in database', () => {

    beforeEach(async () => {
        await User.deleteMany()
    })

    test('adding user works', async() => {
        const newUser = {
            username: 'harza',
            name: 'Harri',
            password: 'salainensana'
        }

        await api
            .post('/api/users/')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()

        const usernames = usersAtEnd.map(u => u.name)

        expect(usernames).toContain('Harri')
    })

    test('status 401 if username or password too short and no user added', async () => {
        const newUser = {
            username: 'ht',
            name: 'ht',
            password: 'ps'
        }

        await api
            .post('/api/users/')
            .send(newUser)
            .expect(400)
            .expect(response => {
                response.body, { 'error': 'username or password length too short' }
            })
    })
})

afterAll(() => {
    mongoose.connection.close()
})