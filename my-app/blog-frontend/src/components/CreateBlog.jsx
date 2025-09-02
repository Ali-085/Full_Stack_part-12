import { useState } from 'react'
import { createBlog } from '../../reducers/blogReducers'
import { showNotification } from '../../reducers/notificationReducers'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
const CreateBlog = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  
  const user = useSelector(state=> state.user)

  const handleBlogCreation = newBlog => {
    if (!user) {
      dispatch(showNotification('You must be logged in to create a blog', 5))
      return
    }

    if (!newBlog || !newBlog.title) {
      dispatch(showNotification('Title is required', 5))
      return
    }
    try {
      dispatch(createBlog(newBlog))
      dispatch(showNotification(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5))
    } catch (error) {
      dispatch(showNotification('Failed to create blog', 5))
    }
  }

  const handleChange = e => {
    const { name, value } = e.target
    setNewBlog({ ...newBlog, [name]: value })
  }

  const onSubmit = e => {
    e.preventDefault()
    handleBlogCreation(newBlog)
    navigate('/')
  }

  return (
    <div className="create-blog">
      <h2>Create a New Blog</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={newBlog.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={newBlog.author}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={newBlog.url}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create Blog
        </Button>
      </Form>
    </div>
  )
}

export default CreateBlog
