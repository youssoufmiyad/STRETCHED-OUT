const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	activated:{
		type: Boolean,
		required: true,
		default : 0,
	},
	routine: [
		{
			name: { type: String },
			exercises: [
				{
					name: { type: String },
					sets: { type: Number },
					reps: { type: Number },
				},
			],
		},
	],
	measurements: [
		{
			date: { type: String },
			size: { type: Number },
			weight: { type: Number },
		},
	],
});

module.exports = mongoose.model("User", userSchema);
