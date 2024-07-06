import { useNavigate } from "react-router-dom";
import { Button, TextField, Stack, Link, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";

import show from "../assets/icons/show.png";
import hide from "../assets/icons/hide.png";
import encrypt from "../utils/encrypt";
import { fetchUsers } from "../utils/fetchData";

const Login = ({ onLogin }) => {
	const navigate = useNavigate();

	const [users, setUsers] = useState([]);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [errorMessage, setErrorMessage] = useState("");

	useEffect(() => {
		fetchUsers(setUsers);
	});

	useEffect(() => {
		console.log(`email = ${email} password = ${password}`);
	}, [email, password]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let userExist = false;
		let actualUser;
		for (let i = 0; i < users.length; i++) {
			if (users[i].email === email) {
				userExist = true;
				actualUser = users[i];
			} else if (users[i].username === email) {
				userExist = true;
				actualUser = users[i];
			}
		}
		console.log(password);

		if (!actualUser) {
			setErrorMessage("adress or password incorrect");
		} else if (encrypt(password) === actualUser.password) {
			setErrorMessage("");
			onLogin(actualUser);
			navigate("/");
		} else {
			setErrorMessage("adress or password incorrect");
		}
	};

	return (
		<Stack
			p="64px"
			sx={{
				backgroundColor: "#F6F4EB",
				width: { lg: "25%", xs: "50%" },
				height: "700px",
				marginLeft: { lg: "40%", xs: "28%" },
				marginBottom: { lg: "10%", xs: "20%" },
				marginTop: "5%",
			}}
		>
			<form
				onSubmit={(e) => {
					handleSubmit(e);
				}}
			>
				<TextField
					type="email"
					placeholder="type your email"
					id="email"
					name="email"
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					error={errorMessage.length > 0 ? true : false}
					sx={{
						width: "100%",
						marginTop: "64px",
						fontFamily: "Spartan",
						fontSize: { lg: "3Opx", xs: "24px" },
					}}
				/>

				<br />

				<Stack direction="row">
					<TextField
						type={showPassword ? "text" : "password"}
						placeholder="type your password"
						id="password"
						name="password"
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						error={errorMessage.length > 0 ? true : false}
						helperText={errorMessage}
						sx={{
							width: "100%",
							marginTop: "64px",
							fontFamily: "Spartan",
							fontSize: { lg: "3Opx", xs: "24px" },
						}}
					/>

					<Button
						sx={{ height: "20px", marginTop: "72px" }}
						onClick={() => {
							setShowPassword((prev) => !prev);
						}}
					>
						<img
							src={showPassword ? show : hide}
							alt={showPassword ? "show password" : "hide password"}
						/>
					</Button>
				</Stack>

				<Button
					sx={{
						marginTop: "212px",
						bgcolor: "#4682A9",
						color: "#000",
						textTransform: "none",
						fontWeight: "700",
						fontFamily: "Spartan",
						fontSize: { lg: "3Opx", xs: "24px" },
						height: "54px",
						width: "100%",
					}}
					type="submit"
				>
					Log In
				</Button>
			</form>

			<Link
				underline="none"
				color="ButtonHighlight"
				style={{
					textDecoration: "none",
					color: "#000000",
					fontSize: "12px",
					fontWeight: "700",
				}}
			>
				<Typography>
					No account ? <a href="signup">Sign up</a>
				</Typography>
			</Link>
		</Stack>
	);
};

export default Login;
