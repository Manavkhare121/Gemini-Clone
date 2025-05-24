
import './index.css'
import ContextProvider from './context/Context.jsx'
import App from './App.jsx'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
 <ContextProvider>
<App />
  </ContextProvider>,
)
