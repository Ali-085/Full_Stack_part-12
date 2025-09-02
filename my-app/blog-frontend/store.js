import { configureStore } from '@reduxjs/toolkit'
import blogReducer from './reducers/blogReducers'
import notificationReducer from './reducers/notificationReducers'
import { initializeBlog } from './reducers/blogReducers'
import userReducer from './reducers/userReducers'
import usersReducer,{fetchUsers} from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer
  }
})

store.dispatch(initializeBlog())
store.dispatch(fetchUsers())
export default store
