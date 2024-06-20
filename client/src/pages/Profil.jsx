import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../utils/fetchData";
import { Stack, Typography, Box, Grid } from "@mui/material";
import ProfilBanner from "../components/ProfilBanner";

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
						? user.routine.length > 0
							? user.routine.map((routine) => {
									return (
										<Grid item>
											<h2>{routine.name}</h2>
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
