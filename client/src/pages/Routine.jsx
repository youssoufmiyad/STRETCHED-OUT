import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { fetchUser, getExerciseByName } from "../utils/fetchData";
import { useParams } from "react-router-dom";
import Detail from "../components/Detail";

const Routine = ({ userId }) => {
	const [exercises, setExercises] = useState([]);
	const [user, setUser] = useState();
	const { name } = useParams();

	useEffect(() => {
		fetchUser(userId, setUser);
	}, [userId]);

	useEffect(() => {
		user
			? user.routine.map((routine) => {
					if (routine.name === name) {
						routine.exercises.map(async (exercise) => {
							setExercises([
								...exercises,
								await getExerciseByName(exercise.name),
							]);
						});
					}
			  })
			: null;
	}, [user, name]);

	return (
		<Box>
			{exercises
				? exercises.map((exercise, idx) => {
						return (
							<Detail
								exerciseDetail={exercise[0]}
								flexDirection={idx % 2 === 0 ? "row" : "row-reverse"}
							/>
						);
				  })
				: null}
		</Box>
	);
};

export default Routine;
