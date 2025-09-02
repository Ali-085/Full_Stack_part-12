import { getComments, addComment } from '../services/blogs'
import { useEffect,useState } from 'react'

const Comments = ({ blog }) => {
    const [comments, setComments] = useState([])

    useEffect(() => {
    const fetchComments = async () => {
        const fetchedComments = await getComments(blog.id)
        setComments(fetchedComments)
    }
    fetchComments()
    }, [blog.id])
  
  
    const addsComment = (event) => {
        event.preventDefault()
        const comment = event.target.comment.value
        if (!comment) return
        addComment(blog.id, comment)
          .then(newComment => {
            setComments(comments.concat(newComment))
            event.target.comment.value = ''
          })
          .catch(error => {
            console.error('Error adding comment:', error)
          })
    }


  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={addsComment}>
        <input name="comment" type="text" placeholder="Add a comment" />
        <button type="submit">Add Comment</button>
      </form>
      <ul>
        {comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default Comments