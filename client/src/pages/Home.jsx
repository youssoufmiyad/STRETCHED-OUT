import React from 'react'
import { useState } from 'react'
import { Box } from '@mui/material'
import HeroBanner from '../components/HeroBanner'
import Exercises from '../components/Exercises'
import SearchExercises from '../components/SearchExercises'

const Home = () => {
  const [equipement, setEquipment] = useState('all');
  const [exercises, setExercices] = useState([]);

  
  return (
    <Box>
        <HeroBanner />
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