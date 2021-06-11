import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [message, setMessage] = useState(null)
  const [errorState, setErrorState] = useState('success')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)

      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setErrorState('error')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
        setErrorState('success')
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObj = {
      author, title, url
    }

    blogService.create(newBlogObj).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setErrorState('success')
      setMessage(`A new Blog ${returnedBlog.title} was added by ${returnedBlog.author}`)
      setTimeout(() => {
        setMessage(null)
        setErrorState('success')
      }, 5000)
      setAuthor('')
      setTitle('')
      setUrl('')
    })
  }

  if (user == null) {
    return (
      <>
        <Notification message={message} errorState={errorState} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username<input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
          </div>
          <div>
            password<input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
          </div>
          <button type="submit">login</button>
        </form>

      </>
    )
  } else {
    return (
      <>
        <h2>blogs</h2>
        <div>{user.name} is logged in</div>
        <button onClick={logout}>logout</button>
        <Notification message={message} errorState={errorState} />
        <br />
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>title:<input value={title} onChange={({ target }) => setTitle(target.value)} /></div>
          <div>author:<input value={author} onChange={({ target }) => setAuthor(target.value)} /></div>
          <div>url:<input value={url} onChange={({ target }) => setUrl(target.value)} /></div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </>
    )
  }
}

export default App