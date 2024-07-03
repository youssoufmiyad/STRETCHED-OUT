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
		}
	}, [user, startDate]);

	const HasRecord = (startDate) => {
		user.measurements.map((m) => {
			if (m.date === startDate.toISOString()) {
				setHasRecord(true);
				setSize(m.size);
				setWeight(m.weight);
			}
		});
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
			<TextField
				label="Size (cm)"
				type="number"
				onChange={(e) => {
					setSize(e.target.value);
				}}
				defaultValue={size}
				disabled={hasRecord}
				InputProps={{ inputProps: { min: 40, max: 280 } }}
				sx={{ width: "180px", marginRight: "1rem" }}
			/>
			<TextField
				label="Weight (kg)"
				type="number"
				onChange={(e) => {
					setWeight(e.target.value);
				}}
				disabled={hasRecord}
				defaultValue={weight}
				InputProps={{ inputProps: { min: 40, max: 280 } }}
				sx={{ width: "180px", marginRight: "1rem" }}
			/>
		</Stack>
	);
};

export default TrackingImc;
