import { Label } from '@mui/icons-material'
import { Button, Input, Stack, Link, Typography } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const USER_REGEX = /^[A-z][A-z0-9.-_]+@[A-Za-z0-9.-]{1,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,24}$/;

const Signup = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        if (!userRef.current) { return; }
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
        console.log(`is ${user} valid: ${validName}`)
    }, [user])

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
    }, [user, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if button enabled with JS hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2 || !validMatch) {
            setErrMsg("Invalid Entry");
            return;
        }

        console.log(`user = ${user} pwd = ${password}`)
        console.log("data transmission starts...")

        // When a post request is sent to the create url, we'll add a new account to the database.
        const newPerson = { Username:user,Password:password };
        await fetch("http://localhost:5000/accounts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newPerson),
        })
            .catch(error => {
                window.alert(error);
                return;
            });

        setSuccess(true)
        console.log("success : ",success)
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
                <Stack alignItems="center" mt="37px"
                    justifyContent="center" p="20px">
                    {/* Error */}
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live='assertive'>{errMsg}</p>

                    <Typography bgcolor='#F4C111'><h1>Sign up</h1></Typography>
                    <form method="post" onSubmit={(e) => handleSubmit(e)}>
                        {/* textfield username */}
                        <Label htmlFor="user">user:
                            <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? "hide" : "invalid"} /></Label>
                        <Input
                            type='text'
                            placeholder='type your username'
                            id="user"
                            autoComplete='off'
                            onChange={(e) => setUser(e.target.value)}
                            aria-invalid={validName ? "false" : "true"}
                            aria-describedby='uidnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required />
                        <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            4 to 24 characters.<br />
                            Must be an email
                        </p>

                        <br></br>

                        {/*textfield password */}
                        <Label for="password">password:
                            <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} /></Label>
                        <Input type='password' placeholder='type your password' id="password" name="password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            aria-invalid={!validPassword ? "false" : "true"}
                            aria-describedby='pwdnote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required />
                        <p id='pwdnote' className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include letters (uppercase/lowercase) and a number
                        </p>

                        <br></br>

                        {/* textfield password check */}
                        <Label for="confirmPassword">confirm your password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} /></Label>
                        <Input
                            type='password'
                            placeholder='retype your password'
                            id="confirmPassword"
                            name="confirmPassword"
                            onChange={(e) => {
                                setMatchPwd(e.target.value)
                            }}
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby='confirmPasswordNote'
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                            required />
                        <p id='confirmPasswordNote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Must be the same as the previous input<br />
                        </p>


                        {/* Submit button */}
                        <Button type='submit'
                            disabled={!validName || !validPassword || !validMatch ? true : false}
                            className="search-btn"
                            sx={{
                                bgcolor: '#F4C111',
                                color: '#000',
                                textTransform: 'none',
                                width: { lg: '175px', xs: '80px' },
                                fontSize: { lg: '2Opx', xs: '14px' },
                                height: '54px',
                                position: "absolute",
                            }}
                        >
                            Confirm
                        </Button>

                    </form><Link marginTop="" underline="none" color="ButtonHighlight" style={{ textDecoration: 'none', color: '#000000', fontSize: "12px", fontWeight: "700" }}>
                        <Typography>Already have an account ? <a href='login'>Log in</a></Typography>
                    </Link>

                </Stack >
            )
            }
        </>
    )
}

export default Signup