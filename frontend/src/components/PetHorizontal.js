import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deletePet } from '../actions/petActions'

const PetHorizontal = ({ pet, setEditingPetId, setShowEditPet }) => {
  const dispatch = useDispatch()
  const deleteHandler = (pet_id) => {
    if (window.confirm('Are you sure?')) {
      dispatch(deletePet(pet_id))
    }
  }
  return (
    <article className='petCard light green'>
      <a className='petCard__img_link' href={`/pet/${pet._id}`}>
        <img className='petCard__img' src={pet.image} alt={pet.name} />
      </a>
      <div className='petCard__text t-dark'>
        <Row style={{ position: 'absolute', right: '3rem' }}>
          <Col xs={6} className='petcardbuttonContainer'>
            <Button
              variant='info'
              className='btn-sm petcardbutton'
              onClick={() => {
                setEditingPetId(pet._id)
                console.log(pet._id)
                setShowEditPet(true)
              }}
            >
              <i className='fas fa-edit'></i>
            </Button>
          </Col>
          <Col xs={6} className='petcardbuttonContainer'>
            <Button
              variant='danger'
              className='btn-sm petcardbutton'
              onClick={() => {
                deleteHandler(pet._id)
              }}
            >
              <i className='fas fa-trash'></i>
            </Button>
          </Col>
        </Row>
        <h1 className='petCard__title green'>
          <a href={`/pet/${pet._id}`}>{pet.name}</a>
        </h1>
        <div className='petCard__subtitle small'>
          <time dateTime='2020-05-25 '>
            <i className='fas fa-calendar-alt mr-2'></i>
            &nbsp;{pet.createdAt.split('T')[0]}
          </time>
        </div>
        <div className='petCard__bar'></div>
        <div className='petCard__description'>{pet.description}</div>
        <ul className='petCard__tagbox'>
          <li className='tag__item'>
            <i className='fas fa-tags mr-2'></i> &nbsp;{pet.category}
          </li>
          <li className='tag__item'>
            <i className='fas fa-calendar-alt mr-2'></i>
            &nbsp;{pet.age}&nbsp;Months Old
          </li>
          {pet.forSellOrDonation === 'sell' ? (
            <li className='tag__item'>
              <i className='fas fa-money-bill-alt mr-2'></i>
              &nbsp;{`$${pet.price}`}
            </li>
          ) : (
            pet.forSellOrDonation === 'donation' && (
              <li className='tag__item'>
                <i className='fas fa-handshake mr-2'></i>
                &nbsp;For Donation
              </li>
            )
          )}
        </ul>
      </div>
    </article>
  )
}

export default PetHorizontal
