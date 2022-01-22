import express from 'express'
const router = express.Router()
import {
  getPets,
  getPetById,
  deletePet,
  createPet,
  updatePet,
  getPetsByCategory,
  getPetsByLocation,
  searchPets,
} from '../controllers/petController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

//@desc     fetch all pets
//@route    Get /api/pets
//@access   public
router.route('/').get(getPets).post(protect, createPet)
router
  .route('/:id')
  .get(getPetById)
  .delete(protect, admin, deletePet)
  .put(protect, updatePet)

router.route('/category/:category').get(getPetsByCategory)
router.route('/search/:keyword').get(searchPets)
router.route('/location/:location').get(getPetsByLocation)

export default router
