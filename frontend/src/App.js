import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen'
import PetScreen from './screens/PetScreen'
import './App.css'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import PetListScreen from './screens/PetListScreen'
import PetEditScreen from './screens/PetEditScreen'
import CategoryScreen from './screens/CategoryScreen'
import SearchScreen from './screens/SearchScreen'
import LocationScreen from './screens/LocationScreen'

function App() {
  return (
    <Router>
      <Header />
      <main className='pb-3'>
        <div>
          <Routes>
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/pet/:id' element={<PetScreen />} />
            <Route path='/admin/userList' element={<UserListScreen />} />
            <Route path='/admin/petList' element={<PetListScreen />} />
            <Route path='/admin/pet/:id/edit' element={<PetEditScreen />} />
            <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
            <Route path='/category/:category' element={<CategoryScreen />} />
            <Route path='/location/:location' element={<LocationScreen />} />
            <Route path='/search/:keyword' element={<SearchScreen />} />
            <Route path='/:keyword' element={<HomeScreen />} />
            <Route path='/' exact element={<HomeScreen />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </Router>
  )
}

export default App
