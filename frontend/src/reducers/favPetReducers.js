import {
  FAVPET_ADD_SUCCESS,
  FAVPET_ADD_FAIL,
  FAVPET_ADD_REQUEST,
  FAVPET_ADD_RESET,
  FAVPET_DELETE_SUCCESS,
  FAVPET_DELETE_FAIL,
  FAVPET_DELETE_REQUEST,
  FAVPET_LIST_SUCCESS,
  FAVPET_LIST_FAIL,
  FAVPET_LIST_REQUEST,
} from '../constants/favPetConstants'

export const favPetListReducer = (state = { favPets: [] }, action) => {
  switch (action.type) {
    case FAVPET_LIST_REQUEST:
      return { loading: true, favPets: [] }
    case FAVPET_LIST_SUCCESS:
      return {
        loading: false,
        success: action.success,
        favPets: action.payload,
      }
    case FAVPET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const favPetDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case FAVPET_DELETE_REQUEST:
      return { loading: true, ...state }
    case FAVPET_DELETE_SUCCESS:
      return { loading: false, success: true, favPets: action.payload }
    case FAVPET_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const favPetAddReducer = (state = {}, action) => {
  switch (action.type) {
    case FAVPET_ADD_REQUEST:
      return { loading: true, ...state }
    case FAVPET_ADD_SUCCESS:
      return { loading: false, success: true, favPets: action.payload }
    case FAVPET_ADD_RESET:
      return {}
    case FAVPET_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
