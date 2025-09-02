import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (!notification) return null

  return (
    <Alert variant="info" style={{ maxWidth: '500px', margin: '20px auto', textAlign: 'center', fontSize: '1.1rem' }}>
      {notification}
    </Alert>
  )
}

export default Notification
