import React, { useState } from "react";
import { Stack, Menu, MenuItem, Button, Paper } from "@mui/material";

const AddExercise = ({ id, user }) => {
	const [anchorEl, setAnchorEl] = useState();
	const isOpen = anchorEl ? true : false;
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
				{user.routine.map((routine) => {
					<MenuItem
						sx={{ ":hover": { backgroundColor: "#82B2CB", color: "#fff" } }}
					>
						routine.name
					</MenuItem>;
				})}
				<MenuItem
					sx={{ ":hover": { backgroundColor: "#82B2CB", color: "#fff" } }}
					onClick={newProgram}
				>
					+ Nouveau programme
				</MenuItem>
			</Menu>
		</Stack>
	);
};

export default AddExercise;
