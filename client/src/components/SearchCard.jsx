import React from "react";
import { Box, Stack, Typography } from "@mui/material";

const SearchCard = ({exercise}) => {
    console.log(exercise)
	return <Box sx={{width: { lg: "1100px", xs: "280px" },padding:2,backgroundColor: "#85BDE2", display: "flex",flexDirection: "row",alignItems: "center",justifyContent: "center"}}>
        <img width={64} height={64} src={exercise.gifUrl} alt="Exercise gif" />
        <br />
        <a href={`../exercise/${exercise.id}`}>
        {exercise.name.length > 15 ? `${exercise.name.substring(0, 15)}...` : exercise.name}</a>
    </Box>;
};

export default SearchCard;
