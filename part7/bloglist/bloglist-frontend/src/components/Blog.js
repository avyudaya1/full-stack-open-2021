import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addLikes, deleteBlog, addComment } from '../reducers/blogReducer'
import {
  setSuccessMessage,
  setErrorMessage,
} from '../reducers/notificationReducer'
import blogService from '../services/blogs'


const Blog = ({ blog }) => {

  if(!blog){
    return null
  }

  const dispatch = useDispatch()
  const history = useHistory()
  const [allowToRemove, setAllowToRemove] = useState(false)

  useEffect(() => {
    const user = blogService.getUserInfo()
    const blogUser = blog.user.id || blog.user
    setAllowToRemove(blogUser === user.id)
  }, [])

  const addLike = (id , likes) => {
    try {
      dispatch(addLikes(id, likes+1))
      dispatch(
        setSuccessMessage(`Liked ${blog.title}!`)
      )
    } catch (error) {
      dispatch(setErrorMessage(error))
    }
  }

  const removeBlog = () => {
    const result = window.confirm(`Remove ${blog.title} by ${blog.author}`)

    if (result) {
      try {
        dispatch(
          setSuccessMessage(`blog ${blog.title} by ${blog.author} delete`)
        )
        dispatch(deleteBlog(blog.id))
        history.push('/')
      } catch (error) {
        dispatch(setErrorMessage(error))
      }
    }
  }

  const createComment = (e) => {
    e.preventDefault()
    dispatch(addComment(blog.id, e.target.comment.value))
    e.target.comment.value = ''
  }

  return (
    <div>
      <h1 className="title">{blog.title}</h1>
      <div className="info">
        <a href={blog.url}>{blog.url}</a>
        <p>
          <span className="likes">{blog.likes? blog.likes: 0} likes</span>
          <button className="like" onClick={() => addLike(blog.id, blog.likes? blog.likes: 0)}>
            like
          </button>
        </p>
        <p className="author">added by {blog.author}</p>
        {allowToRemove && (
          <button className="remove" onClick={removeBlog}>
            remove
          </button>
        )}
      </div>
      <div className="comment">
        <h3>Comments</h3>
        <form onSubmit={createComment}>
          <input type="text" name="comment" />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog.comments && blog.comments.map((comment) => (
            <li key={comment.id}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )

}

export default Blog