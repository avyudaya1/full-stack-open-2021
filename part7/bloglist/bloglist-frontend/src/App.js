import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Switch, Link, useRouteMatch, Route } from 'react-router-dom'
import { Container } from '@material-ui/core'

import NavBar from './components/NavBar'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import SingleUser from './components/SingleUser'

import {  initializeBlogs, createBlog } from './reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)
  const blogFromRef = useRef()

  useEffect(() => {
    dispatch(setUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const addBlog = async (blogObject) => {
    try {
      blogFromRef.current.toggleVisibility()
      dispatch(createBlog(blogObject))
      dispatch(
        setSuccessMessage(
          `a new blog ${blogObject.title} was added`
        )
      )
    } catch (exception) {
      setErrorMessage(`${exception}`)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel="Create Blog" ref={blogFromRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  //route handlers
  const matchUserId = useRouteMatch('/users/:id')
  const userBlogs = matchUserId
    ? blogs.filter((blog) => blog.user === matchUserId.params.id)
    : null

  const matchBlogId = useRouteMatch('/blogs/:id')
  const currentBlog = matchBlogId
    ? blogs.find((blog) => blog.id === matchBlogId.params.id)
    : null

  console.log(currentBlog)

  return (
    <Container maxWidth='xl'>
      <NavBar/>
      <Notification message = {notification} />
      <Switch>
        <Route path="/users/:id">
          <SingleUser blogs={userBlogs} />
        </Route>
        <Route path="/blogs/:id">
          <Blog blog={currentBlog} />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user === null ? (
            <div>
              <h2>Log in to application</h2>
              <LoginForm />
            </div>
          ) : (
            <div>
              <h1>All Blogs</h1>
              {blogs
                .sort((a, b) => (a.likes > b.likes ? -1 : 1))
                .map((blog) => (
                  <div key={blog.id}>
                    <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                  </div>
                ))}
              <Container style={{ margin: 20 }}/>
              {blogForm()}
              <Users />
            </div>
          )}
        </Route>
      </Switch>
    </Container>
  )
}

export default App