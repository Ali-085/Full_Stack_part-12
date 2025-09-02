import { useSelector } from 'react-redux'
import {
Link, useMatch, useNavigate
} from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
const AllBlogs = () => {
  const blog = useSelector(state => state.blogs)
  const sortedBlogs = [...blog].sort((a, b) => b.likes - a.likes)

  return (
    <div
      style={{
        border: '2px solid #e3e3e3',
        borderRadius: '10px',
        padding: '24px',
        margin: '24px auto',
        maxWidth: '600px',
        background: '#fafbfc',
        boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
      }}
      className="blog"
    >
      <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#2c3e50' }}>Blogs</h2>
      <ListGroup variant="flush">
        {sortedBlogs.map(blog => (
          <ListGroup.Item key={blog.id} style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '16px 8px' }}>
            <Link to={`/blogs/${blog.id}`} style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#007bff', textDecoration: 'none' }}>
              {blog.title}
            </Link>
            <span style={{ color: '#555', fontSize: '0.95rem' }}>by {blog.author}</span>
            <span style={{ color: '#888', fontSize: '0.85rem' }}>Likes: {blog.likes}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  )
}
export default AllBlogs