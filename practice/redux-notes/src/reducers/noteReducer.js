import noteService from '../services/notes'

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

export const initializeNotes = () => {
  return async dispatch => {
    const notes = await noteService.getAll()
    dispatch({
      type: 'INIT_NOTE',
      data: notes
    })
  }
}

export const createNote = content => {
  return async dispatch => {
    const newNote = await noteService.createNew(content)
    dispatch({
      type: 'NEW_NOTE',
      data: newNote
    })
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    data: { id }
  }
}

export default noteReducer