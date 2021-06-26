import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { userLogout } from '../reducers/userReducer'

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(3),
    marginLeft: theme.spacing(3),
    backgroundColor: 'purple',
  },
  title: {
    flexGrow: 1,
  },
  link: {
    textDecoration: 'none',
    padding: '5px',
    color: '#fff',
  },
}))

const NavBar = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const history = useHistory()

  const handleLogout = () => {
    dispatch(userLogout())
    history.push('/')
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" color='secondary'>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/users">
              Bloglist app
            </Link>
          </Typography>
          {user !== null && (
            <>
              {user.name} logged in{' '}
              <Button
                color="inherit"
                className={classes.menuButton}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default NavBar