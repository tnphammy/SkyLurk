import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './elements/Card.jsx'
import { Link } from 'react-router';
function App(props) {

  return (
    <div>
      <h1>Welcome to SkyLurk!</h1>
      <h2>Don't know where to put your pretty sky photos? SkyLurk's your limit!</h2>
      <Link to="/view">
      <button>Continue as an anonymous user</button>
      </Link>
    </div>
  )
}

export default App
