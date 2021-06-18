const noteReducer = (state = [], action) => {
  console.log(state)
  switch(action.type) {
    case 'NEW_NOTE':
      // return state.concat(action.data)
      // ! never use .push as it changes the previous state obj and the obj becomes mutable
      return [...state, action.data]
    case 'TOGGLE_IMPORTANCE':
      const id = action.data.id
      const noteToChange = state.find(s => s.id === id)
      console.log(noteToChange)
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important
      }
      return state.map(note => note.id !== id ? note: changedNote)
    default:
      return state
  }
}

export default noteReducer