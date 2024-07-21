import React, { useContext, useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { Box, Stack, Typography } from "@mui/material";

import ExerciseCard from "./ExerciseCard";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

import { exercisesContext } from "../App";

const Exercises = () => {
	const exercises = useContext(exercisesContext);
	const [equipment, setEquipment] = useState(
		window.location.href
			.substring(window.location.href.lastIndexOf("/") + 2)
			.replace("%20", " "),
	);

	const [currentPage, setCurrentPage] = useState(1);
	const [exercisesPerPage] = useState(10);

	const [displayedExercises, setDisplayedExercises] = useState([]);
	const [currentExercises, setCurrentExercises] = useState([]);

	const indexOfLastExercise = currentPage * exercisesPerPage;
	const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;

	const paginate = (event, value) => {
		setCurrentPage(value);
		window.scrollTo({ top: 1800, behavior: "smooth" });
	};

	useEffect(() => {
		setEquipment(
			window.location.href
				.substring(window.location.href.lastIndexOf("/") + 2)
				.replace("%20", " "),
		);
	}, []);

	useEffect(() => {
		if (
			(equipment === "") |
			(equipment === "all") |
			(equipment === "exercises")
		) {
			setDisplayedExercises(exercises);
		} else {
			exercises.map((exercise) => {
				if (exercise.equipment === equipment) {
					console.log("exercise :");
					console.log(exercise);
					setDisplayedExercises((oldArray) => [...oldArray, exercise]);
				}
			});
		}
	}, [equipment, exercises]);

	useEffect(() => {
		displayedExercises
			? displayedExercises.message ===
			  "You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb"
				? console.log("API expired :(")
				: setCurrentExercises(
						displayedExercises.slice(indexOfFirstExercise, indexOfLastExercise),
				  )
			: false;
	}, [displayedExercises, indexOfFirstExercise, indexOfLastExercise]);

	return (
		<Box id="exercises" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
			<Typography
				variant="h4"
				fontWeight="bold"
				sx={{ fontSize: { lg: "44px", xs: "30px" } }}
				mb="46px"
			>
				Showing Results
			</Typography>
			<Stack
				direction="row"
				sx={{ gap: { lg: "107px", xs: "50px" } }}
				flexWrap="wrap"
				justifyContent="center"
			>
				<ScrollMenu>
					{currentExercises
						? currentExercises.message
							? console.log("API expired :(")
							: currentExercises.map((exercise, idx) => (
									<ExerciseCard exercise={exercise} />
							  ))
						: false}
				</ScrollMenu>
				<Stack>
					<Stack mt="100px" alignItems="center">
						{exercises.length > 9 && (
							<Pagination
								color="standard"
								shape="rounded"
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
	);
};

export default Exercises;
