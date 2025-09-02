import {useEffect } from 'react'
import LoginForm from './components/LoginForm'
import CreateBlog from './components/CreateBlog'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { setUser } from '../reducers/userReducers'
import Users from './components/Users'
import Individual from './components/Individual'
import AllBlogs from './components/AllBlog'
import Blog from './components/Blog'
import {
  Routes, Route, Link, useMatch, useNavigate
} from 'react-router-dom'
import { Container, Navbar, Nav,Button } from 'react-bootstrap'

const App = () => {
  const user = useSelector(state=> state.user)

  const dispatch = useDispatch()


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
    }
  }, [])


  if (user === null) {
    return (
      <Container>
        <h1>Blog App</h1>
        <h2>Log in to application</h2>
        <LoginForm />
      </Container>
    )
  }


  return (
    <Container>
      <Notification />
      <h1 style={{ margin: '24px 0' }}>Blog App</h1>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="mb-4">
        <Container>
          <Navbar.Brand as={Link} to="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/users">Users</Nav.Link>
              <Nav.Link as={Link} to="/create">Create Blog</Nav.Link>
            </Nav>
            <Nav>
              {user && user.name ? (
                <Nav.Item style={{ color: '#fff', marginRight: '1rem', display: 'flex', alignItems: 'center' }}>
                  <em>{user.name} logged in</em>
                  <Button
                    variant="outline-light"
                    size="sm"
                    style={{ marginLeft: '1rem' }}
                    onClick={() => {
                      dispatch(setUser(null))
                      window.localStorage.removeItem('loggedBlogappUser')
                    }}
                  >
                    logout
                  </Button>
                </Nav.Item>
              ) : (
                <Nav.Link as={Link} to="/login">login</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<AllBlogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<Individual />} />
        <Route path="/blogs/:id" element={<Blog />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="*" element={<h2>Page not found</h2>} />
      </Routes>
    </Container>
  )
}

export default App
