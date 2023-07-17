import React, { useState, useEffect } from 'react'
import './Content.css'
import { IconButton, createTheme } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import red from '@mui/material/colors/red'
// import { createTheme } from '@mui/material';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Badge from "@mui/material/Badge";




const Content = ({ title, poster, mal_id, score }) => {
  //state for favorite button
  const [favorite, setFavorite] = useState(false);
  
  //Async func to add favorites to database
  const checkFavorite = async () => {
    try {
      const res = await fetch('/checkFavorite', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify({ 
          mal_id: mal_id,
        }),
      });
      if (res.status === 200) {
        const { isFavorite } = await res.json();
        setFavorite(isFavorite);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    checkFavorite();
  }, [mal_id]);


//Button Handler invoking setter func
const handleFavorite = async () => {
  try {
    if (favorite) {
        const deleteFavoriteRes = await fetch('/deleteFavorites', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            mal_id: mal_id,
          }),
        });
        if (deleteFavoriteRes.status === 200) {
          setFavorite(false);
        } 
      } else {
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
                // score: score
              }),
              });
              if (res.status === 200) {
                setFavorite(true);
              } 
      }
    } catch (err) {
      console.error('Error:', err);
  }
}

//Asynchronous wrapper to execute checkFav correctly and then move to handleFav on Click
const wrapperFunc = async () =>{
  await checkFavorite();
  await handleFavorite();
}

//Render Logic
// console.log('from content: ', score);
  return (
    <div className="content">
      <img className="poster" src={poster} alt={title} />
      <div className="info">
        <b className="title">{title}</b>
      </div>
      <div className="badges">
        <Badge
            badgeContent={score}
            color={"primary"}
          />
      </div>
      <div className="button-container">
        
        <IconButton
          aria-label="favorite"
          size="small"
          onClick={wrapperFunc}
          style={{ color: favorite ? 'red' : 'black' }}
        >
          {favorite ? (
            <FavoriteIcon style={{ fontSize: '1.5rem' }} />
          ) : (
            <FavoriteBorderIcon style={{ fontSize: '1.5rem' }} />
          )}
        </IconButton>
      </div>
    </div>
  );
}


export default Content