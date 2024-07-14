import React from "react";
import { Stack, Typography } from "@mui/material";

const AccountActivation = () => {
	return (
		<div style={{display:"flex", justifyContent:"center", textAlign:"center"}}>
			<Stack
				sx={{ backgroundColor: "#82B2CB", width: "100%", margin:"18rem"}}
			>
        <Typography
					fontWeight="900"
					sx={{ fontSize: "70px", opacity: 0.6, fontFamily: "Spartan" }}
          mt={6}
          mb={12}
				>
					account successfully created ! <br />
				</Typography>

        <Typography
				fontStyle="italic"
				fontSize="22px"
				lineHeight="35px"
				mb={6}
			>
				You can now sign in and use every features of the app. <span style={{fontWeight:"700"}}>ENJOY !</span>
			</Typography>

				
			</Stack>
		</div>
	);
};

export default AccountActivation;
