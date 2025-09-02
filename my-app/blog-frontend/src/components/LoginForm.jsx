import { handleLogin } from "../../reducers/userReducers"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { Form, Button } from 'react-bootstrap'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
 
  const handlesLogin =(event)=>{
    event.preventDefault()
    dispatch(handleLogin(username,password))
  }
 return (
    <div>
      <h2>login</h2>
      <Form onSubmit={handlesLogin}>
        <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          login
        </Button>
      </Form>
    </div>
  )
}
export default LoginForm
