import React from 'react'
import { Box, Stack, Typography, Link } from '@mui/material'
import linkedin from '../assets/icons/linkedin.png'
import github from '../assets/icons/github.png'

const Footer = () => {
  return (
    <Stack gap="40px" alignItems='center' bgcolor={"#82B2CB"} pb="30px">

      <span style={{ color: "#F6F4EB", fontFamily: "Sportage", fontSize: "90px", paddingTop: "24px" }}>STRETCHED OUT ©</span>

      <Stack direction={'row'}>
        <Link href="https://www.linkedin.com/in/miyad-youssouf-ali-1ba879289" underline="none" color="ButtonHighlight" style={{ textDecoration: 'none', color: '#000000', fontSize: "12px", fontWeight: "700" }}>
          <img width={"80px"} height={"80px"} src={linkedin} />
        </Link>

        <Link href="https://github.com/youssoufmiyad" underline="none" color="ButtonHighlight" style={{ textDecoration: 'none', color: '#000000', fontSize: "12px", fontWeight: "700" }}>
          <img width={"80px"} height={"80px"} src={github} />
        </Link>
      </Stack>
    </Stack>
  )
}

export default Footer