const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Hippopotamus',
    author: 'Me',
    url: 'google.com',
    likes: 10
  },
  {
    title: 'Girrafe',
    author: 'Me',
    url: 'google.com',
    likes: 11
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}