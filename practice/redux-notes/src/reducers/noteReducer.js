const noteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_NOTE':
      // return state.concat(action.data)
      // ! never use .push as it changes the previous state obj and the obj becomes mutable
      return [...state, action.data]
    case 'INIT_NOTE':
      return action.data
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(s => s.id === id)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note: changedNote)
    default:
      return state
  }
}

// action creators below

export const initializeNotes = (notes) => {
  return {
    type: 'INIT_NOTE',
    data: notes
  }
}

export const createNote = (data) => {
  return {
    type: 'NEW_NOTE',
    data
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer