import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Content from '../cardContent/Content';
import Pagination from '../Trending/Pagination';

const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [page, setpage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [content, setContent] = useState([]);


  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchText}&page=${page}`
        
      )
      console.log('data: ', data);
      setContent(data.data);
      setNumOfPages(data);


    } catch (err) {
      console.log(err);
    }
    // console.log(data);
  };

  useEffect(() => {
    fetchSearch();
  }, [page]);

  const handleSearch = () => {
    setpage(1);
    fetchSearch();
  }


  return (
    <div>
      <div>
      <TextField
        className="searchBar"
        label="Search"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}

      />
      <Button
      variant="contained"
      onClick={handleSearch}
      >
        <SearchIcon />
      </Button>
      </div>
      <div className="trending">
      {content.map((a) => (
        <Content
          key={a.mal_id}
          id={a.mal_id}
          poster={a.images.jpg.image_url}
          title={a.titles[0].title}
        />
      ))}
      {content.length === 0 && <h2>No Anime Found</h2>}
    </div>
    {numOfPages > 1 && (
      <Pagination setPage={setPage} numofPages={numOfPages} />
    )}
    </div>
  )
}

export default Search;
