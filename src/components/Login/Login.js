import React, { useState } from 'react'
import { Grid, Paper, TextField, Button, Typography, Avatar } from '@mui/material'
// import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate, Link } from 'react-router-dom';
// import axios from 'axios';
import Cookies from 'js-cookie';
import logo from './assets/pink-armadillo'

const Login = () => {
// console.log('hi')
    // const [btnClick, setBtnClick] = useState([])
    // const handleClick = async (e) => {
    //     await(e)
        
    // }
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const location = useLocation();
    // const redirectUrl = location.pathname;



    const handleLogin = async () => {
        // console.log('enteringHandleLogin')
        try {
            const res = await fetch('/login', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password })
            });
            console.log(res);
            if (res.status === 200) {
                const data = await res.json();
                const redirectUrl = data.redirect;
                const token = data.token;
                // console.log(data);
                // const { redirectUrl } = data;
                // console.log('data: ', data)
                // console.log('redirectUrl:', redirectUrl);
                //store authentication token in a cookie
                Cookies.set('authToken', token, { expires: 1 / 24 });
                navigate(redirectUrl); 
                // if (redirectUrl === '/trending') {
                //     // console.log('data: ', data);
                //     navigate(redirectUrl); 
                // } else {
                //     console.log('login failed')
                // }
  
            } else {
                const data = await res.json();
                console.log('login failed')
                const redirectUrl = data.redirect;
                navigate(redirectUrl);
            }
        }
            catch (error) {
              console.error('Error occurred during login:', error);
            }
    }

    
const paperStyle={padding: 20, heigth: '70vh', width: 280, margin: "20px auto"}
// const avatarStyle={backgroundColor: 'green'}
const btnStyle={margin: '8px 0'}
const logoStyle= {margin: '10px 10px'}

// const isLoginPage = window.location.pathname === '/login';
// console.log("hi from the bottom")

  return (
    // <BrowserRouter>
    <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar src={logo} style={logoStyle} size='large'>
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
                     <Link href='/signup' to='/signup'> Sign Up </Link>
                </Typography>  
                {/* )} */}
            </Paper>
        </Grid>
    </div>
   
    
  )
}

export default Login
