import {
  FAVPET_ADD_SUCCESS,
  FAVPET_ADD_FAIL,
  FAVPET_ADD_REQUEST,
  FAVPET_DELETE_SUCCESS,
  FAVPET_DELETE_FAIL,
  FAVPET_DELETE_REQUEST,
  FAVPET_LIST_SUCCESS,
  FAVPET_LIST_FAIL,
  FAVPET_LIST_REQUEST,
} from '../constants/favPetConstants'
import axios from 'axios'

export const listfavPets = () => async (dispatch, getState) => {
  try {
    dispatch({ type: FAVPET_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    const { data } = await axios.get(`/api/favpet`, config)
    dispatch({ type: FAVPET_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FAVPET_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addFavPet = (pet_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAVPET_ADD_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }
    const { data } = await axios.post(`/api/favpet/${pet_id}`, {}, config)
    dispatch({ type: FAVPET_ADD_SUCCESS, success: true, payload: data })
  } catch (error) {
    dispatch({
      type: FAVPET_ADD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteFavPet = (pet_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: FAVPET_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    const { data } = await axios.delete(`/api/favpet/${pet_id}`, config)
    dispatch({ type: FAVPET_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FAVPET_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
