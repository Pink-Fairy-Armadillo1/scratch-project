import React, { useState } from 'react'
import './Content.css'
import { IconButton, createTheme } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import red from '@mui/material/colors/red'
// import { createTheme } from '@mui/material';
// import axios from 'axios';
// import Cookies from 'js-cookie';




const Content = ({ title, poster, mal_id }) => {
  const theme = createTheme({
    palette: {
      primary: red,
    }
  })
  const [favorite, setFavorite] = useState(false);
  const [likeColor, setLikeColor]= useState(null);
  


  const handleFavorite = async () => {
    try {
      console.log('click');
      console.log('mal_id: ', mal_id);
      const res = await fetch('/addFavorites', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ 
          mal_id: mal_id,
          title: title,
          image: poster,
        }),
      });
      
      if (res.status === 200) {
        setFavorite(true);
      }
    } catch (err) {
      
      console.log('error adding favorite: ', err);
    }
  };



  return (

    <div className="content">
      <img className='poster' src={poster} alt={title} />
      <div className='info'>
        <b className='title'>{title}</b>
      <IconButton
        aria-label="favorite" 
        size='small'
        onClick={handleFavorite}
        >
        <FavoriteBorderIcon fontSize='inherit'/>
      </IconButton>
      </div>
    </div>
  )
}

export default Content