import React, { useEffect } from 'react'
import NewNote from './components/NewNote'
import VisibilityFiler from './components/VisibilityFilter'
import Notes from './components/Notes'
import noteService from './services/notes'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService
      .getAll().then(notes => dispatch(initializeNotes(notes)))
  }, [dispatch])  // !OR
  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <NewNote/>
      <VisibilityFiler/>
      <Notes/>
    </div>
  )
}

export default App