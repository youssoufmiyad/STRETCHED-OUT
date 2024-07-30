import React from "react";
import { Box,  Typography } from "@mui/material";

const SearchCard = ({ exercise }) => {
	console.log(exercise);
	return (
		<Box
			sx={{
                position:"relative",
                width:"100%",
				paddingTop: 2,
				paddingBottom: 2,
				backgroundColor: "#85BDE2",
				display: "flex",
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<img src={exercise.gifUrl} alt="Exercise gif" className="search-card-img" />
			
			<a href={`../exercise/${exercise.id}`}>
				<Typography
					color="#000"
					fontWeight="bold"
					sx={{ fontSize: { lg: "24px", xs: "20px" }, marginLeft:"16px" }}
					textTransform="capitalize"
				>
					{exercise.name.length > 15
						? `${exercise.name.substring(0, 15)}...`
						: exercise.name}
				</Typography>
			</a>
		</Box>
	);
};

export default SearchCard;
