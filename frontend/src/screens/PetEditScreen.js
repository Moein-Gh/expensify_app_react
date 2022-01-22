import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listPetDetails, updatePet } from '../actions/petActions'
import FormContainer from '../components/FormContainer.js'
import React from 'react'
import { PET_UPDATE_RESET } from '../constants/petConstants.js'

const PetEditScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [breed, setBreed] = useState('')

  const [age, setAge] = useState()
  const [category, setCategory] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [isAvailable, setIsAvailable] = useState('')
  const [forSellOrDonation, setForSellOrDonation] = useState('')
  const [location, setLocation] = useState(0)
  const [description, setDescription] = useState(0)
  const [isVaccinated, setIsVaccinated] = useState(0)
  const [uploading, setUploading] = useState(false)
  const { id: petId } = useParams('id')

  const dispatch = useDispatch()

  const petDetails = useSelector((state) => {
    return state.petDetails
  })
  const { loading, error, pet } = petDetails

  const petUpdate = useSelector((state) => {
    return state.petUpdate
  })
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = petUpdate

  let navigate = useNavigate()
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PET_UPDATE_RESET })
      navigate('/profile')
    } else {
      if (!pet.name || pet._id !== petId) {
        dispatch(listPetDetails(petId))
      } else {
        setName(pet.name)
        setPrice(pet.price)
        setImage(pet.image)
        // setBrand(pet.brand)
        setCategory(pet.category)
        setDescription(pet.description)
        // setCountInStock(pet.countInStock)
      }
    }
  }, [dispatch, petId, pet, navigate, successUpdate])

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
      updatePet({
        _id: petId,
        name,
        price,
        // brand,
        image,
        category,
        description,
        // countInStock,
      })
    )
  }

  return (
    <Container>
      <Link to='/profile' className='btn btn-light my-3'>
        <i className='fas fa-arrow-left'></i>
      </Link>

      <FormContainer>
        <h1>Edit Pet</h1>
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

            <Form.Group className='my-3' controlId='location'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='location'
                placeholder='Enter Location'
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='contactNumber'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='contactNumber'
                placeholder='Enter Contact number'
                value={contactNumber}
                onChange={(e) => {
                  setContactNumber(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='age'>
              <Form.Label>Location</Form.Label>
              <Form.Control
                type='age'
                placeholder='Enter Contact number'
                value={age}
                onChange={(e) => {
                  setAge(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='price'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='image'>
              <Form.Label>Image</Form.Label>
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
              {/* <Form.File
                type='file'
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File> */}
              {uploading && <Loader />}
            </Form.Group>

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
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group className='my-3' controlId='forSellOrDonation'>
              <Form.Check
                type='checkbox'
                label='forSellOrDonation'
                checked={forSellOrDonation}
                onChange={(e) => {
                  setForSellOrDonation(e.target.checked)
                }}
              ></Form.Check>
            </Form.Group>

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

            <Form.Group className='my-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              ></Form.Control>
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

export default PetEditScreen
