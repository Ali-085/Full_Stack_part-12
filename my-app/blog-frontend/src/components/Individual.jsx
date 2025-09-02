import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

const Individual = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.find(user => user.id === id));
  const allBlogs = useSelector(state => state.blogs);

  const userId = user?.id

  const blogs = useMemo(() => {
    return allBlogs.filter(blog => blog.user && blog.user.id === user.id);
  }, [allBlogs, userId]);

  if (!user) {
    return <p>Loading...</p> 
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>Added blogs</h3>
      <ul>
        {blogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Individual
