import React, { useState, useEffect } from "react";

import { Stack, Typography, TextField, Button } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const TrackingImc = ({user}) => {
	const [startDate, setStartDate] = useState(new Date());
	const [size, setSize] = useState();
	const [weight, setWeight] = useState();


	const [hasRecord, setHasRecord] = useState(false);


	useEffect(() => {
		if (user) {
			HasRecord(startDate);
			console.log(startDate);
		}
	}, [user, startDate]);

	const saveMeasures = async () => {
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				date: startDate.toISOString(),
				size: size,
				weight: weight,
			}),
		};
		const response = await fetch(
			`http://localhost:3000/users/${user._id}/addMeasurements/`,
			requestOptions,
		);
		console.log(response);
		await window.location.reload();
	};

	const HasRecord = (startDate) => {
		let recordFound = false;
		user.measurements.map((m) => {
			const comparisonDate = new Date(m.date);

			console.log(
				`comparisonDate.getFullYear() === startDate.getFullYear() : ${
					comparisonDate.getFullYear() === startDate.getFullYear()
				}`,
			);
			console.log(
				`comparisonDate.getMonth() === startDate.getMonth() : ${
					comparisonDate.getMonth() === startDate.getMonth()
				}`,
			);
			console.log(
				`comparisonDate.getDay() === startDate.getDay() : ${
					comparisonDate.getDay() === startDate.getDay()
				}`,
			);
			console.log(`${comparisonDate.getDay()} ${startDate.getDay()}`);

			if (
				comparisonDate.getFullYear() === startDate.getFullYear() &&
				comparisonDate.getMonth() === startDate.getMonth() &&
				comparisonDate.getDate() === startDate.getDate()
			) {
				recordFound = true;
				setHasRecord(true);
				setSize(m.size);
				setWeight(m.weight);
			}
		});
		if (!recordFound) {
			setHasRecord(false);
		}
	};

	return (
		<Stack sx={{ margin: "2rem" }}>
			<Typography variant="h4" sx={{ fontFamily: "Spartan" }}>
				Evolution :
			</Typography>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
			/>
			<br />
			<TextField
				label="Size (cm)"
				type="number"
				onChange={(e) => {
					setSize(e.target.value);
				}}
				value={size || ""}
				disabled={hasRecord}
				InputProps={{ inputProps: { min: 40, max: 280 } }}
				sx={{ width: "180px", marginRight: "1rem" }}
			/>
			<br />
			<TextField
				label="Weight (kg)"
				type="number"
				onChange={(e) => {
					setWeight(e.target.value);
				}}
				disabled={hasRecord}
				value={weight || ""}
				InputProps={{ inputProps: { min: 40, max: 280 } }}
				sx={{ width: "180px", marginRight: "1rem" }}
			/>
			<br />
			<Button
				variant="contained"
				disabled={hasRecord}
				onClick={async () => {
					await saveMeasures();
				}}
			>
				enregistrer
			</Button>
		</Stack>
	);
};

export default TrackingImc;
