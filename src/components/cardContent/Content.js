import React, { useState, useEffect } from 'react'
import './Content.css'
import { IconButton, createTheme } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import red from '@mui/material/colors/red'
// import { createTheme } from '@mui/material';
// import axios from 'axios';
// import Cookies from 'js-cookie';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Content = ({ title, poster, mal_id }) => {
  // const theme = createTheme({
  //   palette: {
  //     primary: red,
  //   }
  // })
  const [favorite, setFavorite] = useState(false);
  // const [likeColor, setLikeColor]= useState(null);
  
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

  // const handleFavorite = async () => {
  //   try {
  //     console.log('click');
  //     if (favorite) {
  //       console.log('in delete favorites');
  //       const res = await fetch('/deleteFavorites', {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({ 
  //           mal_id: mal_id,
  //         }),
  //       });
  //       if (res.status === 200) {
  //         setFavorite(false);
  //       }
  //     } else {
  //       const res = await fetch('/addFavorites', {
  //         method: 'POST',
  //         credentials: 'include',
  //         headers: {
  //           'Content-Type': 'application/json',
  
  //         },
  //         body: JSON.stringify({ 
  //           mal_id: mal_id,
  //           title: title,
  //           image: poster,
  //         }),
  //       });
  //       if (res.status === 200) {
  //         setFavorite(true);
  //       }
  //     }
  //   } catch (err) {
  //     console.log('error adding favorite: ', err);
  //   }
  // };

const handleFavorite = async () => {
  try {
    // const checkFavoriteRes = await fetch('/checkFavorite', {
    //   method: 'POST',
    //   credentials: 'include',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     mal_id: mal_id,
    //   }),
    // });
    // checkFavoriteRes.status === 200
    if (favorite) {
      // const { isFavorite } = await checkFavoriteRes.json();
      // if (isFavorite) {
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
        {favorite ? (
            <FavoriteIcon fontSize='inherit' />
          ) : (
            <FavoriteBorderIcon fontSize='inherit' />
          )}
      </IconButton>
      </div>
    </div>
  )
}

export default Content