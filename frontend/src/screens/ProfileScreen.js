import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Tab,
  Nav,
  Accordion,
  Image,
} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import { listPets } from '../actions/petActions.js'
import {
  deletePetNote,
  deletePetNotes,
  listPetNotes,
} from '../actions/petNoteActions.js'
import AddPet from '../components/AddPet.js'
import Pet from '../components/Pet.js'
import PetHorizontal from '../components/PetHorizontal.js'
import PetEdit from '../components/PetEdit.js'
import EditProfileInfo from '../components/EditProfileInfo.js'
import PetNoteList from '../components/PetNoteList.js'

const ProfileScreen = () => {
  const [showAddPet, setShowAddPet] = useState(false)
  const [showEditPet, setShowEditPet] = useState(false)
  const [editingPetId, setEditingPetId] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const petCreate = useSelector((state) => state.petCreate)
  let { success: successCreate } = petCreate

  const petUpdate = useSelector((state) => {
    return state.petUpdate
  })
  const { success: successUpdate } = petUpdate

  const petDelete = useSelector((state) => {
    return state.petDelete
  })
  const { success: successDelete } = petDelete

  const userDetails = useSelector((state) => {
    return state.userDetails
  })
  const { loading, error } = userDetails

  const userLogin = useSelector((state) => {
    return state.userLogin
  })
  const { userInfo } = userLogin

  const petList = useSelector((state) => {
    return state.petList
  })
  let { pets: allPets } = petList

  useEffect(() => {
    if (!userInfo) {
      navigate('/login')
    } else {
      dispatch(getUserDetails(userInfo._id))

      dispatch(listPets())
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successCreate,
    successUpdate,
    successDelete,
  ])

  const createPetHandler = () => {
    setShowAddPet(true)
  }

  return (
    <Container>
      <Col className='profileContainer'>
        <Row className='p-2'>
          <Tab.Container id='left-tabs-example' defaultActiveKey='My Pets'>
            <Row className='p-3 '>
              <Col sm={3}>
                <Nav variant='pills' className='flex-column'>
                  <Nav.Item>
                    <Nav.Link
                      className='fs-3'
                      eventKey='My Pets'
                      style={{ textAlign: 'center' }}
                    >
                      My Pets
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      className='fs-3'
                      eventKey='MyPetNotes'
                      style={{ textAlign: 'center' }}
                    >
                      My Pet Notes
                    </Nav.Link>
                  </Nav.Item>

                  <Nav.Item>
                    <Nav.Link
                      className='fs-3'
                      eventKey='editProfileInfo'
                      style={{ textAlign: 'center' }}
                    >
                      Edit Profile
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col sm={9}>
                <Tab.Content>
                  <Tab.Pane eventKey='My Pets'>
                    {loading ? (
                      <Loader />
                    ) : error ? (
                      <Message variant='danger'>{error}</Message>
                    ) : (
                      <Row>
                        {showAddPet ? (
                          <Col md={12} lg={12} className='jjj'>
                            <AddPet
                              showAddPet={showAddPet}
                              setShowAddPet={setShowAddPet}
                            />
                          </Col>
                        ) : showEditPet ? (
                          <PetEdit
                            pet_id={editingPetId}
                            showEditPet={showEditPet}
                            setShowEditPet={setShowEditPet}
                          />
                        ) : (
                          <>
                            <Row>
                              <Col style={{ textAlign: 'end' }}>
                                <Button
                                  className='my-3 btn btn-success'
                                  onClick={createPetHandler}
                                >
                                  <i className='fas fa-plus'></i> Create Pet
                                </Button>
                              </Col>
                            </Row>
                            <Row>
                              {allPets.map((pet) => {
                                if (userInfo) {
                                  if (pet.user === userInfo._id) {
                                    return (
                                      <Col
                                        key={pet._id}
                                        sm={12}
                                        md={12}
                                        lg={12}
                                        xl={12}
                                        xs={12}
                                      >
                                        <PetHorizontal
                                          pet={pet}
                                          editingPetId={editingPetId}
                                          setEditingPetId={setEditingPetId}
                                          showEditPet={showEditPet}
                                          setShowEditPet={setShowEditPet}
                                        />
                                      </Col>
                                    )
                                  }
                                }
                              })}
                            </Row>
                          </>
                        )}
                      </Row>
                    )}
                  </Tab.Pane>

                  <Tab.Pane eventKey='MyPetNotes'>
                    <PetNoteList />
                  </Tab.Pane>

                  <Tab.Pane eventKey='editProfileInfo'>
                    <EditProfileInfo />
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </Row>
      </Col>
    </Container>
  )
}

export default ProfileScreen
