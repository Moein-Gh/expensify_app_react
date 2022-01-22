import {
  PET_LIST_REQUEST,
  PET_LIST_SUCCESS,
  PET_LIST_FAIL,
  PET_LIST_CATEGORY_REQUEST,
  PET_LIST_CATEGORY_SUCCESS,
  PET_LIST_CATEGORY_FAIL,
  PET_LIST_LOCATION_REQUEST,
  PET_LIST_LOCATION_SUCCESS,
  PET_LIST_LOCATION_FAIL,
  PET_DETAILS_REQUEST,
  PET_DETAILS_SUCCESS,
  PET_DETAILS_FAIL,
  PET_DELETE_REQUEST,
  PET_DELETE_SUCCESS,
  PET_DELETE_FAIL,
  PET_CREATE_REQUEST,
  PET_CREATE_SUCCESS,
  PET_CREATE_FAIL,
  PET_CREATE_RESET,
  PET_UPDATE_REQUEST,
  PET_UPDATE_SUCCESS,
  PET_UPDATE_FAIL,
  PET_UPDATE_RESET,
  PET_SEARCH_REQUEST,
  PET_SEARCH_SUCCESS,
  PET_SEARCH_FAIL,
  PET_KEYWORD_UPDATE,
  PET_KEYWORD_RESET,
} from '../constants/petConstants'

export const petListReducer = (state = { pets: [] }, action) => {
  switch (action.type) {
    case PET_LIST_REQUEST:
      return { loading: true, pets: [] }
    case PET_LIST_SUCCESS:
      return { loading: false, success: true, pets: action.payload }
    case PET_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petListByCategoryReducer = (state = { pets: [] }, action) => {
  switch (action.type) {
    case PET_LIST_CATEGORY_REQUEST:
      return { loading: true, pets: [] }
    case PET_LIST_CATEGORY_SUCCESS:
      return { loading: false, pets: action.payload }
    case PET_LIST_CATEGORY_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petListByLocationReducer = (state = { pets: [] }, action) => {
  switch (action.type) {
    case PET_LIST_LOCATION_REQUEST:
      return { loading: true, pets: [] }
    case PET_LIST_LOCATION_SUCCESS:
      return { loading: false, pets: action.payload }
    case PET_LIST_LOCATION_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petListSearchReducer = (state = { pets: [] }, action) => {
  switch (action.type) {
    case PET_SEARCH_REQUEST:
      return { loading: true, pets: [] }
    case PET_SEARCH_SUCCESS:
      return { loading: false, pets: action.payload }
    case PET_SEARCH_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petDetailsReducer = (state = { pet: { reviews: [] } }, action) => {
  switch (action.type) {
    case PET_DETAILS_REQUEST:
      return { loading: true, ...state }
    case PET_DETAILS_SUCCESS:
      return { loading: false, success: true, pet: action.payload }
    case PET_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PET_DELETE_REQUEST:
      return { loading: true, ...state }
    case PET_DELETE_SUCCESS:
      return { loading: false, success: true }
    case PET_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const petCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PET_CREATE_REQUEST:
      return { loading: true, ...state }
    case PET_CREATE_SUCCESS:
      return { loading: false, success: true, pet: action.payload }
    case PET_CREATE_FAIL:
      return { loading: false, error: action.payload }
    case PET_CREATE_RESET:
      return {}
    default:
      return state
  }
}

export const petUpdateReducer = (state = { pet: {} }, action) => {
  switch (action.type) {
    case PET_UPDATE_REQUEST:
      return { loading: true, ...state }
    case PET_UPDATE_SUCCESS:
      return { loading: false, success: true, pet: action.payload }
    case PET_UPDATE_FAIL:
      return { loading: false, error: action.payload }
    case PET_UPDATE_RESET:
      return { pet: {} }
    default:
      return state
  }
}

export const petKeywordReducer = (state = { keyword: {} }, action) => {
  switch (action.type) {
    case PET_KEYWORD_UPDATE:
      return { keyword: action.payload }
    case PET_KEYWORD_RESET:
      return { keyword: {} }
    default:
      return state
  }
}
