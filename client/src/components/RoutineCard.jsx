import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Box } from "@mui/material";

const RoutineCard = ({ routine }) => {
	return (
		<Link className="routine-card" to={`../routines/${routine.name}`}>
			<Box
				sx={{
					border: "4px #000 solid",
					textAlign: "center",
					width: 360,
					height: 360,
				}}
			>
				{/* <img src={exercise.gifUrl} alt={routine.name} loading="lazy" /> */}
				<Typography
					color="#000"
					fontWeight="bold"
					sx={{ fontSize: { lg: "24px", xs: "20px" } }}
					padding="16px"
					textTransform="capitalize"
				>
					{routine.name}
				</Typography>
				<br />
				<ul style={{ padding: "0", margin:"0", listStyleType:"none" }}>
					{routine.exercises.map((exercise) => {
						return (
							<li>
								<Typography
									sx={{ color: "#000" }}
								>{`${exercise.name} : ${exercise.sets}X${exercise.reps} repetitions`}</Typography>
							</li>
						);
					})}
				</ul>
			</Box>
		</Link>
	);
};

export default RoutineCard;
