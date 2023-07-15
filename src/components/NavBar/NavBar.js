import { useNavigate } from 'react-router-dom';
import React from 'react'
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';


export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  }
  return (
    <Box sx={{ width: 500 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
         label="Trending" 
         icon={<WhatshotIcon />}
         onClick={() => handleNavigation('/')}
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
      </BottomNavigation>
    </Box>
  )
}