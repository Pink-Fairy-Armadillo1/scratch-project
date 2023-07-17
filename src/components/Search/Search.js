import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Content from '../cardContent/Content';
import Pagination from '../Trending/Pagination';
import './Search.css';


const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetchSearch();
  }, [page]);

  const handleSearch = () => {
    setPage(1);
    fetchSearch();
  };


  const fetchSearch = async () => {
    try {
      const { data } = await axios.get(
        `https://api.jikan.moe/v4/anime?q=${searchText}&page=${page}`
        
      )
      console.log('data from search: ', data);
      setContent(data.data);
      setNumOfPages(data.pagination.last_visible_page);


    } catch (err) {
      console.log(err);
    }
    // console.log(data);
  };


  return (
    <div className='search-container'>
      <div className='search-bar'>
      <TextField
        id="search-input"
        className="search-input"
        variant="outlined"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        InputLabelProps={{
          className: 'search-label',
        }}
        label="Search"
        InputProps={{
          classes: {
            root: 'search-input-root',
            input: 'search-input-field',
            focused: 'search-input-focused',
          },
        }}
      />
      <Button
      className="search-button"
      sx={{ backgroundColor: "black" }}
      variant="contained"
      onClick={handleSearch}
      >
        <SearchIcon className="search-icon" />
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
      <Pagination setPage={setPage} numOfPages={numOfPages} />
    )}
    </div>
  )
}

export default Search;
