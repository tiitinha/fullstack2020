const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
//const User = require('../models/user')

const api = supertest(app)

describe('with initial blogs', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)

    })

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('correct number of blogs is returned', async () => {
        const response = await api.get('/api/blogs')

        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('identifying field correctly named as id', async () => {
        const response = await api.get('/api/blogs')

        const blog = response.body[0]

        expect(blog.id).toBeDefined()
    })

    test('deleting a blog succesfully deletes a blog', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

        const titles = blogsAtEnd.map(b => b.title)

        expect(titles).not.toContain(blogToDelete.title)
    })

    test('a valid blog can be added', async () => {
        const newBlog = {
            title: 'Uusi blogi',
            author: 'Minä',
            url: 'google.fi',
            likes: 100
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(b => b.title)
        expect(titles).toContain(
            'Uusi blogi'
        )
    })
})

describe('addition of a new blog', () => {
    beforeEach(async () => {
        await Blog.deleteMany()
    })

    test('likes zero if no value given', async () => {
        const newBlog = {
            title: 'uusi blogi 2',
            author: 'Minä',
            url: 'google'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()

        const blog = blogsAtEnd.find(b => b.title === 'uusi blogi 2')

        expect(blog.likes).toBe(0)
    })

    test('if title or uri missing, response 400', async () => {
        const newBlog = {
            author: 'minä'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })
})

describe('modifying a single blog', () => {
    test('modifying the blog changes the blog', async () => {
        const newBlog = {
            title: 'uusi blogi 2',
            author: 'Minä',
            url: 'google'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsFirst = await helper.blogsInDb()

        const blog = blogsFirst.find(b => b.title === 'uusi blogi 2')

        blog.title = 'uusi blogi 3'

        await api
            .put(`/api/blogs/${blog.id}`)
            .send(blog)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogsThen = await helper.blogsInDb()

        const titles = blogsThen.map(b => b.title)

        expect(titles).toContain('uusi blogi 3')

    })
})

afterAll(() => {
    mongoose.connection.close()
})