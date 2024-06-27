import React, { useState } from "react";
import { Stack, Menu, MenuItem, Button, Modal } from "@mui/material";
import AddToRoutine from "./AddToRoutine";

const AddExercise = ({ id, user, exercise }) => {
	const [anchorEl, setAnchorEl] = useState();
	const isOpen = anchorEl ? true : false;

	const [selectedRoutine, setSelectedRoutine] = useState();

	const [addToRoutineOpen, setAddToRoutineOpen] = useState(false);
	const handleAddToRoutineOpen = (routine) => {
		setSelectedRoutine(routine);

		setAddToRoutineOpen(true);
	};
	const handleAddToRoutineClose = () => {
		setAddToRoutineOpen(false);
	};

	const test = [
		{ name: "apdf", age: 19 },
		{ name: "daozdko", age: 29 },
	];

	const openDropdown = (e) => {
		setAnchorEl(e.currentTarget);
	};

	const newProgram = () => {
		window.location.href = `../new-routine?id=${id}`;
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	console.log(`USER : ${user}`);
	console.log(user.routine);

	return (
		<Stack>
			<Button
				sx={{
					backgroundColor: "#749BC2",
					":hover": { backgroundColor: "#82B2CB" },
					color: "#fff",
					maxWidth: "600px",
					margin: "15px",
				}}
				onClick={openDropdown}
			>
				Ajouter à un programme
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={isOpen}
				onClose={handleClose}
				slotProps={{
					paper: {
						sx: {
							backgroundColor: "#749BC2",
							width: "600px",
						},
					},
				}}
			>
				{user
					? user.routine.map((routine) => {
							return (
								<MenuItem
									sx={{
										":hover": { backgroundColor: "#82B2CB", color: "#fff" },
									}}
									value={routine.name}
									onClick={() => {
										handleAddToRoutineOpen(routine.name);
									}}
								>
									{routine.name}
								</MenuItem>
							);
					  })
					: null}
				<MenuItem
					sx={{ ":hover": { backgroundColor: "#82B2CB", color: "#fff" } }}
					onClick={newProgram}
				>
					+ Nouveau programme
				</MenuItem>
			</Menu>
			<Modal open={addToRoutineOpen} onClose={handleAddToRoutineClose}>
				<AddToRoutine
					exercise={exercise}
					user={user}
					routine={selectedRoutine}
				/>
			</Modal>
		</Stack>
	);
};

export default AddExercise;
