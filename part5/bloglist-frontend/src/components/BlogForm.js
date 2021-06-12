import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  const handleTitleChange = event => setTitle(event.target.value)
  const handleAuthorChange = event => setAuthor(event.target.value)
  const handleUrlChange = event => setUrl(event.target.value)


  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })

    setAuthor('')
    setUrl('')
    setTitle('')
  }

  return (
    <div>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <label>
          Title
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </label>
        <br/>
        <label>
          Author
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </label>
        <br/>
        <label>
          Url
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </label>
        <br/>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm