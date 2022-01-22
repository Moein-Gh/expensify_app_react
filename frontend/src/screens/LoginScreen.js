import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

import React from 'react'

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation()

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => {
    return state.userLogin
  })
  const { loading, error, userInfo } = userLogin

  const redirect = location.search ? location.search.split('=')[1] : '/'
  let navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(phoneNumber, password))
  }

  return (
    <Container>
      <FormContainer>
        <h1>Sign In</h1>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='phoneNumber'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Phone Number'
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-3' controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Button className='my-3' type='submit' variant='primary'>
            {' '}
            Sign In
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            New Customer?{' '}
            <Link
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Register
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  )
}

export default LoginScreen
