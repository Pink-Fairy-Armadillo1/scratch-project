import React, { useState, useEffect } from 'react';
import { TextField, Button, InputLabel } from '@mui/material';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Content from '../cardContent/Content';
import Pagination from '../Trending/Pagination';
import './Search.scss';
import Genres from '../Genres/Genres';


const Search = () => {

  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState(0);
  const [content, setContent] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  // const [favorite, setFavorite] = useState(false);


  useEffect(() => {
    fetchSearch();
  }, [page, selectedGenres]);

  const handleSearch = () => {
    setPage(1);
    fetchSearch();
  };


  const fetchSearch = async () => {
    try {
      // console.log('selectedGenres: ', selectedGenres);
      const genreNumbers = selectedGenres.map((genre) => genre.mal_id).join(",");
      
      const { data } = await axios.get(
        // `https://api.jikan.moe/v4/anime?q=${searchText}&page=${page}`
        `https://api.jikan.moe/v4/anime?q=${searchText}&page=${page}&genres=${genreNumbers}`
        
      )
      // console.log('data from search: ', data);
      setContent(data.data);
      setNumOfPages(data.pagination.last_visible_page);


    } catch (err) {
      console.log(err);
    }
    // console.log(data);
  };

  return (
    <div className='search-container'>
      <div className='search-title'>
        <h1>Search</h1>
      </div>
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
      <Genres
        selectedGenres={selectedGenres}
        setSelectedGenres={setSelectedGenres}
        genres={genres}
        setGenres={setGenres}
        setPage={setPage}
      />
    <div className="trending">
      {content.map((a) => (
        <Content
        key={a.mal_id}
        mal_id={a.mal_id}
        poster={a.images.jpg.image_url}
        title={a.titles[0].title}
        score={a.score}
          // onClick={a.handleFavorite}
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
