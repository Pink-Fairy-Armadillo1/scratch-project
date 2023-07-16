import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';
// import { useFormControl } from '@mui/material/FormControl';

import { Grid, Paper, TextField, Button, Avatar } from '@mui/material'

import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    // const location = useLocation();
    // const redirectUrl = location.pathname;
    const handleSignUp = async () =>{
    try{
        const res = await fetch('/signup',
        {
            method: 'POST',
            headers: {
                'Content-Type': 
                'application/json',
            },
            body:JSON.stringify({
                username, password
            })
        });
        if(res.status === 200){
            const data = await res.json();
            const redirectUrl = data.redirect;
            console.log(data);
            navigate(redirectUrl);
        } else{
            console.log('Signup failed')
            const data = await res.json();
            const redirectUrl = data.redirect;
            navigate(redirectUrl);
        }
        


    } catch(err){
        console.error('Error occurred during signup:', err);

    }
}

    
const paperStyle={padding: 20, heigth: '70vh', width: 280, margin: "20px auto"}
const avatarStyle={backgroundColor: 'green'}
const btnStyle={margin: '8px 0'}
  return (
    <div>
        <Grid>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}>
                        <LockIcon/>
                        <h1>Sign Up</h1>
                    </Avatar>
                </Grid>
                <TextField 
                label='Username' 
                placeholder='Enter username' 
                type='username'
                fullWidth 
                required
                onChange={(e) => setUserName(e.target.value)}>   
                </TextField>
                <TextField 
                label='Password' 
                placeholder='Enter Password'
                type='password' 
                fullWidth 
                required
                onChange={(e) => setPassword(e.target.value)}>   
                </TextField>
                <Button 
                type='submit' 
                color='primary' 
                fullWidth 
                variant='contained' 
                style={btnStyle} 
                onClick={handleSignUp}>
                    Sign Up
                    </Button> 
            </Paper>
        </Grid>
    </div>
  )
}

export default SignUp
