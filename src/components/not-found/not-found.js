import React from 'react'
import './not-found.css'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div className="not-found">
        <h1>404 - page not found</h1>
      </div>
      <div>
        <Link to="/canvas">Go back to Canvas</Link>
      </div>
    </div>
  )
}

export default NotFound
