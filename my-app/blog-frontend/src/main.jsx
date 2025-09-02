import ReactDOM from 'react-dom/client'
import store from '../store'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
  <Provider store={store}>
    <App />
  </Provider>
  </Router>
)
