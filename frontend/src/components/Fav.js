import React, { useEffect, useState } from 'react'
import { Button, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addFavPet, deleteFavPet, listfavPets } from '../actions/FavPetActions'
const Fav = ({ pet_id }) => {
  const dispatch = useDispatch()
  const [fav, setFav] = useState(false)
  const favPetList = useSelector((state) => {
    return state.favPetList
  })
  const { loading, error, favPets } = favPetList

  const checkFav = (pet_id, favPets) => {
    if (favPets) {
      favPets.map((favPet) => {
        if (favPet.pet === pet_id) {
          setFav(true)
          return 1
        }
      })
    } else {
      setFav(false)
    }
  }

  useEffect(() => {}, [])

  const DeleteFromFav = () => {}
  const AddToFav = () => {}

  useEffect(() => {
    dispatch(listfavPets())
  }, [dispatch])

  return (
    <>
      <Col className=' likeIconContainer'>
        {fav ? (
          <i className='fas fa-heart likeIcon' onClick={DeleteFromFav}></i>
        ) : (
          <i className='far fa-heart likeIcon' onClick={AddToFav}></i>
        )}
      </Col>
    </>
  )
}

export default Fav
