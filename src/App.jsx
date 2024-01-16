import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const App = () => {
  console.log("hello")
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Home />}/>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/sign-in' element={<SignIn />}/>
        <Route path='/sign-up' element={<SignUp />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App