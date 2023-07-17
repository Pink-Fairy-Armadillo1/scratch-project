import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../cardContent/Content';
import './Favorites.css'

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch('/favorites', {
        credentials: 'include',
      });
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.log('Fetch favorites error:', err);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className='favContainer'>
      {favorites.map((a) => (
        <Content
          key={a.mal_id}
          mal_id={a.mal_id}
          poster={a.item_image}
          title={a.item_title}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flexDirection: 'column',
          }}
        />
      ))}
    </div>
  );
};

export default Favorites;
