import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

import { Stack, Typography, TextField } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchUser } from "../utils/fetchData";

const TrackingImc = () => {
	const [startDate, setStartDate] = useState(new Date());
	const [size, setSize] = useState();
	const [weight, setWeight] = useState();

	const [cookies] = useCookies(["stretchedUser"]);

	const [user, setUser] = useState();
	const [hasRecord, setHasRecord] = useState(false);

	useEffect(() => {
		fetchUser(cookies.stretchedUser._id, setUser);
	}, [cookies]);

	useEffect(() => {
		if (user) {
			HasRecord(startDate);
			console.log(startDate);
		}
	}, [user, startDate]);

	const HasRecord = (startDate) => {
		let recordFound = false
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
				recordFound = true
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
				value={size}
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
				value={weight}
				InputProps={{ inputProps: { min: 40, max: 280 } }}
				sx={{ width: "180px", marginRight: "1rem" }}
			/>
		</Stack>
	);
};

export default TrackingImc;
