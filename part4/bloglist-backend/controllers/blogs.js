const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).populate('users', { username: 1, name: 1 });
	response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.get('/:id', async (request, response, next) => {
	const blog = await Blog.findById(request.params.id);
	try {
		if (blog) {
			response.json(blog.toJSON());
		} else {
			response.status(404).end();
		}
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.post('/', async (request, response, next) => {
	const body = request.body;

	// const token = getTokenFrom(request);
	const token = request.token;
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		const user = await User.findById(decodedToken.id);

		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
		});

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();
		response.json(savedBlog.toJSON());
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.delete('/:id', async (request, response, next) => {
	const id = request.params.id;
	const token = request.token;
	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return response.status(401).json({ error: 'token missing or invalid' });
		}

		const blog = await Blog.findById(id);
		const user = await User.findById(blog.user.toString());
		if (decodedToken.id.toString() === blog.user.toString()) {
			await blog.remove();
			response.status(204).end();
		} else {
			return response.status(401).json({ error: 'unauthorized' });
		}
	} catch (exception) {
		next(exception);
	}
});

blogsRouter.put('/:id', async (request, response, next) => {
	const body = request.body;
	try {
		if (!body.likes || !body.title || !body.author || !body.url) {
			return request.status(400).json({
				error: 'content missing'
			});
		}

		const blog = {
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes
		};

		const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
		response.json(updatedBlog.toJSON());
	} catch (error) {
		next(error);
	}
});

module.exports = blogsRouter;