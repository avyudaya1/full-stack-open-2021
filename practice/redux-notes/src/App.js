import React, { useEffect } from 'react'
import { initializeNotes } from './reducers/noteReducer'
import { useDispatch } from 'react-redux'

import NewNote from './components/NewNote'
import VisibilityFiler from './components/VisibilityFilter'
import Notes from './components/Notes'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
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