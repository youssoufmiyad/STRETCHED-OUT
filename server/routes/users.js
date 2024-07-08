const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { sendConfirmationMail } = require("../models/mail");

// LOGIN
// GET tout les users puis vérifie la présence de celui du req
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// GET spécifique (dans le cas ou on cherche à obtenir les infos d'un user)
router.get("/:id", getUser, async (req, res) => {
	res.json(res.user);
});

// REGISTER
router.post("/", async (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});
	console.log(user.email);
	console.log(user.username);
	console.log(user.password);
	try {
		const newUser = await user.save();
		sendConfirmationMail(user.email)
		res.status(201).json(newUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// CHANGEMENT DE MDP / USERNAME / EMAIL
router.patch("/:id", getUser, async (req, res) => {
	if (req.body.email != null) {
		res.user.email = req.body.email;
	}
	if (req.body.username != null) {
		res.user.username = req.body.username;
	}
	if (req.body.password != null) {
		res.user.password = req.body.password;
	}
	if (req.body.routine != null) {
		res.user.routine = req.body.routine;
	}
	if (req.body.measurements != null) {
		res.user.measurements = req.body.measurements;
	}
	if (req.body.activated != null) {
		res.user.activated = req.body.activated;
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// SUPPRESSION DE COMPTE
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.deleteOne();
		res.json({ message: "Compte supprimé" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/:id/addExerciseToProgram", getUser, async (req, res) => {
	const routineName = req.body.routine;
	const exercise = {
		name: req.body.name,
		sets: req.body.sets,
		reps: req.body.reps,
	};
	let added = false;
	res.user.routine.map((routine) => {
		console.log(`routine name : ${routine.name}`);
		if (routine.name === routineName) {
			routine.exercises.push(exercise);
			console.log(routine);
			added = true;
		}
	});
	if (added) {
		try {
			const updatedUser = await res.user.save();
			return res.json(updatedUser);
		} catch (err) {
			return res.status(500).json({ message: err.message });
		}
	}

	return res.json({ message: `No program named ${routineName}` });
});

router.post("/:id/addMeasurements", getUser, async (req, res) => {
	const measure = {
		date: req.body.date,
		size: req.body.size,
		weight: req.body.weight,
	};
	let dateHasRecord = false;
	res.user.measurements.map((m) => {
		if (m.date === measure.date) {
			m.size = measure.size;
			m.weight = measure.weight;
			dateHasRecord = true;
		}
	});
	if (!dateHasRecord) {
		res.user.measurements.push(measure);
	}

	try {
		await res.user.save();
		return res.status(200).json({ message: "Measure successfully added !" });
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
});

// MIDDLEWARE (permet de confirmer si l'écrit qu'on cherche existe)
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: "Utilisateur introuvable" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.user = user;
	next();
}

module.exports = router;
