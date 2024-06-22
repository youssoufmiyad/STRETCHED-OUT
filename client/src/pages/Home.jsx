import React from 'react'
import { useState, useEffect } from 'react'
import { Box } from '@mui/material'
import HeroBanner from '../components/HeroBanner'
import Exercises from '../components/Exercises'
import SearchExercises from '../components/SearchExercises'

const Home = ({user}) => {
  const [equipement, setEquipment] = useState('all');
  const [exercises, setExercices] = useState([]);

  useEffect(() => {
    console.log(user)
  }, []);

  return (
    <Box>
        <HeroBanner user={user} />
        <SearchExercises 
        setExercices={setExercices}
        equipment={equipement}
        setEquipment={setEquipment}
        />
        <Exercises 
        setExercices={setExercices}
        equipment={equipement}
        exercises={exercises}/>
    </Box>
    
  );
  
}

export default Home