import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../utils/fetchData";
import { Stack, Box, Grid } from "@mui/material";
import ProfilBanner from "../components/ProfilBanner";
import RoutineCard from "../components/RoutineCard";

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
			<h1 style={{ fontFamily: "Spartan", marginLeft: "5rem" }}>Routines : </h1>
			<br />
			<Box sx={{ flexGrow: 1 }}>
				<Grid container justifyContent="center" spacing={5}>
					{user
						? user.routine
							? user.routine.map((routine) => {
									return (
										<Grid item>
											<RoutineCard routine={routine} />
											<br />
										</Grid>
									);
							  })
							: null
						: null}
				</Grid>
			</Box>
		</Stack>
	);
};

export default Profil;
