import React from "react";
import { Stack, TextField, Box, Button } from "@mui/material";

const AddToRoutine = ({ user, routine, exercise }) => {
	const addExercise = (routine) => {};
	return (
		<Stack
			sx={{
				width: "40%",
				height: "40%",
				backgroundColor: "#FFF",
				position: "fixed",
				top: "30%",
				left: "30%",
				textAlign: "center",
			}}
		>
			<br />
			<h1>Ajouter l'exercice à {routine}</h1>
			<br />
			<Box
				sx={{
					display: "flex",
					direction: "row",
					justifyContent: "center",
				}}
			>
				<TextField
					type="number"
					label="sets"
					sx={{ width: "128px", marginRight: "20px" }}
				/>
				<TextField type="number" label="repetitions" sx={{ width: "128px" }} />
			</Box>
            <br />
			<Button variant="contained" sx={{width:"20%", position:"relative",left:"40%", top:"20%"}}>Confirmer</Button>
		</Stack>
	);
};

export default AddToRoutine;
