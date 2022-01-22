import React, { useEffect, useState } from 'react'
import { Button, Row, Col, Accordion, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { listPets } from '../actions/petActions'
import { deletePetNote, listPetNotes } from '../actions/petNoteActions'
import { getUserDetails } from '../actions/userActions'
import { PETNOTE_DELETE_RESET } from '../constants/petNoteConstants'
import Loader from './Loader'

const PetNoteList = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => {
    return state.userLogin
  })
  const { userInfo } = userLogin

  const userDetails = useSelector((state) => {
    return state.userDetails
  })
  const { loading, error, user } = userDetails

  const petNoteList = useSelector((state) => {
    return state.petNoteList
  })
  const { success: petNoteListSuccess, petNotes } = petNoteList

  const petNoteDelete = useSelector((state) => {
    return state.petNoteDelete
  })
  const { loading: deletePetNoteLoading, success: deletePetNoteSuccess } =
    petNoteDelete

  useEffect(() => {
    dispatch(getUserDetails(userInfo._id))
    dispatch(listPets())
    dispatch(listPetNotes())
    dispatch({ type: PETNOTE_DELETE_RESET })
    console.log('mounted')
  }, [dispatch, userInfo._id, deletePetNoteSuccess])

  const deleteHandler = (pet_id) => {
    dispatch(deletePetNote(pet_id))
  }
  return (
    <Col>
      <h2>My Pet Notes</h2>
      <Accordion defaultActiveKey='0' flush>
        {deletePetNoteLoading ? (
          <Loader />
        ) : petNoteListSuccess && petNotes.length === 0 ? (
          <h2>No Pet Note has been Submitted</h2>
        ) : (
          petNotes.map((item) => (
            <Accordion.Item
              eventKey={item.id}
              key={item.id}
              className='petNoteAccordion'
            >
              <Accordion.Header>
                {item.name}&nbsp;&nbsp;({item.category})
              </Accordion.Header>
              <Accordion.Body>
                <Row
                  style={{
                    borderRadius: '20px',
                    position: 'relative',
                  }}
                >
                  <Col md={4} sm={12} xs={12} className='p-2'>
                    <Image
                      src={item.image}
                      style={{
                        width: '100%',
                        borderRadius: '10px',
                      }}
                    ></Image>
                  </Col>
                  <Col
                    md={8}
                    sm={12}
                    xs={12}
                    className='p-2 fs-3'
                    style={{ color: 'black' }}
                  >
                    <Row>Name : {item.name}</Row>
                    <Row>Category : {item.category}</Row>
                    <Row> Note : {item.note}</Row>
                  </Col>
                  <Button
                    className='btn btn-danger m-auto '
                    style={{
                      width: 'auto',
                      position: 'absolute',
                      top: '1.5rem',
                      right: '1.5rem',
                    }}
                    onClick={() => {
                      deleteHandler(item.id)
                    }}
                  >
                    <i className='fa fa-trash'></i>
                  </Button>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))
        )}
      </Accordion>
    </Col>
  )
}

export default PetNoteList
