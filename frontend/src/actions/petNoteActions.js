import {
  PETNOTE_ADD_SUCCESS,
  PETNOTE_ADD_FAIL,
  PETNOTE_ADD_REQUEST,
  PETNOTE_DELETE_SUCCESS,
  PETNOTE_DELETE_FAIL,
  PETNOTE_DELETE_REQUEST,
  PETNOTE_LIST_SUCCESS,
  PETNOTE_LIST_FAIL,
  PETNOTE_LIST_REQUEST,
} from '../constants/petNoteConstants'
import axios from 'axios'

export const listPetNotes = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PETNOTE_LIST_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    const { data } = await axios.get(`/api/petnote`, config)
    dispatch({ type: PETNOTE_LIST_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PETNOTE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const addPetNotes =
  (pet_id, petDetails) => async (dispatch, getState) => {
    try {
      dispatch({ type: PETNOTE_ADD_REQUEST })
      const {
        userLogin: { userInfo },
      } = getState()
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
      await axios.post(`/api/petnote/${pet_id}`, petDetails, config)
      dispatch({ type: PETNOTE_ADD_SUCCESS, success: true })
    } catch (error) {
      dispatch({
        type: PETNOTE_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

export const deletePetNote = (pet_id) => async (dispatch, getState) => {
  try {
    dispatch({ type: PETNOTE_DELETE_REQUEST })
    const {
      userLogin: { userInfo },
    } = getState()
    const config = {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    }
    const { data } = await axios.delete(`/api/petnote/${pet_id}`, config)
    dispatch({ type: PETNOTE_DELETE_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: PETNOTE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
