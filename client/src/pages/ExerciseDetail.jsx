import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { exerciseOptions, fetchData, videoOptions } from "../utils/fetchData";
import Detail from "../components/Detail";
import ExerciseVideos from "../components/ExerciseVideos";
import SimilarExercises from "../components/SimilarExercises";
import AddExercise from "../components/AddExercise";

const ExerciseDetail = ({ user }) => {
	const [exerciseDetail, setExerciseDetail] = useState({});
	const [exerciseVideos, setExerciseVideos] = useState([]);
	const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
	const [equipmentExercises, setEquipmentExercises] = useState([]);
	const { id } = useParams();

	useEffect(() => {
		const fetchExercisesData = async () => {
			const exerciseDetailData = await fetchData(
				`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
				exerciseOptions,
			);
			setExerciseDetail(exerciseDetailData);
		};
		fetchExercisesData();
	}, [id]);

	useEffect(() => {
		const fetchExercisesData = async () => {
			const exerciseVideosData = await fetchData(
				`https://youtube-search-and-download.p.rapidapi.com/search?query=${exerciseDetail.name} exercise`,
				videoOptions,
			);
			setExerciseVideos(exerciseVideosData.contents);
		};
		fetchExercisesData();
	}, [exerciseDetail]);

	useEffect(() => {
		const fetchExercisesData = async () => {
			const targetMuscleExercisesData = await fetchData(
				`https://exercisedb.p.rapidapi.com/exercises/target/${exerciseDetail.target}`,
				exerciseOptions,
			);
			setTargetMuscleExercises(targetMuscleExercisesData);

			const equimentExercisesData = await fetchData(
				`https://exercisedb.p.rapidapi.com/exercises/equipment/${exerciseDetail.equipment}`,
				exerciseOptions,
			);
			setEquipmentExercises(equimentExercisesData);
		};
		fetchExercisesData();
	}, [exerciseDetail]);

	console.log(`EQUIPMENT = ${exerciseDetail.equipment}`);
	console.log(`TARGET = ${exerciseDetail.target}`);
	return (
		<Box>
			<Detail exerciseDetail={exerciseDetail} />
			{user ? (
				<AddExercise
					id={window.location.pathname.split("/").pop()}
					user={user}
					exercise={exerciseDetail}
				/>
			) : (
				""
			)}

			<ExerciseVideos
				exerciseVideos={exerciseVideos}
				name={exerciseDetail.name}
			/>
			<SimilarExercises
				targetMuscleExercises={targetMuscleExercises}
				equipmentExercises={equipmentExercises}
			/>
		</Box>
	);
};

export default ExerciseDetail;
