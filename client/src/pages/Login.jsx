import { Label } from '@mui/icons-material'
import { Button, Input, Stack, Link, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'

import show from '../assets/icons/show.png'
import hide from '../assets/icons/hide.png'
import encrypt from '../utils/encrypt'
import { fetchUser } from '../utils/fetchData'

const Login = () => {
    const [users, setUsers] = useState([])

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        fetchUser(setUsers)
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email = " + email + " password = " + password);
        let userExist = false
        let actualUser
        for (let i = 0; i < users.length; i++) {
            console.log(users[i])
            if (users[i].email == email) {
                userExist = true
                actualUser = users[i]
            } else if (users[i].username == email) {
                userExist = true
                actualUser = users[i]
            }
        }
        userExist ? console.log("user exist") : console.log("user doesn't exist")
        if (encrypt(password) == actualUser.password) {
            console.log("correct password")
        } else {
            console.log("incorrect password")
        }
    }

    return (
        <Stack p="64px" sx={{ backgroundColor: "#F6F4EB", width: { lg: "25%", xs: "50%" }, height: "700px", marginLeft: { lg: "40%", xs: "28%" }, marginBottom: { lg: "10%", xs: "20%" }, marginTop: "5%" }}>

            <form>

                <Input type='email' placeholder='type your email' id="email" name="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }} sx={{
                        width: "100%", marginTop: "64px", fontFamily: "Spartan",
                        fontSize: { lg: '3Opx', xs: '24px' },
                    }} />

                <br></br>

                <Stack direction="row">
                    <Input type={showPassword ? "text" : "password"} placeholder='type your password' id="password" name="password"
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }} sx={{
                            width: "100%", marginTop: "64px", fontFamily: "Spartan",
                            fontSize: { lg: '3Opx', xs: '24px' },
                        }} />

                    <Button sx={{ height: "20px", marginTop: "72px" }} onClick={() => { setShowPassword((prev) => !prev) }}><img src={showPassword ? show : hide} /></Button>
                </Stack>

                <Button sx={{
                    marginTop: "212px",
                    bgcolor: '#4682A9',
                    color: '#000',
                    textTransform: 'none',
                    width: "160px",
                    fontWeight: "700",
                    fontFamily: "Spartan",
                    fontSize: { lg: '3Opx', xs: '24px' },
                    height: '54px',
                    width: "100%",
                }}
                    onClick={(e) => {

                        handleSubmit(e);
                    }}>
                    Log In
                </Button>

            </form>

            <Link underline="none" color="ButtonHighlight" style={{ textDecoration: 'none', color: '#000000', fontSize: "12px", fontWeight: "700" }}>
                <Typography>No account ? <a href='signup'>Sign up</a></Typography>
            </Link>

        </Stack>
    )
}

export default Login