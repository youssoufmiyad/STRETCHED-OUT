import React, { useState, useEffect } from "react";
import { Stack, TextField, Typography, Box } from "@mui/material";

const CalculImc = () => {
	const [taille, setTaille] = useState(0);
	const [poids, setPoids] = useState(0);
	const [imc, setImc] = useState(0);
	const [status, setStatus] = useState("");

	useEffect(() => {
		setImc(Math.round(poids / (taille / 100) ** 2));
	}, [poids, taille]);

	useEffect(() => {
		if (imc < 18.5) {
			setStatus("Vous étes en insuffisance pondérale");
		} else if ((imc > 18.5) & (imc < 25)) {
			setStatus("Vous avez une corpulence normale");
		} else if ((imc > 25) & (imc < 30)) {
			setStatus("Vous étes en surpoids");
		} else if ((imc > 30) & (imc < 35)) {
			setStatus("Vous étes obése (obésité modérée)");
		} else if ((imc > 35) & (imc < 40)) {
			setStatus("Vous étes obése (obésité sévère)");
		} else if (imc > 40) {
			setStatus("Vous étes obése (obésité morbide)");
		}
	}, [imc]);
	return (
		<Stack sx={{ margin: "2rem" }}>
			<Typography
				variant="h4"
				sx={{ fontFamily: "Spartan" }}
			>
				Simulation : 
			</Typography>

			<Box sx={{ direction: "row" }}>
				<TextField
					label="Size (cm)"
					type="number"
					onChange={(e) => {
						setTaille(e.target.value);
					}}
					InputProps={{ inputProps: { min: 40, max: 280 } }}
					sx={{ width: "180px", marginRight: "1rem" }}
				/>
				<TextField
					label="weight (kg)"
					type="number"
					onChange={(e) => {
						setPoids(e.target.value);
					}}
					InputProps={{ inputProps: { min: 2 } }}
					sx={{ width: "180px" }}
				/>
			</Box>
			<br />
			<Typography variant="h3" >
				Result :{" "}
			</Typography>
			<br />
			<Typography variant="h4" >
				{imc}
			</Typography>
			<br />
			<Typography variant="h5" >
				{status}
			</Typography>
		</Stack>
	);
};

export default CalculImc;
