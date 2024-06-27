import React from "react";
import { Box, Grid } from "@mui/material";
import RoutineCard from "./RoutineCard";

const RoutineGrid = ({ user }) => {
	return (
		<Box sx={{ flexGrow: 1, margin: "2rem" }}>
			<Grid container spacing={5}>
				{user
					? user.routine
						? user.routine.map((routine) => {
								return (
									<Grid item>
										<RoutineCard routine={routine} />
										<br />
									</Grid>
								);
						  })
						: null
					: null}
			</Grid>
		</Box>
	);
};

export default RoutineGrid;
