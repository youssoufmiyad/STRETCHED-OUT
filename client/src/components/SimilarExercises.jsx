import React from 'react'
import { Box, Stack, Typography } from '@mui/material'

import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  return (
    <Box sx={{ mt: { lg: "100px", xs: "0" } }}>
      <Typography variant='h3' mb={3} fontFamily="Spartan" >Exercises with the same goal</Typography>
      <Stack direction={"row"} sx={{ p: '2', position: 'relative' }}>
        {targetMuscleExercises ?
          <HorizontalScrollbar data={targetMuscleExercises} />
          : <Loader />}
      </Stack>
      <Typography variant='h3' mb={3} fontFamily="Spartan">Exercises possible with the same equipment</Typography>
      <Stack direction={"row"} sx={{ p: '2', position: 'relative' }}>
        {equipmentExercises ?
          <HorizontalScrollbar data={equipmentExercises} />
          : <Loader />}
      </Stack>
    </Box>
  )
}

export default SimilarExercises