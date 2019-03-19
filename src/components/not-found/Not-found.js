import React from 'react'
import './Not-found.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div className="not-found">
        <h1>404 - page not found</h1>
      </div>
      <div className="go-back-to-canvas">
        <Link to="/canvas">Go back to Canvas</Link>
      </div>
    </div>
  )
}

export default NotFound
