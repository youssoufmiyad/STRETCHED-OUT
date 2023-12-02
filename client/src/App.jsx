import React from 'react'
import { Route,Routes } from 'react-router-dom';
import { Box } from '@mui/material';

import './App.css';

import './assets/fonts/SiegraRegular-qZ465.ttf'
import ExerciseDetail from './pages/ExerciseDetail';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Signup from './pages/Signup';

const App = () => {
   return (
    <Box width="100%s" m="auto">
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/exercise/:id' element={<ExerciseDetail/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
        </Routes>
        <Footer/>
    </Box>
  )
}



export default App