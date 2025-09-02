import { useDispatch } from 'react-redux'
import { showNotification } from '../../reducers/notificationReducers'
import { incrementLikes, deleteBlog } from '../../reducers/blogReducers'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Comments from './Comments.jsx'
import { useNavigate } from 'react-router-dom'

const Blog = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const user = useSelector(state=> state.user)
  const blog = useSelector(state => state.blogs.find(b => b.id === id))
  const dispatch = useDispatch()
  if (!blog) {
    return <div>Blog loading...</div>
  }
  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    dispatch(incrementLikes(updatedBlog))
    dispatch(showNotification(`You liked "${blog.title}" by ${blog.author}`, 5))
  }


  const remove = async () => {
    const confirmDelete = window.confirm(
      `Remove blog "${blog.title}" by ${blog.author}?`
    )
    if (!confirmDelete) return

    try {
      dispatch(deleteBlog(blog.id))
      dispatch(showNotification(`Blog "${blog.title}" deleted`, 5))
      navigate('/')
    } catch (error) {
      dispatch(showNotification('Failed to delete blog', 5))
    }
  }

  let blogUserId = null
  if (blog.user) {
    if (typeof blog.user === 'object' && blog.user !== null && blog.user.id) {
      blogUserId = blog.user.id
    } else if (typeof blog.user === 'string') {
      blogUserId = blog.user
    }
  }

  const canRemove = user && blogUserId && String(blogUserId) === String(user.id)
  return (
        <div>
          <div className="Title_v">
            <strong>{blog.title}</strong>
          </div>
          <div className="Author_v">Author: {blog.author}</div>
          <div className="Url">URL: {blog.url}</div>
          <div className="Likes">
            Likes: {blog.likes}
            <button onClick={increaseLikes}>like</button>
          </div>
          {canRemove && (
            <div>
              <button onClick={remove}>Remove</button>
            </div>
          )}
          <div className="User">
            Added by: {blog.user ? blog.user.name : 'Unknown User'}
          </div>
          <Comments blog={blog} />
        </div>
  )
}

export default Blog
