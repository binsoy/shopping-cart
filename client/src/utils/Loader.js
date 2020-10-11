import React from 'react'

//Bootstrap
import { Spinner } from 'react-bootstrap'

const Loader = () => {
  return (
    <Spinner
      animation='border'
      role='status'
      style={{
        display: 'block',
        margin: 'auto',
        width: '100px',
        height: '100px',
      }}
    >
      <span className='sr-only'>Loading...</span>
    </Spinner>
  )
}

export default Loader
