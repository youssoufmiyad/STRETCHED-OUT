export const exerciseOptions = {
	method: "GET",

	headers: {
		"x-rapidapi-key": "39205d2aa5msh80055dcae7208e9p1f9a7ajsne3ab0b0410c1",
		"x-rapidapi-host": "exercisedb.p.rapidapi.com",
	},
};

export const videoOptions = {
	method: "GET",

	headers: {
		"X-RapidAPI-Key": "b61dcb1fcemsh017faca0c31d039p19a31ejsnd49fce8802b9",
		"X-RapidAPI-Host": "youtube-search-and-download.p.rapidapi.com",
	},
};

export const fetchData = async (url, options) => {
	try {
		const response = await fetch(url, options);
		const data = await response.json();
		console.log(data);
		return data;
	} catch (error) {
		console.log(error);
	}
};

export const fetchExercise = async (id) => {
	const exerciseDetailData = await fetch(
		`https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
		exerciseOptions,
	);
	const data = await exerciseDetailData.json();
	return data;
};

export const fetchExercises = async () => {
	const exercisesDetailData = await fetch(
		"https://exercisedb.p.rapidapi.com/exercises?limit=1000",
		exerciseOptions,
	);
	const data = await exercisesDetailData.json();
	return data;
};

export const getExerciseByName = async (name) => {
	console.log(`name : ${name}`);
	if (!name.includes("/")) {
		console.log("doesnt include /");
		const exerciseDetailData = await fetch(
			`https://exercisedb.p.rapidapi.com/exercises/name/${name.replace(
				"%20",
				" ",
			)}?offset=0&limit=10`,
			exerciseOptions,
		);
		return await exerciseDetailData.json();
	}
	console.log("includes /");
	const exerciseDetailData = await fetch(
		`https://exercisedb.p.rapidapi.com/exercises/name/${name.split("/")[0]}`,
		exerciseOptions,
	);
	const exercices = await exerciseDetailData.json();
	console.log(exercices);
	for (let i = 0; i < exercices.length; i++) {
		console.log(`exercise name : ${exercices[i].name}, name : ${name}`);
		console.log(exercices[i])
		if (exercices[i].name === name) {
			return exercices[i];
		}
	}
};

export const fetchUser = async (id, setUser) => {
	const response = await fetch(`http://localhost:3000/users/${id}`);
	const userData = await response.json();
	setUser(userData);
};

export const fetchUsers = async (setUsers) => {
	const response = await fetch("http://localhost:3000/users");
	const userData = await response.json();
	setUsers(userData);
};
