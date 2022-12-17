import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter> {/*wrapping our app inside router which gives us access to react routing*/}
    <App/>
    </BrowserRouter>
  </React.StrictMode>
)
