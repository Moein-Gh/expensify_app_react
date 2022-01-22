import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate, Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Card, Container } from 'react-bootstrap'
import { listPetDetails } from '../actions/petActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import PetNote from '../components/PetNote'

const PetScreen = () => {
  let { id } = useParams()
  const dispatch = useDispatch()
  const petDetails = useSelector((state) => {
    return state.petDetails
  })
  const { loading: loadingPet, error: errorPet, pet } = petDetails

  const userLogin = useSelector((state) => {
    return state.userLogin
  })
  const { error, userInfo } = userLogin

  const [contactInfo, setContactInfo] = useState('')
  const navigate = useNavigate()
  const showPhoneNumber = () => {
    if (!userInfo) {
      navigate('/login')
    } else {
      setContactInfo(pet.ContactNumber)
    }
  }

  useEffect(() => {
    dispatch(listPetDetails(id))
  }, [dispatch, id])

  return (
    <Container>
      {loadingPet ? (
        <Loader />
      ) : errorPet ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row className='my-3'>
          <Col className='petScreenContainer'>
            <Col className=''>
              <Row style={{ margin: '0', padding: '0' }}>
                <Col
                  md={7}
                  lg={8}
                  className=' '
                  style={{
                    textAlign: 'center',
                    color: 'black',
                    padding: '2rem 2rem 0rem 2rem',
                    position: 'relative',
                  }}
                >
                  <Link
                    className='btn btn-warning '
                    to='/'
                    style={{
                      position: 'absolute',
                      top: '3rem',
                      left: '3rem',
                      boxShadow:
                        'rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset',
                    }}
                  >
                    <i className='fas fa-arrow-left'></i>
                  </Link>

                  {/* <Fav pet_id={pet._id} className='noselect' /> */}

                  <Card.Img
                    style={{
                      borderRadius: ' 10px 10px',
                      minHeight: '100%',
                    }}
                    src={pet.image}
                    alt={pet.name}
                  />
                </Col>
                <Col
                  md={5}
                  lg={4}
                  className=' fs-2 text-center petScreenSideBar'
                  style={{ backgroundColor: 'white', color: '#707070' }}
                >
                  <h2 className=' fs-1 petNameText'>{pet.name}</h2>
                  <Row className='petDetailsContainer mb-3'>
                    <Col xs={6}>
                      <Row>
                        <span className='detailText' style={{}}>
                          <strong style={{ color: '#16647C' }}>
                            Location :
                          </strong>{' '}
                          {pet.location}
                        </span>
                      </Row>
                      <Row>
                        <span className='detailText' style={{}}>
                          <strong style={{}}>Breed :</strong> {pet.breed}
                        </span>
                      </Row>
                      <Row>
                        <span className='detailText' style={{}}>
                          <strong style={{}}>Is Vaccinated :</strong>{' '}
                          {pet.isVaccinated ? 'Yes' : 'No'}
                        </span>
                      </Row>
                    </Col>
                    <Col xs={6}>
                      <Row>
                        <span className='detailText' style={{}}>
                          <strong style={{}}>Age :</strong> {pet.age} month(s)
                        </span>
                      </Row>
                      <Row>
                        <span className='detailText' style={{}}>
                          <strong style={{}}>Category :</strong> {pet.category}
                        </span>
                      </Row>
                      <Row>
                        <span className='detailText' style={{}}>
                          <strong style={{}}>Price :</strong> $ {pet.price}
                        </span>
                      </Row>
                    </Col>
                  </Row>
                  <hr className='horizontalLine'></hr>
                  {pet.isAvailable ? (
                    <>
                      <Row>
                        <Col
                          className='fs-2 my-2'
                          style={{
                            color: '#707070',
                            textAlign: 'center',
                          }}
                        >
                          -Available For {pet.forSellOrDonation}-
                        </Col>
                      </Row>
                    </>
                  ) : (
                    <Row>
                      <Col
                        className='fs-3 my-2'
                        style={{
                          color: 'red',
                          textAlign: 'center',
                        }}
                      >
                        -Not Available-
                      </Col>
                    </Row>
                  )}
                  {userInfo ? (
                    <Row>
                      <Col
                        className='p-2 mx-4 '
                        style={{
                          borderRadius: '15px',
                          backgroundColor: '#BE3F3F',

                          color: 'white',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Row
                          onClick={showPhoneNumber}
                          className='justify-content-center contactText'
                        >
                          {contactInfo === ''
                            ? 'Click to see Contact Info'
                            : `For More Info Contact: ${contactInfo}`}
                        </Row>
                      </Col>
                    </Row>
                  ) : (
                    <Row>
                      <Col
                        className='mx-4 p-2'
                        style={{
                          borderRadius: '15px',
                          backgroundColor: '#BE3F3F',
                          color: 'white',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <Row
                          className='justify-content-center contactText'
                          onClick={showPhoneNumber}
                        >
                          {!userInfo && 'Click to see Contact Info'}
                        </Row>
                      </Col>
                    </Row>
                  )}
                  <Row
                    style={{
                      paddingRight: '0 !important',
                      paddingLeft: '0 !important',
                    }}
                  >
                    {userInfo && <PetNote pet_id={pet._id} />}
                  </Row>
                </Col>
              </Row>
              <Row
                style={{
                  margin: '0rem 1rem',
                  padding: '1rem 1rem 1rem 1rem',
                  borderRadius: '10px',
                }}
              >
                <hr className='horizontalLine'></hr>
                <Row className='petDetailsContainer mt-4'>
                  <Col>
                    <span className='petDescriptionText '>
                      <strong>Discription :</strong> {pet.description}
                    </span>
                  </Col>
                </Row>
              </Row>
            </Col>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default PetScreen
