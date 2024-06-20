import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchUser } from "../utils/fetchData";
import { Stack, Typography, Box } from "@mui/material";
import Person from "@mui/icons-material/Person";

const Profil = () => {
	const [user, setUser] = useState();
	const { id } = useParams();

	useEffect(() => {
		fetchUser(id, setUser);
	}, [id]);
	return (
		<Stack>
			<Box>
				<Person sx={{width:64, height:64}}/>
				<Typography
					sx={{
						textDecoration: "none",
						color: "#000000",
						fontSize: "40px",
						fontFamily: "Spartan",
					}}
				>
					{user ? user.username : null}
				</Typography>
			</Box>
		</Stack>
	);
};

export default Profil;
