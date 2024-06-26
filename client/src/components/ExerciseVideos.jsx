import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import Loader from './Loader'
import ExerciseCard from './ExerciseCard';
import YoutubeWindow from './YoutubeWindow';

const ExerciseVideos = ({ exerciseVideos, name }) => {
    if (!exerciseVideos) {
        return <Loader />;
    }
        return (
            <Box sx={{ mt: { lg: '20px', xs: '20px' } }} p="20px">
                <Typography sx={{ fontSize: { lg: '44px', xs: '25px' } ,fontFamily: "Spartan"}} fontWeight={700} color="#000" mb="33px">
                    Watch <span style={{ color: '#749BC2', textTransform: 'uppercase' }}>{name}</span> tutorials
                </Typography>
                <Stack sx={{flexDirection: { lg: 'row' }, gap: "30px", justifyContent: {lg: "center"} }} justifyContent="flex-start" flexWrap="wrap" alignItems="center">
                    {exerciseVideos.slice(0, 4).map((item) => (
                        <YoutubeWindow videoId={item.video.videoId} />
                    ))}
                </Stack>
            </Box>
        );


};

export default ExerciseVideos;