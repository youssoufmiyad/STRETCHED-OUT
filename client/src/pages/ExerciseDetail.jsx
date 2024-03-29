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
			const exerciseDbUrl = "https://exercisedb.p.rapidapi.com";
			const youtubeSearchUrl =
				"https://youtube-search-and-download.p.rapidapi.com";

			const exerciseDetailData = await fetchData(
				`${exerciseDbUrl}/exercises/exercise/${id}`,
				exerciseOptions,
			);
			setExerciseDetail(exerciseDetailData);
			console.log(exerciseDetail);

			const exerciseVideosData = await fetchData(
				`${youtubeSearchUrl}/search?query=${exerciseDetailData.name} exercise`,
				videoOptions,
			);
			setExerciseVideos(exerciseVideosData.contents);

			const targetMuscleExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`,
				exerciseOptions,
			);
			setTargetMuscleExercises(targetMuscleExercisesData);

			const equimentExercisesData = await fetchData(
				`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`,
				exerciseOptions,
			);
			setEquipmentExercises(equimentExercisesData);
		};
		fetchExercisesData();
	}, [id]);

	console.log(`EQUIPMENT = ${exerciseDetail.equipment}`);
	console.log(`TARGET = ${exerciseDetail.target}`);
	return (
		<Box>
			<Detail exerciseDetail={exerciseDetail} />
			{user ? (
				<AddExercise id={window.location.pathname.split("/").pop()} />
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
