import React, { useState, useEffect } from "react";
import { fetchUser, getExerciseByName } from "../utils/fetchData";
import { useParams } from "react-router-dom";

const Routine = ({userId}) => {
	const [exercises, setExercises] = useState([]);
	const [user, setUser] = useState();
	const [routine, setRoutine] = useState();
	const { name } = useParams();

	useEffect(() => {
		fetchUser(userId, setUser);
	}, [userId]);

	useEffect(() => {
		user
			? user.routine.map((routine) => {
					if (routine.name === name) {
						setRoutine(routine);
						const funcTest = async (name) => {
							const test = await getExerciseByName(name);
							return test;
						};
						routine.exercises.map(async (exercise) => {
							setExercises([...exercises, await funcTest(exercise.name)]);
						});
					}
			  })
			: null;
	}, [user, name]);

	useEffect(() => {
		console.log(exercises)
	}, [exercises]);

	return <div>{routine ? routine.exercises[0].name : "no routine"}</div>;
};

export default Routine;
