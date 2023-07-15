import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Typography, Avatar, Link} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

const Login = () => {
    // const [btnClick, setBtnClick] = useState([])
    // const handleClick = async (e) => {
    //     await(e)
        
    // }
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleLogin = async () => {
        try {
            const res = await fetch('/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({ username, password })
            });
            console.log(res);
            if (res.status === 200) {
                const data = await res.json();
                const redirectUrl = data.redirect;
                console.log('data: ', data)
                if (redirectUrl === '/trending') {
                    // console.log('data: ', data);
                    navigate(redirectUrl); 
                } else {
                    console.log('login failed')
                }
  
            } else {
                console.log('login failed')
            }
        }
            catch (error) {
              console.error('Error occurred during login:', error);
            }
    }

    
const paperStyle={padding: 20, heigth: '70vh', width: 280, margin: "20px auto"}
const avatarStyle={backgroundColor: 'green'}
const btnStyle={margin: '8px 0'}

// const isLoginPage = window.location.pathname === '/login';

  return (
    <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockIcon/>
                        <h1>Sign In</h1>
                    </Avatar>
                </Grid>
                <TextField 
                label='Username' 
                placeholder='Enter username' 
                fullWidth 
                required
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                />   
                
                <TextField 
                label='Password' 
                placeholder='Enter Password'
                type='password' 
                fullWidth 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />   
                <FormControlLabel
                control ={
                    <Checkbox
                    name="checkedB"
                    color="primary"/>
                    
                }
                label="Remember Me"
                />
                <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle} onClick={handleLogin}>Sign In</Button> 
                {/* {!isLoginPage && ( */}
                <Typography>
                     Do you have an account
                     <Link href='/signup' to={redirectUrl}> Sign Up </Link>
                </Typography>  
                {/* )} */}

            
            </Paper>
        </Grid>
    </div>
  )
}

export default Login
