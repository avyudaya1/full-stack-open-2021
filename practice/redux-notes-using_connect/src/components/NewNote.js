import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  // different as one is action creator other is dipatch to the store
  console.log(createNote)
  console.log(props.createNote)

  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    props.createNote(content)
  }

  return (
    <form onSubmit={addNote}>
      {/* uncontrolled form as it has no value and onchange */}
      <input name="note"/>
      <button type="submit">add</button>
    </form>
  )
}

// can be passed instead of { createnote } in connect()
// use this when the dispatched actions need to refrence the props of the component
// const mapDispatchToProps = dispatch => {
//   return {
//     createNote: value => {
//       dispatch(createNote(value))
//     }
//   }
// }

const ConnectedNewNote = connect(
  null,
  { createNote }
)(NewNote)

export default ConnectedNewNote