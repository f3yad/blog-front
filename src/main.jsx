import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactContextProvider from './context/ReactContext'

createRoot(document.getElementById('root')).render(
  <>
    <ReactContextProvider>
      <App />
    </ReactContextProvider>
  </>,
)
