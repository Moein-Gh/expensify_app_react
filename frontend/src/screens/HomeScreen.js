import React, { useEffect, useState } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Pet from '../components/Pet'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SideBar from '../components/SideBar'
import LocationOptions from '../components/LocationOptions'
import { listPets } from '../actions/petActions'
import CategoryAccordion from '../components/CategoryAccordion'
import Banner from '../components/Banner'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const petList = useSelector((state) => {
    return state.petList
  })
  let { loading, error, pets } = petList

  useSelector((state) => {
    return state.petKeyword
  })

  const [isUnder768, setIsUnder768] = useState(false)

  useEffect(() => {
    if (window.innerWidth >= 768) {
      setIsUnder768(false)
    } else {
      setIsUnder768(true)
    }

    const updateMedia = () => {
      if (window.innerWidth >= 768) {
        setIsUnder768(false)
      } else {
        setIsUnder768(true)
      }
    }
    window.addEventListener('resize', updateMedia)
    return () => window.removeEventListener('resize', updateMedia)
  }, [])

  useEffect(() => {
    dispatch(listPets())
  }, [dispatch])
  return (
    <>
      <Row className='mx-0 mb-4' style={{ padding: '0', margin: '0' }}>
        <Banner style={{ padding: '0', margin: '0' }} />
      </Row>
      <Container>
        <Row>
          {isUnder768 && <CategoryAccordion />}
          <Col md={3}>
            <Row className='mb-2' style={{ margin: '0rem 2rem 1rem 2rem' }}>
              <LocationOptions />
            </Row>
            {!isUnder768 && (
              <Row>
                <SideBar />
              </Row>
            )}
          </Col>

          <Col md={9} className='px-3'>
            <Row className='m-auto titleOfCard'>
              <h3
                className='fs-1 cardTitle'
                style={{
                  width: '100%',
                  borderBottom: '1px solid black ',
                }}
              >
                Latest Pets
              </h3>
            </Row>
            {loading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error}</Message>
            ) : (
              <Row>
                {pets ? (
                  pets.map((pet) => (
                    <Col key={pet._id} sm={6} md={6} lg={6} xl={4}>
                      <Pet pet={pet} />
                    </Col>
                  ))
                ) : (
                  <h2>No Pets Are Available</h2>
                )}
              </Row>
            )}
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default HomeScreen
