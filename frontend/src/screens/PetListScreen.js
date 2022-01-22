import React, { useEffect, useState } from 'react'
import { Button, Table, Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { listPets, deletePet } from '../actions/petActions'
import { useNavigate } from 'react-router-dom'
import AddPet from '../components/AddPet.js'
import PetEdit from '../components/PetEdit.js'

export const PetListScreen = () => {
  const dispatch = useDispatch()

  const [showAddPet, setShowAddPet] = useState(false)
  const [showEditPet, setShowEditPet] = useState(false)
  const [pet_id, setPet_id] = useState('')

  const petList = useSelector((state) => state.petList)
  const { loading, error, pets } = petList

  const petDelete = useSelector((state) => state.petDelete)
  const { loading: loadingDelete, error: errorDelete } = petDelete

  const petUpdate = useSelector((state) => state.petUpdate)
  const { success: successUpdate } = petUpdate

  const petCreate = useSelector((state) => state.petCreate)
  const { success: successCreate } = petCreate

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const navigate = useNavigate()
  useEffect(() => {
    if (!userInfo.isAdmin) {
      navigate('/login')
    }

    dispatch(listPets())
  }, [dispatch, userInfo, petDelete, successUpdate, successCreate, navigate])

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePet(id))
    }
  }
  const EditHandler = (pet_id) => {
    setPet_id(pet_id)
    setShowEditPet(true)
  }

  const createPetHandler = () => {
    setShowEditPet(false)
    setShowAddPet(true)
  }
  return (
    <Container>
      <Row className='align-items-center'>
        <Col>
          <h1>Pets</h1>
        </Col>
        <Col style={{ textAlign: 'end' }}>
          <Button className='my-3 btn btn-success' onClick={createPetHandler}>
            <i className='fas fa-plus'></i> Create Pet
          </Button>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : showAddPet ? (
        <AddPet showAddPet={showAddPet} setShowAddPet={setShowAddPet} />
      ) : showEditPet ? (
        <PetEdit
          pet_id={pet_id}
          showEditPet={showEditPet}
          setShowEditPet={setShowEditPet}
        />
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead className='text-center'>
            <tr className='fs-4'>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>S OR D</th>
              <th></th>
            </tr>
          </thead>
          <tbody className='text-center fs-5'>
            {pets.map((pet) => {
              return (
                <tr key={pet._id}>
                  <td>{pet.name}</td>
                  <td>$ {pet.price}</td>
                  <td>{pet.category}</td>
                  <td>{pet.forSellOrDonation}</td>
                  <td>
                    <Button
                      variant='light'
                      className='btn-sm'
                      onClick={() => {
                        EditHandler(pet._id)
                      }}
                    >
                      <i className='fas fa-edit'></i>
                    </Button>

                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => {
                        deleteHandler(pet._id)
                      }}
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default PetListScreen
