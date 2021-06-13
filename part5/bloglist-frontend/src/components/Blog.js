import React, { useState } from 'react'

const Blog = ({ blog, updateLikeCount, removeBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [flag, setFlag] = useState(false)
  const showDetails = () => setFlag(true)
  const hideDetails = () => setFlag(false)

  if (!flag) {
    return (
      <div style={blogStyle} className="blog-default">
        <div className="blog">
          {blog.title} {blog.author} &nbsp; <button onClick={showDetails}>view</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div><span className="blog-title">Title: {blog.title}</span> &nbsp; <button onClick={hideDetails}>hide</button></div>
        <div className="blog-url">URL: {blog.url}</div>
        <div><span className="blog-likes">Likes: {blog.likes}</span>&nbsp; <button onClick={(event) => updateLikeCount(event, blog.id)}>like</button></div>
        <div className="blog-author">Author: {blog.author}</div>
        <button onClick={(event) => removeBlog(event, blog.id, blog.title, blog.author)}>remove</button>
      </div>
    )
  }

}

export default Blog