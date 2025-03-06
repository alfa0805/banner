import React from 'react'
import Login from './Pages/Login'
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <Login/>
      <Outlet/>
    </div>
  )
}

export default App
