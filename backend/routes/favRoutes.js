import express from 'express'
const router = express.Router()
import {
  addToFavourites,
  getAllFavourites,
  deletefromFavourites,
} from '../controllers/favPetController.js'
import { protect } from '../middleware/authMiddleware.js'

//@desc     fetch all pets
//@route    Get /api/pets
//@access   public
router.route('/').get(protect, getAllFavourites)
router
  .route('/:pet_id')
  .post(protect, addToFavourites)
  .delete(protect, deletefromFavourites)

export default router
