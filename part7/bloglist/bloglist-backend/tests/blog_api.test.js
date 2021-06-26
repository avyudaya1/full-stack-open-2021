const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('when there are initial blogs', () => {

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

  test('a specific blog is within the returned blogs', async () => {
		const response = await api.get('/api/blogs');

		const contents = response.body.map((r) => r.title);

		expect(contents).toContain('Girrafe');
	});
})

describe('addition of new blog', () => {

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


describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const user = new User({ username: 'root', password: 'root' });
		await user.save();
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen'
		};

		await api.post('/api/users').send(newUser).expect(201).expect('Content-Type', /application\/json/);

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root',
			name: 'root',
			password: 'salainen'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('`username` to be unique');

		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with proper statuscode and message if password is shorter than 3chars', async () => {
		const usersAtStart = await helper.usersInDb();

		const newUser = {
			username: 'root2',
			name: 'Superuser2',
			password: 'sa'
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('Password mush be at least 3 chars long');
		const usersAtEnd = await helper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});

afterAll(() => {
  mongoose.connection.close()
})