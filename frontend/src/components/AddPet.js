import { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Message from './Message.js'
import Loader from './Loader.js'
import { createPet } from '../actions/petActions'
import React from 'react'
import { PET_CREATE_RESET } from '../constants/petConstants.js'

const AddPet = ({ setShowAddPet }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [image, setImage] = useState('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState()
  const [category, setCategory] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)
  const [forSellOrDonation, setForSellOrDonation] = useState('sell')
  const [location, setLocation] = useState('')
  const [description, setDescription] = useState('')
  const [isVaccinated, setIsVaccinated] = useState(true)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  // const petDetails = useSelector((state) => {
  //   return state.petDetails
  // })
  // const { loading, error, pet } = petDetails

  const petCreate = useSelector((state) => {
    return state.petCreate
  })
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = petCreate

  // let navigate = useNavigate()
  useEffect(() => {
    if (successCreate) {
      setShowAddPet(false)
    }
    dispatch({ type: PET_CREATE_RESET })
  }, [dispatch, successCreate, setShowAddPet])

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/from-data',
        },
      }
      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createPet({
        user: userInfo._id,
        name,
        price,
        image,
        breed,
        category,
        isVaccinated,
        location,
        isAvailable,
        forSellOrDonation,
        ContactNumber: contactNumber,
        age,
        description,
      })
    )
  }

  return (
    <Col>
      {/* <Link to='/admin/petlist' className='btn btn-light my-3'>
        Go Back
      </Link> */}

      <Col>
        <h1>Add Pet</h1>

        {/* {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
        {loadingCreate ? (
          <Loader />
        ) : (
          errorCreate && (
            <Message variant='danger'>
              Please Make sure all the required fields have been filled
            </Message>
          )
        )}
        <Form onSubmit={submitHandler}>
          <Row>
            <Col lg={6} md={12}>
              <Form.Group className='my-3' controlId='name'>
                <Form.Label>name *</Form.Label>
                <Form.Control
                  required
                  type='name'
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-3' controlId='location'>
                <Form.Label>Location *</Form.Label>
                <Form.Select
                  type='select'
                  placeholder='Enter Location'
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value)
                  }}
                >
                  <option value=''>select a town</option>
                  <option value='New York'>New York</option>
                  <option value='California'>California</option>
                  <option value='Texas'>Texas</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className='my-3' controlId='contactNumber'>
                <Form.Label>contact Number *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Contact number'
                  value={contactNumber}
                  onChange={(e) => {
                    setContactNumber(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-3' controlId='age'>
                <Form.Label>Age *</Form.Label>
                <Form.Control
                  type='number'
                  placeholder='Enter Age'
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
              {forSellOrDonation === 'donation' ? (
                <Form.Group className='my-3' controlId='price'>
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    disabled
                    type='number'
                    placeholder='Enter Price'
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              ) : (
                <Form.Group className='my-3' controlId='price'>
                  <Form.Label>Price *</Form.Label>
                  <Form.Control
                    type='number'
                    placeholder='Enter Price'
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value)
                    }}
                  ></Form.Control>
                </Form.Group>
              )}

              <Form.Group className='my-3' controlId='breed'>
                <Form.Label>Breed</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Breed'
                  value={breed}
                  onChange={(e) => {
                    setBreed(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>

              <Form.Group className='my-3' controlId='category'>
                <Form.Label>Category *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Category'
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col lg={6} md={12}>
              <Form.Group className='my-3' controlId='image'>
                <Form.Label>Image *</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Image URL'
                  value={image}
                  onChange={(e) => {
                    setImage(e.target.value)
                  }}
                ></Form.Control>
                <Form.Group controlId='formFile' className='mb-3'>
                  <Form.Label>Upload Your Image</Form.Label>
                  <Form.Control type='file' onChange={uploadFileHandler} />
                </Form.Group>

                {uploading && <Loader />}
              </Form.Group>

              <Form.Group className='my-3' controlId='forSellOrDonation'>
                <Form.Label>For Sell Or Donation *</Form.Label>
                <Form.Select
                  type='checkbox'
                  label='forSellOrDonation'
                  checked={forSellOrDonation}
                  onChange={(e) => {
                    setForSellOrDonation(e.target.value)
                  }}
                >
                  <option value='sell'>For Sell</option>
                  <option value='donation'>For Donation</option>
                </Form.Select>
              </Form.Group>
              <Row>
                <Col md={6} className='m-auto'>
                  <Form.Group className='my-3' controlId='isVaccinated'>
                    <Form.Check
                      type='checkbox'
                      label='isVaccinated'
                      checked={isVaccinated}
                      onChange={(e) => {
                        setIsVaccinated(e.target.checked)
                      }}
                    ></Form.Check>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className='my-3' controlId='isAvailable'>
                    <Form.Check
                      type='checkbox'
                      label='isAvailable'
                      checked={isAvailable}
                      onChange={(e) => {
                        setIsAvailable(e.target.checked)
                      }}
                    ></Form.Check>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className='my-3' controlId='description'>
                <Form.Label>Description *</Form.Label>
                <Form.Control
                  as='textarea'
                  placeholder='Enter Description'
                  value={description}
                  style={{ height: '10rem' }}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Button className='my-3' type='submit' variant='primary'>
            {' '}
            Create
          </Button>
          <Button
            className='m-3'
            type='button'
            variant='danger'
            onClick={() => {
              setShowAddPet(false)
            }}
          >
            {' '}
            Cancel
          </Button>
        </Form>
        {/* ) */}
        {/* } */}
      </Col>
    </Col>
  )
}

export default AddPet
