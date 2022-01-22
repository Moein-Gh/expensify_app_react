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
  PET_UPDATE_REQUEST,
  PET_UPDATE_SUCCESS,
  PET_UPDATE_FAIL,
  PET_SEARCH_REQUEST,
  PET_SEARCH_SUCCESS,
  PET_SEARCH_FAIL,
  PET_KEYWORD_UPDATE,
} from '../constants/petConstants'
import axios from 'axios'

export const listPets = () => async (dispatch) => {
  try {
    dispatch({ type: PET_LIST_REQUEST })
    const { data } = await axios.get(`/api/pets`)
    dispatch({ type: PET_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateKeyword = (keyword) => async (dispatch, getState) => {
  dispatch({ type: PET_KEYWORD_UPDATE, payload: keyword })
}

export const listPetsByCategory = (categoryObject) => async (dispatch) => {
  try {
    const { category } = categoryObject
    dispatch({ type: PET_LIST_CATEGORY_REQUEST })
    const { data } = await axios.get(`/api/pets/category/${category}`)
    dispatch({ type: PET_LIST_CATEGORY_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_LIST_CATEGORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPetsByLocation = (locationObject) => async (dispatch) => {
  try {
    const { location } = locationObject
    dispatch({ type: PET_LIST_LOCATION_REQUEST })
    const { data } = await axios.get(`/api/pets/location/${location}`)
    dispatch({ type: PET_LIST_LOCATION_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_LIST_LOCATION_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const petSearch = (keywordObject) => async (dispatch) => {
  try {
    const { keyword } = keywordObject
    dispatch({ type: PET_SEARCH_REQUEST })
    const { data } = await axios.get(`/api/pets/search/${keyword}`)
    dispatch({ type: PET_SEARCH_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_SEARCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listPetDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PET_DETAILS_REQUEST })
    const { data } = await axios.get(`/api/pets/${id}`)
    dispatch({ type: PET_DETAILS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deletePet = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PET_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    await axios.delete(`/api/pets/${id}`, config)
    dispatch({ type: PET_DELETE_SUCCESS })
  } catch (error) {
    dispatch({
      type: PET_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createPet = (pet) => async (dispatch, getState) => {
  try {
    dispatch({ type: PET_CREATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    const { data } = await axios.post(`/api/pets`, pet, config)
    dispatch({ type: PET_CREATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updatePet = (pet) => async (dispatch, getState) => {
  try {
    dispatch({ type: PET_UPDATE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/pets/${pet._id}`, pet, config)
    dispatch({ type: PET_UPDATE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PET_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
