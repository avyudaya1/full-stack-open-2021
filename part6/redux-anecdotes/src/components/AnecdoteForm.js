import React from "react"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { useDispatch } from 'react-redux'
import { showNotification } from "../reducers/notificationReducer"
import noteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await noteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification(`You created '${content}'`))
    setTimeout(() => dispatch(showNotification(null)), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm