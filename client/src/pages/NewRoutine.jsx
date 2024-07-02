import React, { useState, useEffect } from "react";
import { fetchExercise } from "../utils/fetchData";
const params = new URLSearchParams(window.location.search);

const NewRoutine = ({ user }) => {
	const [exercise, setExercise] = useState();

	const [name, setName] = useState("");
	const [sets, setSets] = useState(0);
	const [reps, setReps] = useState(0);

	useEffect(() => {
		const exercise = async () => {
			setExercise(await fetchExercise(params.get("id")));
		};
		exercise();
	}, []);

	useEffect(() => {
		console.log(exercise);
	}, [exercise]);

	const addRoutine = async () => {
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
		<div>
			<form
				onSubmit={() => {
					addRoutine();
				}}
			>
				{exercise ? (
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
							confirm
						</button>
					</>
				) : (
					""
				)}
			</form>
		</div>
	);
};

export default NewRoutine;
