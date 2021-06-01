const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Hippopotamus',
    author: 'Me',
    url: 'google.com',
    likes: 10,
  },
  {
    title: 'Girrafe',
    author: 'Me',
    url: 'google.com',
    likes: 11
  }
]

const nonExistingId = async () => {
	const blog = new Blog({ content: 'willremovethissoon' });
	await blog.save();
	await blog.remove();

	return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb,
  nonExistingId
}