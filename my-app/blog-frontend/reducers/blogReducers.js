import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../src/services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    append(state, action) {
      state.push(action.payload)
    },
    incLikes(state, action) {
      const blog = state.find(s => s.id === action.payload)
      if (blog) {
        blog.likes += 1
      }
    },
    setBlog(state, action) {
      return action.payload
    }
  }
})

export const { append, incLikes, setBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blog = await blogServices.getAll()
    dispatch(setBlog(blog))
  }
}

export const createBlog = content => {
  return async dispatch => {
    const newBlog = await blogServices.create(content)
    dispatch(append(newBlog))
  }
}

export const incrementLikes = blog => {
  return async dispatch => {
    const modifiedBlog = await blogServices.update(blog.id,blog)
    dispatch(incLikes(modifiedBlog.id))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    const ans = await blogServices.removes(id)
    const blog = await blogServices.getAll()
    dispatch(setBlog(blog))
    }
  }



export default blogSlice.reducer
