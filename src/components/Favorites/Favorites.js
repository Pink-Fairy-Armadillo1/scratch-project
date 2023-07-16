import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../cardContent/Content';


const Favorites = () => {
    
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const { data } = await axios.get('/favorites');
        setFavorites(data);
      } catch(err) {
        console.log(err);
      }
    };
    fetchFavorites();
  }, []);




  return (
    <div>
      {favorites.map((a) => {
        <Content
          key={a.anime.mal_id}
          id={a.mal_id}
          poster={a.image}
          title={a.title}
        />
      })}
    </div>
  )
}

export default Favorites;
