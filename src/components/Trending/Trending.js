import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Content from '../cardContent/Content.js';
import './Trending.css'
import CustomPagination from './Pagination.js';


const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  
  useEffect(() => {
    fetchTrending();
  }, [page]);

  const fetchTrending = async () => {
    try{
      const { data } = await axios.get(`https://api.jikan.moe/v4/top/anime`);
      // what does data look like from backend
      console.log(data)
      setContent(data.data);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div>
      <h1>Top Anime</h1>
      <div className="trending">
        {content.map((a) => {
          return <Content
          key={a.mal_id}
          id={a.mal_id}
          poster={a.images.jpg.image_url}
          title={a.titles[0].title}
          />
        })}
      </div>
        <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending



