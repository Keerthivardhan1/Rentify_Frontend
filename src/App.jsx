
import './App.css'
import FullDetails from './components/FullDetails'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import { Route, Routes } from 'react-router-dom'
import SellerProfile from './components/SellerProfile'


function App() {

  return (
    <>
    <div className='logo'>
      <h2 >Rentify</h2>
      <span>Where Renting Meets Simplicity</span>
    </div>
    <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path='/login' element={<Login/>}/>
        <Route path='/fullDetails' element={<FullDetails/>}/>
        <Route path='/myprofile' element={<SellerProfile/>}/>
      </Routes>
    </>
  )
}

export default App
