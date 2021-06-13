import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import './index.css'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState(null)
  const [messageState, setMessageState] = useState('success')

  const blogFormRef = useRef()

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
      blogService.setToken(user.token)

      setTimeout(() => {
        setUser(null)
        window.localStorage.removeItem('loggedUserJSON')
        blogService.setToken(null)
      }, 3600000)

      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Wrong credentials')
      setMessageState('error')
      setTimeout(() => {
        setMessageState('success')
        setMessage(null)
      }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setMessageState('success')
        setMessage(`A new Blog ${returnedBlog.title} was added by ${returnedBlog.author}`)
        setTimeout(() => {
          setMessage(null)
          setMessageState('success')
        }, 5000)
      })
  }

  const loginForm = () => (
    <Togglable buttonLabel="log in">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit = {handleLogin}
      />
    </Togglable>
  )

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  //blog handle
  const updateLikeCount = (event, id) => {
    const foundBlog = blogs.find(b => b.id === id)
    if (foundBlog.likes === undefined)
      foundBlog.likes = 0
    const updatedBlog = { ...foundBlog, likes: foundBlog.likes + 1 }

    blogService.update(id, updatedBlog).then(returnedBlog => {
      setBlogs(blogs.map(b => b.id !== id ? b : returnedBlog).sort((a, b) => b.likes - a.likes))
    })
      .catch(() => {
        setMessage('Not authorized')
        setMessageState('error')
      })
  }

  const removeBlog = (event, id, name, author) => {
    if (window.confirm(`Remove blog ${name} by ${author}?`)) {
      blogService.deleteBlog(id).then(() => {
        setBlogs(blogs.filter(p => p.id !== id).sort((a, b) => b.likes - a.likes))
      })
        .catch(() => {
          setMessage('Not authorized')
          setMessageState('error')
        })
    }
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={message} messageState={messageState}/>
      {user === null ?
        loginForm():
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => logout()}>Log out</button>
          {blogForm()}
        </div>
      }
      <div>
        {
          blogs.map(blog => <Blog key={blog.id} blog={blog} updateLikeCount={updateLikeCount} removeBlog={removeBlog}/>)
        }
      </div>
    </div>
  )
}

export default App