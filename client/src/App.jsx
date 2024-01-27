import React from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import "./App.css";

import "./assets/fonts/SiegraRegular-qZ465.ttf";
import ExerciseDetail from "./pages/ExerciseDetail";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import { CookiesProvider, useCookies } from "react-cookie";


const App = () => {
	const [cookies, setCookie] = useCookies(["stretched-user"]);

	const handleLogin = (user) => {
		setCookie("stretched-user", user, { path: "/" });
	};

	return (
		<Box width="100%s" m="auto">
			<Navbar user={cookies.user.username}/>
			<Routes>
				{cookies.user ? (
					<Route path="/" element={<Home user={cookies.user.username} />} />
				) : (
					<Route path="/" element={<Home />} />
				)}
				<Route path="/exercise/:id" element={<ExerciseDetail />} />
				<Route path="/login" element={<Login onLogin={handleLogin} />} />
				<Route path="/signup" element={<Signup />} />
			</Routes>
			<Footer />
		</Box>
	);
};

export default App;
