import React, {useState} from "react";
import { Stack, Typography } from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const TrackingImc = () => {
	const [startDate, setStartDate] = useState(new Date());
	return (
		<Stack sx={{ margin: "2rem" }}>
			<Typography variant="h4" sx={{ fontFamily: "Spartan" }}>
				Evolution :
			</Typography>
			<DatePicker
				selected={startDate}
				onChange={(date) => setStartDate(date)}
			/>
		</Stack>
	);
};

export default TrackingImc;
