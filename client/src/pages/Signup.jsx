import { useNavigate } from "react-router-dom";
import { Button, TextField, Stack, Link, Typography } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";

import show from "../assets/icons/show.png";
import hide from "../assets/icons/hide.png";
import encrypt from "../utils/encrypt";

const USER_REGEX = /^[a-zA-Z0-9_-]{3,15}$/;
const EMAIL_REGEX = /^[A-z][A-z0-9.-_]+@[A-Za-z0-9.-]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Signup = () => {
	const userRef = useRef();

	const navigate = useNavigate();

	const [username, setUsername] = useState("");
	const [validUsername, setValidUsername] = useState(false);
	const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

	const [email, setEmail] = useState("");
	const [validEmail, setValidEmail] = useState(false);
	const [emailErrorMessage, setEmailErrorMessage] = useState("");

	const [password, setPassword] = useState("");
	const [validPassword, setValidPassword] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [passwordErrorMessage, setPasswordErrorMessage] = useState();

	const [matchPwd, setMatchPwd] = useState("");
	const [validMatch, setValidMatch] = useState(false);
	const [matchPasswordErrorMessage, setMatchPasswordErrorMessage] =
		useState("");

	const [success, setSuccess] = useState(false);

	const POSTREQUEST = async () => {
		const hashPWD = encrypt(password);
		const requestOptions = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				username: username,
				email: email,
				password: hashPWD,
			}),
		};
		const response = await fetch("http://localhost:3000/users", requestOptions);
		return await response.json();
	};

	useEffect(() => {
		if (!userRef.current) {
			return;
		}
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setValidUsername(USER_REGEX.test(username));
		console.log(`is ${username} valid: ${validUsername}`);
	}, [username, validUsername]);

	useEffect(() => {
		setValidEmail(EMAIL_REGEX.test(email));
		console.log(`is ${email} valid: ${validEmail}`);
	}, [email, validEmail]);

	useEffect(() => {
		setValidPassword(PWD_REGEX.test(password));
		console.log(`is ${password} valid: ${validPassword}`);
	}, [password, validPassword]);

	useEffect(() => {
		setValidMatch(password === matchPwd);
		console.log(`is ${matchPwd} equal to ${password}: ${validMatch}`);
	}, [matchPwd, validMatch, password]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		// if button enabled with JS hack
		const v1 = EMAIL_REGEX.test(email);
		const v2 = PWD_REGEX.test(password);
		const v3 = USER_REGEX.test(username);
		console.log(`test mail ${v1} test pwd ${v2} test user ${v3}`);
		if (!v1) {
			setEmailErrorMessage("Invalid mail adress");
			setSuccess(false);
		}
		if (!v2) {
			setPasswordErrorMessage(
				<>
					Invalid password, password has to contain : <br /> - 1 lowercase
					letter
					<br /> - 1 uppercase letter <br /> - 1 special caracter <br /> - 1
					number <br />
					password has to be 8 character minimum
				</>,
			);
			setSuccess(false);
		}
		if (!v3) {
			setUsernameErrorMessage("Invalid username");
			setSuccess(false);
		}
		if (!validMatch) {
			setMatchPasswordErrorMessage("Password doesnt match");
			setSuccess(false);
		}
		if (!success) {
			return;
		}

		console.log(`user = ${email} pwd = ${password}`);
		console.log("data transmission starts...");
		// When a post request is sent to the create url, we'll add a new account to the database.
		POSTREQUEST();
		console.log("request sent");
		navigate("/");
	};

	return (
		<>
			<Stack
				p="64px"
				sx={{
					backgroundColor: "#F6F4EB",
					width: { lg: "25%", xs: "50%" },
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
						type={"text"}
						placeholder="type your username"
						id="username"
						name="username"
						onChange={(e) => {
							setUsername(e.target.value);
						}}
						error={usernameErrorMessage.length > 1 ? true : false}
						helperText={usernameErrorMessage}
						sx={{
							width: "100%",
							marginTop: "64px",
							fontFamily: "Spartan",
							fontSize: { lg: "3Opx", xs: "24px" },
						}}
					/>

					<TextField
						type="email"
						placeholder="type your email"
						id="email"
						name="email"
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						error={emailErrorMessage.length > 1 ? true : false}
						helperText={emailErrorMessage}
						sx={{
							width: "100%",
							marginTop: "64px",
							fontFamily: "Spartan",
							fontSize: { lg: "3Opx", xs: "24px" },
						}}
					/>

					<Stack direction="row">
						<TextField
							type={showPassword ? "text" : "password"}
							placeholder="type your password"
							id="password"
							name="password"
							onChange={(e) => {
								setPassword(e.target.value);
							}}
							error={passwordErrorMessage  ? true : false}
							helperText={passwordErrorMessage}
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

					<TextField
						type={showPassword ? "text" : "password"}
						placeholder="confirm your password"
						id="password"
						name="password"
						onChange={(e) => {
							setMatchPwd(e.target.value);
						}}
						error={matchPasswordErrorMessage.length > 1 ? true : false}
						helperText={matchPasswordErrorMessage}
						sx={{
							width: "100%",
							marginTop: "64px",
							fontFamily: "Spartan",
							fontSize: { lg: "3Opx", xs: "24px" },
						}}
					/>

					<Button
						type="submit"
						sx={{
							marginTop: "120px",
							bgcolor: "#4682A9",
							color: "#000",
							textTransform: "none",
							fontWeight: "700",
							fontFamily: "Spartan",
							fontSize: { lg: "3Opx", xs: "24px" },
							height: "54px",
							width: "100%",
						}}
					>
						Sign up
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
						Already have an account ? <a href="login">Log in</a>
					</Typography>
				</Link>
			</Stack>
		</>
	);
};

export default Signup;
