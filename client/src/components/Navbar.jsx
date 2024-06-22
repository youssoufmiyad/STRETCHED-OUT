import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { Link, useLocation } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import Logo from "../assets/images/Logo.png";

const Navbar = ({ user }) => {
	const url = useLocation().pathname;
	const urlHash = useLocation().hash;

	const [pos, setPos] = useState("");

	useEffect(() => {
		window.addEventListener("scroll", stickNavbar);
		return () => window.removeEventListener("scroll", stickNavbar);
	});

	const stickNavbar = () => {
		window.scrollY > 1 ? setPos("fixed") : setPos("");
	};

	const Disconnect = () => {
		setCookie("stretchedUser", null, { path: "/" });
		window.location.reload();
	};
	return (
		<Stack
			sx={{
				bgcolor: "#82B2CB",
				height: "100px",
				width: "100%",
				position: pos,
				top: "0px",
				left: "0px",
				zIndex: "1",
			}}
		>
			<Stack
				direction="row"
				justifyContent="space-around"
				sx={{
					gap: { sm: "40px", xs: "40px" },
					mt: { sm: "32px", xs: "20px" },
					justifyContent: "none",
				}}
				px="20px"
			>
				<Link to="/">
					<img
						src={Logo}
						alt="logo"
						style={{
							width: "48px",
							height: "48px",
							margin: "0px",
						}}
					/>
				</Link>
				<Stack
					direction="row"
					gap="30px"
					fontFamily="Alegreya"
					fontSize="24px"
					alignItems="center"
				>
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
		</Stack>
	);
};

export default Navbar;
