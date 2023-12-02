import React, { useEffect, useState } from 'react'
import { Pagination } from '@mui/material'
import { Box, Stack, Typography } from '@mui/material'

import { exerciseOptions, fetchData } from '../utils/fetchData'
import ExerciseCard from './ExerciseCard'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'

const Exercises = ({ exercises, setExercices, equipment }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(10);

  const indexOfLastExercise = currentPage * exercisesPerPage
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage
  const currentExercises = exercises.slice(indexOfFirstExercise,indexOfLastExercise);
  const paginate = (event, value) => {
    setCurrentPage(value)
    window.scrollTo({top: 1800, behavior:"smooth"})
  }

  useEffect(() =>{
    const fetchExercisesData = async () => {
      let exerciseData = [];

      if (equipment === 'all'){
        exerciseData = await fetchData('https://exercisedb.p.rapidapi.com/exercises',
        exerciseOptions)
      }else{
        exerciseData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/equipment/${equipment}`,
        exerciseOptions)
      }

      setExercices(exerciseData)
    }

    fetchExercisesData();
  }, [equipment]);

  return (
    <Box id="exercises"
      sx={{ mt: { lg: '110px' } }}
      mt='50px'
      p='20px'
      
    >
      <Typography variant="h4" fontWeight="bold"
        sx={{ fontSize: { lg: '44px', xs: '30px' } }}
        mb="46px">
        Showing Results
      </Typography>
      <Stack direction="row" sx={{ gap: { lg: '107px', xs: '50px' } }}
        flexWrap="wrap" justifyContent="center">

        <ScrollMenu>
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard key={idx} exercise={exercise} />
        ))}
        </ScrollMenu>
        <Stack>
          <Stack mt="100px" alignItems="center">
            {exercises.length > 9 &&(
              <Pagination
              color='standard'
              shape='rounded'
              defaultPage={1}
              count={Math.ceil(exercises.length / exercisesPerPage)}
              page={currentPage}
              onChange={paginate}
              size="large"
              />
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Exercises