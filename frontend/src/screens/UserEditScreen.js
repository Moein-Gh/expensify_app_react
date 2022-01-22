import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants.js'
import FormContainer from '../components/FormContainer.js'

import React from 'react'

const UserEditScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const { id: userId } = useParams('id')

  const dispatch = useDispatch()

  const userDetails = useSelector((state) => {
    return state.userDetails
  })
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => {
    return state.userUpdate
  })
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  let navigate = useNavigate()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      navigate('/admin/userlist')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, userId, user, successUpdate, navigate])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(updateUser({ _id: userId, name, email, phoneNumber, isAdmin }))
  }

  return (
    <Container>
      <Link to='/admin/userlist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
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

            <Form.Group className='my-3' controlId='isadmin'>
              <Form.Check
                type='checkbox'
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => {
                  setIsAdmin(e.target.checked)
                }}
              ></Form.Check>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
              {' '}
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default UserEditScreen
