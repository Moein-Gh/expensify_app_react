import React from 'react'
import { Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const LocationOptions = () => {
  const navigate = useNavigate()
  const locationSubmitHandler = (e) => {
    navigate(`/location/${e.target.value}`)
  }

  return (
    <>
      <Form.Label style={{ fontSize: '2rem', color: 'black' }}>
        Location
      </Form.Label>
      <Form.Select
        style={{
          fontSize: '1.5rem',
          color: 'black',
          border: ' black 1px solid',
        }}
        aria-label='Default select example'
        onChange={locationSubmitHandler}
      >
        <option value=''>All locations</option>
        <option value='New York'>New York</option>
        <option value='California'>California</option>
        <option value='Texas'>Texas</option>
      </Form.Select>
    </>
  )
}

export default LocationOptions
