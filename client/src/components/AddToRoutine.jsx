import React, { useState, useEffect } from "react";
import { Stack, TextField, Box, Button } from "@mui/material";

const AddToRoutine = ({ user, routine, exercise }) => {
	const [setsNumber, setSetsNumber] = useState(1);
	const [repsNumber, setRepsNumber] = useState(1);
	const addExercise = async (routine) => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				routine: routine,
				name: exercise.name,
				sets: setsNumber,
				reps: repsNumber,
			}),
		};
		const response = await fetch(
			`http://localhost:3000/users/${user._id}/addExerciseToProgram`,
			requestOptions,
		);
		const data = await response.json();
		console.log(data);
		return;
	};
	const handleSubmit = () => {
		addExercise(routine);
	};
	useEffect(() => {
		console.log(repsNumber);
	}, [repsNumber]);
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
					defaultValue={1}
					InputProps={{ inputProps: { min: 1, max: 12 } }}
					type="number"
					label="sets"
					sx={{ width: "128px", marginRight: "20px" }}
					onChange={(e) => {
						setSetsNumber(e.target.value);
					}}
				/>
				<TextField
					defaultValue={1}
					InputProps={{ inputProps: { min: 1, max: 12 } }}
					type="number"
					label="repetitions"
					sx={{ width: "128px" }}
					onChange={(e) => {
						setRepsNumber(e.target.value);
					}}
				/>
			</Box>
			<br />
			<Button
				variant="contained"
				sx={{ width: "20%", position: "relative", left: "40%", top: "20%" }}
				onClick={handleSubmit}
			>
				Confirmer
			</Button>
		</Stack>
	);
};

export default AddToRoutine;
