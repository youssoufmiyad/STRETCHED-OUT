import React, { useState, useEffect } from "react";
import { fetchExercise } from "../utils/fetchData";
const params = new URLSearchParams(window.location.search);

const NewRoutine = ({ user }) => {
	const exercise = fetchExercise(params.get("id"));

	useEffect(() => {
		console.log(exercise);
	}, [exercise]);

	console.log(user)

	console.log(params.get("id"));
	console.log(exercise.name);

	const [name, setName] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);

	const addRoutine = async () => {
		console.log(name);
		const routine = user.routine;

		const newRoutine = {
			name: name,
			exercises: [{ name: exercise.name, sets: sets, reps: reps }],
		};
		routine.push(newRoutine);
		const requestOptions = {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				routine: routine,
			}),
		};
		await fetch(`http://localhost:3000/users/${user._id}`, requestOptions);
	};

	return (
		<form
			onSubmit={() => {
				addRoutine();
				console.log("SUBMIIIIT");
			}}
		>
			{exercise.name ? (
				<>
					<label htmlFor="program-name">Name of the routine :</label>
					<br />
					<input
						type="text"
						name="program-name"
						onChange={(e) => setName(e.target.value)}
					/>
					<br />
					<br />
					<label htmlFor="program-exercise">Exercise :</label>
					<br />
					<input type="text" value={exercise.name} disabled />
					<br />
					<br />
					<label htmlFor="program-sets">Number of sets :</label>
					<br />
					<input
						type="number"
						name="program-sets"
						onChange={(e) => setSets(e.target.value)}
					/>
					<br />
					<br />
					<label htmlFor="program-reps">Number of repetition :</label>
					<br />
					<input
						type="number"
						name="program-reps"
						onChange={(e) => setReps(e.target.value)}
					/>
					<br />
					<br />
					<button type="button" onClick={addRoutine} value="submit">
						haha
					</button>
				</>
			) : (
				""
			)}
		</form>
	);
};

export default NewRoutine;
