import React from 'react'
import NewNote from './components/NewNote'
import VisibilityFiler from './components/VisibilityFilter'
import Notes from './components/Notes'

const App = () => {
  return (
    <div>
      <NewNote/>
      <VisibilityFiler/>
      <Notes/>
    </div>
  )
}

export default App