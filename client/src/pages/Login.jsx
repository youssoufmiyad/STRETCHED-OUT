import { Label } from '@mui/icons-material'
import { Button, Input, Stack, Link, Typography } from '@mui/material'
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("email = " + email + " password = " + password);
    }

    return (
        <Stack alignItems="center" mt="37px"
        justifyContent="center" p="20px">
            <form>
                <Label for="email">email</Label>
                <Input type='email' placeholder='type your email' id="email" name="email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }} />
                <br></br>
                <Label for="password">password</Label>
                <Input type='password' placeholder='type your password' id="password" name="password"
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }} />
                <Button className="search-btn"
                    sx={{
                        bgcolor: '#F4C111',
                        color: '#000',
                        textTransform: 'none',
                        width: { lg: '175px', xs: '80px' },
                        fontSize: { lg: '2Opx', xs: '14px' },
                        height: '54px',
                        position: "absolute",
                    }}
                    onClick={(e) => {

                        handleSubmit(e);
                    }}>
                    Search
                </Button>
            </form>
            <Link underline="none" color="ButtonHighlight" style={{ textDecoration: 'none', color: '#000000', fontSize: "12px", fontWeight: "700" }}>
        <Typography>No account ? <a href='signup'>Sign up</a></Typography>
        </Link>

        </Stack>
    )
}

export default Login