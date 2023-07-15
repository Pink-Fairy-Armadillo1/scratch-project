import * as React from 'react'
import { Grid, Paper, Link, TextField, Button, Typography, Avatar} from '@mui/material'
import LockIcon from '@mui/icons-material/Lock';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const Login = () => {
    const handleClick =(e) => {
        
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
                        <h1>Sign In</h1>
                    </Avatar>
                </Grid>
                <TextField label='Username' placeholder='Enter username' 
                fullWidth 
                required>   
                </TextField>
                <TextField label='Password' placeholder='Enter Password'
                type='password' 
                fullWidth 
                required>   
                </TextField>
                <FormControlLabel
                control ={
                    <Checkbox
                    name="checkedB"
                    color="primary"/>
                    
                }
                label="Remember Me"
                />
                <Button type='submit' color='primary' fullWidth variant='contained' style={btnStyle}>Sign In</Button> 
                <Typography>
                     Do you have an account
                     <Link href='#'> Sign Up </Link>
                </Typography>  

            
            </Paper>
        </Grid>
    </div>
  )
}

export default Login
