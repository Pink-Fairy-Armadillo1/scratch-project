import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
// import './NavBar.css'; 
import { styled } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme({
  components: {
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: "#ff00e9",
          "&.Mui-selected": {
            color: "#FFF",
            "& .MuiSvgIcon-root": {
              fill: "#FFF",
            },
          },
        },
      },
    },
  },
});

const StyledBottomNavigation = styled(BottomNavigation)(({ theme }) => ({
  width: '100%',
  position: 'fixed',
  bottom: 0,
  zIndex: 100,
  opacity: 0.8,

  backgroundColor: '#2d3a93',

  // '& .Mui-selected': {
  //   color: '#FFF !important',
  //   fill: '#ff00e9 !important',
  // },
  // '& .MuiBottomNavigationAction-root': {
  //   color: '#ff00e9',
  // },
}));


export default function SimpleBottomNavigation() {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  // const classes = useStyles();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    // <Box sx={{

    // }}>
    <ThemeProvider theme={theme}>

        <StyledBottomNavigation
          // className={classes.root}  
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
            <BottomNavigationAction
            label="Trending" 
            icon={<WhatshotIcon />}
            onClick={() => handleNavigation('/trending')}
              />
            <BottomNavigationAction
            label="Search" 
            icon={<SearchIcon />}
            onClick={() => handleNavigation('/search')}
              />
            <BottomNavigationAction
            label="Favorites" 
            icon={<FavoriteIcon />}
            onClick={() => handleNavigation('/favorites')}
              />
            <BottomNavigationAction
            label="Logout" 
            icon={<LogoutIcon />}
            onClick={() => handleNavigation('/login')}
            />
          </StyledBottomNavigation>
          </ThemeProvider>
     
  )
}