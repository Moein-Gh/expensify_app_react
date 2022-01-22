import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Navigate, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateKeyword } from '../actions/petActions'
import { PET_KEYWORD_RESET } from '../constants/petConstants'

const SearchBox = () => {
  const [keyword, setKeyword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      document.getElementById('searchForm').value = ''
      navigate(`/search/${keyword}`)
    } else {
      dispatch({ type: PET_KEYWORD_RESET })
      document.getElementById('searchForm').value = ''
      navigate('/')
    }
  }

  return (
    <Form
      onSubmit={submitHandler}
      style={{ display: 'inline-flex', marginInlineStart: ' auto' }}
    >
      <Form.Control
        id='searchForm'
        type='text'
        name='q'
        onChange={(e) => {
          setKeyword(e.target.value)
        }}
        placeholder='Search Pets...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-success' className='p-2'>
        {' '}
        Search
      </Button>
    </Form>
  )
}

export default SearchBox
