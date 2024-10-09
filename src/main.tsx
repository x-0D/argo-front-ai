import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

async function prepareApp() {
  if (import.meta.env.DEV) {
    // const { worker } = await import('./mocks/browser')
    // // Start the worker with specific options
    // await worker.start({
    //   onUnhandledRequest: 'bypass', // Ignore unhandled requests
    // })
  }

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
}

prepareApp()