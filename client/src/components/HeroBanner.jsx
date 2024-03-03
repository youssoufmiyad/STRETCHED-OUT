import React from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import HeroBannerImage from "../assets/images/banner2.jpg";

const HeroBanner = ({ user }) => {
	return (
		<Box position="relative" p="90px">
			{user ? (
				<Typography
					fontWeight="900"
					sx={{ fontSize: "70px", opacity: 0.6, fontFamily: "Spartan" }}
				>
					Hello {user} <br />
				</Typography>
			) : (
				""
			)}

			<Typography
				fontWeight="900"
				sx={{ fontSize: "70px", opacity: 0.6, fontFamily: "Spartan" }}
			>
				Working out, yes <br />
				but{" "}
				<span
					style={{ color: "#F6F4EB", fontFamily: "Sportage", fontSize: "90px" }}
				>
					STRETCHED OUT !
				</span>
			</Typography>

			<Typography
				fontStyle="italic"
				fontSize="22px"
				lineHeight="35px"
				fontWeight="600"
				mb={3}
			>
				All of the most challenging exercices are here waiting for YOU
			</Typography>

			<Button
				variant="outlined"
				sx={{
					width: "500px",
					height: "50px",
					color: "#89A5C2",
					backgroundColor: "#4682A9",
				}}
				href="#exercises"
			>
				Start
			</Button>
			<Stack sx={{ backgroundColor: "#85BDE2" }}>
				<Typography
					fontWeight={900}
					color="#9CCEE7"
					sx={{ fontSize: { lg: "160px", xs: "80px" }, fontFamily: "Siegra" }}
				>
					STRETCHED OUT
				</Typography>
			</Stack>
		</Box>
	);
};

export default HeroBanner;
