import { createSlice } from '@reduxjs/toolkit'
import loginServices from '../src/services/loginServices'
import { showNotification } from './notificationReducers'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const  handleLogin = (username, password) => {
  return async dispatch => { 
    try {
      const user = await loginServices.login({
        username,
        password
      })
      dispatch(setUser(user))
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
    } catch (exception) {
      dispatch(showNotification('Wrong credentials', 5))
    }
  }
}

export default userSlice.reducer