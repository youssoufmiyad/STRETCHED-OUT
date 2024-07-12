import React, { createContext, useState, useEffect } from "react";
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
import NewRoutine from "./pages/NewRoutine";
import Profil from "./pages/Profil";

import { CookiesProvider, useCookies } from "react-cookie";
import { fetchExercises } from "./utils/fetchData";
import Routine from "./pages/Routine";
import AccountActivation from "./pages/AccountActivation";

export const exercisesContext = createContext();

const App = () => {
	const [cookies, setCookie] = useCookies(["stretchedUser"]);
	const [exercises, setExercises] = useState([]);

	const handleLogin = (user, remembers) => {
		const todayDate = new Date();
		const tommorowDate = new Date();
		tommorowDate.setDate(todayDate.getDate() + 1);

		remembers === true
			? setCookie("stretchedUser", user, { path: "/" })
			: setCookie("stretchedUser", user, { path: "/", expires: tommorowDate });
	};

	const handleDisconnect = () => {
		setCookie("stretchedUser", null, { path: "/" });
	};

	useEffect(() => {
		const fetchExercisesData = async () => {
			const exerciseData = await fetchExercises();
			setExercises(exerciseData);
		};
		fetchExercisesData();
	}, []);

	return (
		<Box width="100%s" m="auto">
			<CookiesProvider>
				<Navbar user={cookies.stretchedUser} onDisconnect={handleDisconnect} />
				<exercisesContext.Provider value={exercises}>
					<Routes>
						<Route path="/" element={<Home user={cookies.stretchedUser} />} />
						<Route
							path="/exercise/:id"
							element={
								<ExerciseDetail
									user={cookies.stretchedUser ? cookies.stretchedUser : null}
								/>
							}
						/>
						<Route
							path="/new-routine"
							element={<NewRoutine user={cookies.stretchedUser} />}
						/>
						<Route
							path="/profil/"
							element={
								<Profil
									userId={
										cookies.stretchedUser ? cookies.stretchedUser._id : null
									}
								/>
							}
						/>
						<Route
							path="/routines/:name"
							element={
								<Routine
									userId={
										cookies.stretchedUser ? cookies.stretchedUser._id : null
									}
								/>
							}
						/>
						<Route path="/login" element={<Login onLogin={handleLogin} />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/confirmation" element={<AccountActivation />} />
					</Routes>
				</exercisesContext.Provider>
			</CookiesProvider>

			<Footer />
		</Box>
	);
};

export default App;
