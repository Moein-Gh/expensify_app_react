import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col, Container } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer.js'

import React from 'react'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)
  const location = useLocation()

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => {
    return state.userRegister
  })
  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'
  let navigate = useNavigate()
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(register(name, email, phoneNumber, password))
    }
  }

  return (
    <Container>
      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-3' controlId='name'>
            <Form.Label>name</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => {
                setName(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group className='my-3' controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

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

          <Form.Group className='my-3' controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Button className='my-3' type='submit' variant='primary'>
            {' '}
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an account?{' '}
            <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
              Login
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </Container>
  )
}

export default RegisterScreen
