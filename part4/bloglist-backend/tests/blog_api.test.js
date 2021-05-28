const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: "Ramayan",
    author: "Valmaki",
    url: "ramayan.com",
    likes: 24234
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
})

test('if likes is unidentified (set to 0)', async () => {
  const newBlog = {
    title: 'FUllStackOpen',
    author: 'UOH',
    url: 'http:fullstackopen.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')
  const result = response.body[response.body.length - 1]

  expect(result.likes).toEqual(0)
})

test('if title or url empty', async () => {

  const newBlog = {
    title: "hello",
    likes: 10,
    author: "hello"
  }

  await await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

describe('updating of a blog', () => {
  test('succeds with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = blogsAtStart[0]

    await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('deletion of a blog', () => {
  test('succeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length - 1
    )

    // const contents = blogsAtEnd.map(b => b.content)
    // console.log('contents:', blogsAtEnd)
    expect(blogsAtEnd).not.toContain(blogToDelete.content)
  })
})

afterAll(() => {
  mongoose.connection.close()
})