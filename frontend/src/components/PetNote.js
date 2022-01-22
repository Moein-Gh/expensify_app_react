import React, { useState, useEffect } from 'react'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  addPetNotes,
  deletePetNote,
  listPetNotes,
} from '../actions/petNoteActions'
import { PETNOTE_ADD_RESET } from '../constants/petNoteConstants'

const PetNode = () => {
  const dispatch = useDispatch()
  const petDetails = useSelector((state) => {
    return state.petDetails
  })
  const { pet } = petDetails

  const userLogin = useSelector((state) => {
    return state.userLogin
  })
  const { loading, error, userInfo } = userLogin

  const [note, setNote] = useState('')

  const petNoteList = useSelector((state) => {
    return state.petNoteList
  })
  const { petNotes } = petNoteList

  const petNoteUpdate = useSelector((state) => {
    return state.petNoteUpdate
  })
  const { loading: petNoteLoading, success: petNoteUpdateSuccess } =
    petNoteUpdate

  const searchForPetNote = (pet, petNotes) => {
    petNotes.map((item) => {
      if (item.id === pet._id) {
        setNote(item.note)
        console.log(note)
      }
    })
  }

  useEffect(() => {
    dispatch(listPetNotes())
  }, [dispatch])

  useEffect(() => {
    setNote('')
    searchForPetNote(pet, petNotes)
  }, [pet, petNotes])

  const submitHandler = (e) => {
    e.preventDefault()
    if (note) {
      dispatch(
        addPetNotes(pet._id, {
          note,
          name: pet.name,
          category: pet.category,
          image: pet.image,
        })
      )
    } else {
      dispatch(deletePetNote(pet._id))
    }
    setTimeout(() => {
      dispatch({ type: PETNOTE_ADD_RESET })
    }, 2000)
  }

  return (
    <>
      <Col
        className='mx-1 mt-2  fs-3'
        style={{ paddingBottom: '1rem 1rem 0rem 1rem !important' }}
      >
        <Row className='justify-content-center'>
          <Form onSubmit={submitHandler} style={{}}>
            <Form.Control
              className='fs-4 petNoteForm'
              defaultValue={note}
              as='textarea'
              placeholder='Leave a note on this pet if you like'
              onChange={(e) => {
                setNote(e.target.value)
              }}
            />

            {petNoteLoading ? (
              <Button
                className='petNoteSubmitButton'
                variant='warning'
                type='submit'
                key={note}
              >
                Updating ...
              </Button>
            ) : petNoteUpdateSuccess ? (
              <Button
                className='petNoteSubmitButton'
                variant='success'
                type='submit'
                key={note}
              >
                Update Successfull
              </Button>
            ) : (
              <Button
                className='petNoteSubmitButton'
                variant='primary'
                type='submit'
                key={note}
              >
                Submit
              </Button>
            )}
          </Form>
        </Row>
      </Col>
    </>
  )
}

export default PetNode
