import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { CssBaseline, Container } from '@mui/material'
import App from './App'
import store from './app/store'
import './styles.css'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <CssBaseline />
        <Container maxWidth="lg">
          <App />
        </Container>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)
