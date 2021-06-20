import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteNow } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filter = state.filter
    const anecdotes = state.anecdotes
    if (filter === '') return anecdotes

    // return anecdotes.filter((anecdote) => anecdote.content.indexOf(filter) > 0)
    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter) === true)
  })
  const dispatch = useDispatch()

  const vote = (anecdote) => {
    dispatch(voteNow(anecdote.id))
    dispatch(showNotification(`You voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList