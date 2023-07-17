import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../cardContent/Content';
import './Favorites.scss'
import Badge from "@mui/material/Badge";


const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      console.log('hi from fetch favorites')
      const res = await fetch('/favorites', {
        credentials: 'include',
      });
      const data = await res.json();

      // added because we are not passing score to backend,
      const updatedFavorites = await Promise.all(
        data.map(async (a) => {
          const scoreResponse = await fetchWithRateLimit(`https://api.jikan.moe/v4/anime/${a.mal_id}/full`);
          console.log('favorite score:', scoreResponse.data.data.mal_id)
          // const scoreData = await scoreResponse.json();
          const score = scoreResponse.data.data.score;

          return { ...a, score };
        })
      );
      // console.log('data', data)
      console.log('updatedFavorites:', updatedFavorites)
      setFavorites(updatedFavorites);
      // setFavorites(data)
    } catch (err) {
      console.log('Fetch favorites error:', err);
    }
  };

  const fetchWithRateLimit = async (url) => {
    return new Promise((resolve, reject) => {
      setTimeout(async () => {
        try {
          const res = await axios.get(url);
          resolve(res);
        } catch (err) {
          reject(err);
        }
        // based on API rate limit
      }, 1000);
    });
  };


  useEffect(() => {
    fetchFavorites();
  }, []);

  
// console.log('favorites: ', favorites)
  return (
    <div className='favContainer'>
      <h1>Favorites</h1>
      <div className='favContent'>
        <div className="badges">
        
      </div>
        {favorites.map((a) => (
          <Content
            key={a.mal_id}
            mal_id={a.mal_id}
            poster={a.item_image}
            title={a.item_title}
            score={a.score}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
