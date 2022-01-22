import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  petListReducer,
  petListByCategoryReducer,
  petListByLocationReducer,
  petDetailsReducer,
  petDeleteReducer,
  petCreateReducer,
  petUpdateReducer,
  petKeywordReducer,
  petListSearchReducer,
} from './reducers/petReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './reducers/userReducers.js'

import {
  petNoteDeleteReducer,
  petNoteListReducer,
  petNoteUpdateReducer,
} from './reducers/petNoteReducers'

import {
  favPetAddReducer,
  favPetDeleteReducer,
  favPetListReducer,
} from './reducers/favPetReducers'

const reducer = combineReducers({
  petList: petListReducer,
  petListByCategory: petListByCategoryReducer,
  petListByLocation: petListByLocationReducer,
  petDetails: petDetailsReducer,
  petDelete: petDeleteReducer,
  petCreate: petCreateReducer,
  petUpdate: petUpdateReducer,
  petKeyword: petKeywordReducer,
  petListSearch: petListSearchReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  petNoteDelete: petNoteDeleteReducer,
  petNoteList: petNoteListReducer,
  petNoteUpdate: petNoteUpdateReducer,
  favPetAdd: favPetAddReducer,
  favPetList: favPetListReducer,
  favPetDelete: favPetDeleteReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
}
const middleware = [thunk]
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store
