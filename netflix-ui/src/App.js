import React from 'react'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Netflix from './pages/Netflix'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Player from './components/Player'
import Movies from './pages/Movies'
import TvShows from './pages/TvShows'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Netflix />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path= "/player" element={<Player />} /> 
        <Route path='/movies' element={<Movies /> } />
        <Route path='/tv' element={<TvShows /> } />
       
      </Routes>

    </BrowserRouter>
  )
}
