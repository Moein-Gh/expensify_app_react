import { useState, useEffect } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listPetDetails, updatePet } from '../actions/petActions'
import FormContainer from '../components/FormContainer.js'
import React from 'react'
import { PET_UPDATE_RESET } from '../constants/petConstants.js'

const PetEdit = ({ pet_id, setShowEditPet }) => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState()
  const [image, setImage] = useState('')
  const [breed, setBreed] = useState('')
  const [age, setAge] = useState()
  const [category, setCategory] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [isAvailable, setIsAvailable] = useState(true)
  const [forSellOrDonation, setForSellOrDonation] = useState('sell')
  const [location, setLocation] = useState(0)
  const [description, setDescription] = useState(0)
  const [isVaccinated, setIsVaccinated] = useState(true)
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const petDetails = useSelector((state) => {
    return state.petDetails
  })
  const { loading, error, success, pet } = petDetails

  const petUpdate = useSelector((state) => {
    return state.petUpdate
  })
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = petUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PET_UPDATE_RESET })
      setShowEditPet(false)
    } else {
      if (pet_id) {
        dispatch(listPetDetails(pet_id))

        setName(pet.name)
        setPrice(pet.price)
        setImage(pet.image)
        setBreed(pet.breed)
        setCategory(pet.category)
        setContactNumber(pet.ContactNumber)
        setAge(pet.age)
        setIsAvailable(pet.isAvailable)
        setForSellOrDonation(pet.forSellOrDonation)
        setLocation(pet.location)
        setDescription(pet.description)
        setIsVaccinated(pet.isVaccinated)
      }
    }
  }, [
    dispatch,
    successUpdate,
    success,
    pet_id,
    pet._id,
    pet.name,
    pet.price,
    pet.image,
    pet.breed,
    pet.category,
    pet.ContactNumber,
    pet.age,
    pet.isAvailable,
    pet.forSellOrDonation,
    pet.location,
    pet.description,
    pet.isVaccinated,
    setShowEditPet,
  ])

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
        _id: pet_id,
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
    <Container>
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
              <Form.Label>ContactNumber</Form.Label>
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
              <Form.Label>Age</Form.Label>
              <Form.Control
                type='age'
                placeholder='Enter Age'
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
              <Form.Label>For Sell Or Donation</Form.Label>
              <Form.Select
                type='select'
                label='forSellOrDonation'
                checked={forSellOrDonation}
                onChange={(e) => {
                  setForSellOrDonation(e.target.checked)
                }}
              >
                <option value='sell'>For Sell</option>
                <option value='donation'>For Donation</option>
              </Form.Select>
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
                as='textarea'
                placeholder='Enter Description'
                style={{ height: '10rem' }}
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Button className='my-3' type='submit' variant='primary'>
              {' '}
              Update
            </Button>
            <Button
              className='m-3'
              type='button'
              variant='danger'
              onClick={() => {
                setShowEditPet(false)
              }}
            >
              {' '}
              Cancel
            </Button>
          </Form>
        )}
      </FormContainer>
    </Container>
  )
}

export default PetEdit
