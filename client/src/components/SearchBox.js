import React, { useState } from 'react'

//Bootstrap
import { Form, Button } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(keyword)
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={handleSubmit} inline>
      <Form.Control
        type='text'
        name='q'
        placeholder='Search...'
        className='mr-sm-2 ml-sm-5'
        onChange={(e) => setKeyword(e.target.value)}
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
