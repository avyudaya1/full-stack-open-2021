let timerCancel

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION': {
      return action.data.notification
    }
    default:
      return state
  }
}

export const showNotification = (notification, timeout) => {
  return async dispatch => {
    dispatch({
      type: 'SHOW_NOTIFICATION',
      data: {
        notification,
      },
    })
    if(timerCancel) {
      clearTimeout(timerCancel)
    }
    timerCancel = setTimeout(() => {
      dispatch({
        type: 'SHOW_NOTIFICATION',
        data: {
          notification: null
        },
      })
    }, timeout * 1000);
  }
}

export default notificationReducer