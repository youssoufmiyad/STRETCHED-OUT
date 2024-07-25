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
		if (user) {
			const exercises_from_routine = [];
			user.routine.map((routine) => {
				if (routine.name === name) {
					routine.exercises.map(async (exercise) => {
						exercises_from_routine.push(await getExerciseByName(exercise.name));
					});
					setExercises(exercises_from_routine);
				}
			});
		}
	}, [user, name]);

	return (
		<Box>
			{exercises
				? exercises.map((exercise, idx) => {
						console.log(`idx : ${idx}`);
						console.log("EXOOOOOOOOOOOOO : ");
						console.log(exercise);
						return (
							<Detail
								exerciseDetail={!exercise.name ? exercise[0] : exercise}
								flexDirection={idx % 2 === 0 ? "row" : "row-reverse"}
							/>
						);
				  })
				: null}
		</Box>
	);
};

export default Routine;
