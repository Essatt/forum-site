import React, { Component } from 'react';
import { Link } from 'react-router-dom'

const NotFound = () => {
  return(
    <span stye={{textAlign: 'center', verticalAlign: 'center'}}>
      <h1>Page Not Found</h1>
      <h2>
        <Link to="/">
          Go Back to Main Page
        </Link>
      </h2>
    </span>
  )
}

export default NotFound
