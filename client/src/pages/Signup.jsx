import { Label } from '@mui/icons-material'
import { Button, Input, Stack, Link, Typography } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'

import show from '../assets/icons/show.png'
import hide from '../assets/icons/hide.png'

const USER_REGEX = /^[a-z0-9_-]{3,15}$/
const EMAIL_REGEX = /^[A-z][A-z0-9.-_]+@[A-Za-z0-9.-]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Signup = () => {
    const userRef = useRef();

    const [username, setUsername] = useState('');
    const [validUsername, setValidUsername] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!userRef.current) { return; }
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidUsername(USER_REGEX.test(username));
        console.log(`is ${username} valid: ${validUsername}`)
    }, [username])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
        console.log(`is ${email} valid: ${validEmail}`)
    }, [email])

    useEffect(() => {
        setValidPassword(PWD_REGEX.test(password));
        console.log(`is ${password} valid: ${validPassword}`)
    }, [password])

    useEffect(() => {
        setValidMatch(password == matchPwd);
        console.log(`is ${matchPwd} equal to ${password}: ${validMatch}`)
    }, [matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // if button enabled with JS hack
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        const v3 = USER_REGEX.test(username);
        console.log(`test mail ${v1} test pwd ${v2} test user ${v3}`)
        if (!v1 || !v2 || !validMatch) {
            setErrMsg("Invalid Entry");
            console.log(errMsg)
            return;
        }

        console.log(`user = ${email} pwd = ${password}`)
        console.log("data transmission starts...")

        // When a post request is sent to the create url, we'll add a new account to the database.
        const newPerson = { email: email, username: username, password: password };
        console.log(JSON.stringify(newPerson))
        await fetch(process.env.API_URL, {
            mode: "no-cors",
            cache: "no-cache",
            method: "POST",
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
            });

        setSuccess(true)
        console.log("success : ", success)
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="login">Sign In</a>
                    </p>
                </section>
            ) : (
                <Stack p="64px" sx={{ backgroundColor: "#F6F4EB", width: { lg: "25%", xs: "50%" }, height: "700px", marginLeft: { lg: "40%", xs: "28%" }, marginBottom: { lg: "10%", xs: "20%" }, marginTop: "5%" }}>

                    <form>

                        <Input type={"text"} placeholder='type your username' id="username" name="username"
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }} sx={{
                                width: "100%", marginTop: "64px", fontFamily: "Spartan",
                                fontSize: { lg: '3Opx', xs: '24px' },
                            }} />

                        <Input type='email' placeholder='type your email' id="email" name="email"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }} sx={{
                                width: "100%", marginTop: "64px", fontFamily: "Spartan",
                                fontSize: { lg: '3Opx', xs: '24px' },
                            }} />

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

                        <Input type={showPassword ? "text" : "password"} placeholder='confirm your password' id="password" name="password"
                            onChange={(e) => {
                                setMatchPwd(e.target.value);
                            }} sx={{
                                width: "100%", marginTop: "64px", fontFamily: "Spartan",
                                fontSize: { lg: '3Opx', xs: '24px' },
                            }} />

                        <Button sx={{
                            marginTop: "120px",
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
        </>
    )
}

export default Signup