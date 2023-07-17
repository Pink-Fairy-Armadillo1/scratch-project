import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Content from '../cardContent/Content.js';
// import style from './Trending.scss'
import CustomPagination from './Pagination.js';
import backgroundVid from './assets/pinkpuffy.mp4'

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
      // console.log('data: ', data)
      setContent(data.data);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log('content: ', content[0])
// https://images.fineartamerica.com/images/artworkimages/medium/2/retro-vintage-80s-or-90s-geometric-gorbash-varvara.jpg
  return (
    <div className="trending-container" style={{
      // backgroundImage: `${backgroundVid}`,
      // backgroundImage: `url(${"https://img.recraft.ai/DjMqvwdaRqsUUsqTlNH1dhiAWxvt4eYF_dNBygg4ty0/rs:fit:512:512:0/raw:1/plain/abs://prod/images/4634ec02-c416-4226-854d-a3fb903ac406"})`,
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: 'center center'

    }}>
      <h1 style={{
        display: 'flex',
        flexDirection: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'pink'
      }}>Trending</h1>
      <div className="trending">
        {content.map((a) => {
          return <Content
          key={a.mal_id}
          mal_id={a.mal_id}
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



