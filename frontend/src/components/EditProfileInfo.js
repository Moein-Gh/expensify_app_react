import React, { useEffect, useState } from 'react'
import { Button, Col, Form } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'

const EditProfileInfo = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()

  const userUpdateProfile = useSelector((state) => {
    return state.userUpdateProfile
  })
  const { loading, error, success } = userUpdateProfile

  const userLogin = useSelector((state) => {
    return state.userLogin
  })
  const { userInfo } = userLogin

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id))

    setName(userInfo.name)
    setEmail(userInfo.email)
    setPhoneNumber(userInfo.phoneNumber)
  }, [dispatch, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(
        updateUserProfile({
          id: userInfo._id,
          name,
          email,
          phoneNumber,
          password,
        })
      )
    }
  }

  return (
    <Col>
      <h2>UserProfile</h2>
      {message && <Message variant='danger'>{message}</Message>}
      {error && <Message variant='danger'>{error}</Message>}
      {success && <Message variant='success'>Profile Updated</Message>}
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
          Update
        </Button>
      </Form>
    </Col>
  )
}

export default EditProfileInfo
