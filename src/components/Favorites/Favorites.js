import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../cardContent/Content';


const Favorites = () => {
    
  const [favorites, setFavorites] = useState([]);


  const fetchFavorites = async () => {
    try {
      const res = await fetch('/favorites', {
        credentials: 'include',
      });
      const data = await res.json();
      console.log('data in favorites:', data)
      setFavorites(data);
    } catch(err) {
      console.log('Fetch favorites error:', err);
    }
  };


  useEffect(() => {
    fetchFavorites();
  }, []);

console.log('favorites: ', favorites);

  return (
    <div>
      {favorites.map((a) => (
        <Content
          key={a.mal_id}
          mal_id={a.mal_id} 
          poster={a.item_image}
          title={a.item_title}
        />
      ))}
    </div>
  )
}

export default Favorites;
