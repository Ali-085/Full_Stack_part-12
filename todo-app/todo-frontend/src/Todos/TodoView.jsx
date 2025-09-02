console.log("TodoView file loaded");
import { useEffect, useState } from 'react'
import axios from '../util/apiClient'
import List from './List'
import Form from './Form'

const TodoView = () => {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  console.log("heree")
  const refreshTodos = async () => {
    console.log("heree r")
    try {
      setLoading(true)
      const { data } = await axios.get('/todos')
      console.log('Fetched todos:', data)
      setTodos(data)
    } catch (err) {
      console.error('Failed to fetch todos:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    console.log("heree e")
    refreshTodos()
  }, [])
  
  const createTodo = async (todo) => {
    try {
      await axios.post('/todos', todo)
      refreshTodos()
    } catch (err) {
      console.error('Failed to create todo:', err)
    }
  }

  const deleteTodo = async (todo) => {
    try {
      await axios.delete(`/todos/${todo._id}`)
      refreshTodos()
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  const completeTodo = async (todo) => {
    try {
      await axios.put(`/todos/${todo._id}`, { text: todo.text, done: true })
      refreshTodos()
    } catch (err) {
      console.error('Failed to complete todo:', err)
    }
  }

  return (
    <>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      {loading ? (
        <p>Loading...</p>
      ) : (
          <>
            {console.log("Todos to render:", todos)}
            <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
          </>
      )}
    </>
  )
}

export default TodoView
