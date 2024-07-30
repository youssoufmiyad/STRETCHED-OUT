import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import SearchCard from "./SearchCard";
import { useContext } from "react";
import { exercisesContext } from "../App";

const SearchExercises = ({ setExercices, equipment, setEquipment }) => {
	const [search, setSearch] = useState("");
	const [equipments, setEquipments] = useState([]);
	const exercises = useContext(exercisesContext);

	useEffect(() => {
		const fetchExercisesData = async () => {
			const equipmentData = await fetchData(
				"https://exercisedb.p.rapidapi.com/exercises/equipmentList",
				exerciseOptions,
			);
			if (
				equipmentData.message !==
				"You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb"
			) {
				setEquipments(["all", ...equipmentData]);
			}
		};

		fetchExercisesData();
	}, []);

	const handleSearch = async () => {
		if (search) {
			const exerciseData = await fetchData(
				"https://exercisedb.p.rapidapi.com/exercises?limit=10&offset=0",
				exerciseOptions,
			);

			const searchedExercises = exerciseData.filter(
				(item) =>
					item.name.toLowerCase().includes(search) ||
					item.target?.toLowerCase().includes(search) ||
					item.equipment?.toLowerCase().includes(search) ||
					item.bodypart?.toLowerCase().includes(search),
			);

			setSearch("");
			setExercices(searchedExercises);
		}
	};

	return (
		<Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
			<Typography
				fontWeight={700}
				sx={{
					fontSize: { lg: "44px", xs: "30px" },
					fontFamily: "Spartan",
				}}
				mb="50px"
				textAlign="center"
			>
				Exercices
			</Typography>
			<Box position="relative">
				<TextField
					sx={{
						height: "54px",
						width: { lg: "1100px", xs: "280px" },
						input: {
							fontWeight: "700",
							border: "none",
							borderRadius: "4px",
						},
						backgroundColor: "#fff",
						borderRadius: "10px",
					}}
					value={search}
					onChange={(e) => {
						setSearch(e.target.value.toLowerCase());
					}}
					placeholder="Name, bodypart, muscle, etc..."
					type="text"
				/>
				<Button
					className="search-btn"
					sx={{
						bgcolor: "#4682A9",
						color: "#89A5C2",
						textTransform: "none",
						width: { lg: "175px", xs: "80px" },
						fontSize: { lg: "2Opx", xs: "14px" },
						height: "54px",
						position: "relative",
					}}
					onClick={() => handleSearch()}
				>
					Search
				</Button>{" "}
				{exercises[6] ? <SearchCard exercise={exercises[6]} /> : false}
			</Box>

			<Box sx={{ position: "relative", width: "100%", p: "20px" }}>
				<Typography
					fontWeight={700}
					sx={{
						fontSize: { lg: "44px", xs: "30px" },
						fontFamily: "Spartan",
					}}
					mb="50px"
					textAlign="center"
				>
					Pick by equipment needed
				</Typography>
				<HorizontalScrollbar
					data={equipments}
					equipment={equipment}
					setEquipment={setEquipment}
					isEquipment
				/>
			</Box>
		</Stack>
	);
};

export default SearchExercises;
