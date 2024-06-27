import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../utils/fetchData";
import { Stack, Typography } from "@mui/material";
import ProfilBanner from "../components/ProfilBanner";
import RoutineGrid from "../components/routineGrid";
import Imc from "../components/Imc";

const Profil = () => {
	const [user, setUser] = useState();
	const { id } = useParams();

	useEffect(() => {
		fetchUser(id, setUser);
	}, [id]);
	return (
		<Stack sx={{ justifyContent: "center" }}>
			<ProfilBanner user={user} />
			<br />
			<Typography variant="h2" sx={{ fontFamily: "Spartan", marginLeft: "5rem" }}>Routines : </Typography>
			<br />
			<RoutineGrid user={user} />
			<br />
			<Typography variant="h2" sx={{ fontFamily: "Spartan", marginLeft: "5rem" }}>IMC : </Typography>
			<br />
			<Imc />
		</Stack>
	);
};

export default Profil;
