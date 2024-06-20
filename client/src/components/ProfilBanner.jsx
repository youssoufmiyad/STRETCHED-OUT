import React from 'react'
import { Stack, Typography, Box } from '@mui/material'
import Person from '@mui/icons-material/Person'

const ProfilBanner = ({user}) => {
  return (
    <Box
				sx={{
					margin: "5rem",
					display: "flex",
					alignItems: "center",
					// justifyContent: "space-evenly",
				}}
			>
				<Person sx={{ width: 128, height: 128 }} />
				<Stack sx={{ marginLeft: "2rem" }}>
					{user ? (
						<Typography
							sx={{
								textDecoration: "none",
								color: "#000000",
								fontSize: "40px",
								fontFamily: "Spartan",
							}}
						>
							{user.username}
						</Typography>
					) : null}
					{user ? (
						<Typography sx={{ fontSize: "28px", fontFamily: "Sportage" }}>
							{user.email}
						</Typography>
					) : null}
				</Stack>
			</Box>
  )
}

export default ProfilBanner
