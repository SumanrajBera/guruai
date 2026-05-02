import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '../src/App/App.jsx'
import { Provider, useSelector } from "react-redux"
import store from './App/app.store.js'
import { ToastContainer } from 'react-toastify'
const ToastWrapper = () => {
  const theme = useSelector(state => state.auth.theme)
  return <ToastContainer theme={theme} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastWrapper />
    </Provider>
  </StrictMode>

)
