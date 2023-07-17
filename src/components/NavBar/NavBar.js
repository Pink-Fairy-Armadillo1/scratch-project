import { useNavigate } from 'react-router-dom';
import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
// import './NavBar.css'; 
import { styled } from "@mui/system";


const StyledBottomNavigation = styled(BottomNavigation)({
  width: "100%",
  position: "fixed",
  bottom: 0,
  backgroundColor: "#64485c",
  zIndex: 100,
  opacity: 0.8,
});

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  // const classes = useStyles();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    // <Box sx={{

    // }}>
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
         label="favorites" 
         icon={<FavoriteIcon />}
         onClick={() => handleNavigation('/favorites')}
          />
      </StyledBottomNavigation>
    //  </Box>
  )
}