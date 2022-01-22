import {
  PETNOTE_ADD_SUCCESS,
  PETNOTE_ADD_FAIL,
  PETNOTE_ADD_REQUEST,
  PETNOTE_ADD_RESET,
  PETNOTE_DELETE_SUCCESS,
  PETNOTE_DELETE_FAIL,
  PETNOTE_DELETE_REQUEST,
  PETNOTE_DELETE_RESET,
  PETNOTE_LIST_SUCCESS,
  PETNOTE_LIST_FAIL,
  PETNOTE_LIST_REQUEST,
} from '../constants/petNoteConstants'

export const petNoteListReducer = (state = { petNotes: [] }, action) => {
  switch (action.type) {
    case PETNOTE_LIST_REQUEST:
      return { loading: true, petNotes: [] }
    case PETNOTE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        petNotes: action.payload,
      }
    case PETNOTE_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petNoteDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PETNOTE_DELETE_REQUEST:
      return { loading: true, ...state }
    case PETNOTE_DELETE_SUCCESS:
      return { loading: false, success: true, payload: action.payload }
    case PETNOTE_DELETE_FAIL:
      return { loading: false, error: action.payload }
    case PETNOTE_DELETE_RESET:
      return {}
    default:
      return state
  }
}

export const petNoteUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PETNOTE_ADD_REQUEST:
      return { loading: true, ...state }
    case PETNOTE_ADD_SUCCESS:
      return { loading: false, success: true }
    case PETNOTE_ADD_RESET:
      return {}
    case PETNOTE_ADD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}
