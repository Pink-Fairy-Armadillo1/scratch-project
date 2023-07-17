import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Content from '../cardContent/Content.js';
import './Trending.scss'
import Pagination from './Pagination.js';

const Trending = () => {

  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  
  useEffect(() => {
    fetchTrending();
  }, [page]);

  const fetchTrending = async () => {
    try{
      const { data } = await axios.get(`https://api.jikan.moe/v4/top/anime`);
      // what does data look like from backend
      // console.log('data: ', data)
      setContent(data.data);
      setNumOfPages(data.pagination.last_visible_page);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log('content: ', content[0])


  return (
    <div className="trending-container" >
      <h1>All Time Top Rated</h1>
      <div className="trending">
        {content.map((a) => {
          return <Content
          key={a.mal_id}
          mal_id={a.mal_id}
          poster={a.images.jpg.image_url}
          title={a.titles[0].title}
          score={a.score}
          />
        })}
      </div>
    </div>
  );
}

export default Trending



