import React from 'react'

const Notification = ({ message, messageState }) => {
  if (message === null) {
    return null
  } else if (messageState === 'error') {
    return (
      <>
        <div className="error">{message}</div>
      </>
    )
  } else if (messageState === 'success') {
    return (
      <>
        <div className="success">{message}</div>
      </>
    )
  }
}

export default Notification