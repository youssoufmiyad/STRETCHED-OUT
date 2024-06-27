import React, { useState, useEffect } from "react";
import { useCookies, Cookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Navbar = ({user, onDisconnect}) => {
	const url = useLocation().pathname;
	const urlHash = useLocation().hash;
	// const user = useCookies(["stretchedUser"])
	const [pos, setPos] = useState("");
	console.log(user)
	useEffect(() => {
		window.addEventListener("scroll", stickNavbar);
		return () => window.removeEventListener("scroll", stickNavbar);
	});

	const stickNavbar = () => {
		window.scrollY > 1 ? setPos("fixed") : setPos("");
	};

	const Disconnect = () => {
		onDisconnect()
		window.location.reload();
	};
	console.log("NAVBAR USER : ")
	console.log(user)
	return (
		<Stack
			direction="row"
			justifyContent="space-around"
			sx={{
				bgcolor: "#82B2CB",
				height: "100px",
				width: "100%",
				position: pos,
				top: "0px",
				left: "0px",
				zIndex: "1",
				pt: "1rem",
				justifyContent: "space-between",
			}}
			px="20px"
		>
			<Stack
				direction="row"
				gap="3rem"
				fontFamily="Alegreya"
				fontSize="24px"
				alignItems="center"
			>
				<Link to="/">
					<img
						src={Logo}
						alt="logo"
						style={{
							width: "48px",
							height: "48px",
						}}
					/>
				</Link>
				<Link
					to="/#"
					className={
						(url === "/") & (urlHash !== "#exercises") ? "actual-section" : ""
					}
					style={{
						textDecoration: "none",
						color: "#000000",
						fontSize: "40px",
						fontWeight: "700",
						fontFamily: "Spartan",
					}}
					onClick={() => {
						window.scrollTo(0, 0);
					}}
				>
					Home
				</Link>
				<a
					href="/#exercises"
					className={
						(urlHash === "#exercises") & (url === "/") ? "actual-section" : ""
					}
					style={{
						textDecoration: "none",
						color: "#000000",
						fontSize: "30px",
						fontWeight: "700",
						fontFamily: "Spartan",
					}}
				>
					Exercises
				</a>
				{user ? (
					<Link
						to={`/profil/${user._id}`}
						className={
							(url === `/profil/${user._id}`) & (urlHash !== "#exercises")
								? "actual-section"
								: ""
						}
						style={{
							textDecoration: "none",
							color: "#000000",
							fontSize: "30px",
							fontWeight: "700",
							fontFamily: "Spartan",
						}}
					>
						Profile
					</Link>
				) : null}
			</Stack>

			<Stack
				direction="row"
				gap="30px"
				fontFamily="Alegreya"
				fontSize="24px"
				alignItems="center"
			>
				{user === null ? (
					<Link
						to="/login"
						className={url === "/login" ? "actual-section" : ""}
						style={{
							textDecoration: "none",
							color: "#000000",
							fontSize: "30px",
							fontWeight: "700",
							fontFamily: "Spartan",
						}}
					>
						Sign in
					</Link>
				) : (
					<Button
						type="button"
						onClick={Disconnect}
						style={{
							textDecoration: "none",
							color: "#000000",
							fontSize: "30px",
							fontWeight: "700",
							fontFamily: "Spartan",
						}}
					>
						Disconnect
					</Button>
				)}
			</Stack>
		</Stack>
	);
};

export default Navbar;
