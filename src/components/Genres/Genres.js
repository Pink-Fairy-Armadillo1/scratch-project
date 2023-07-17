import { Chip } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';
import './Genres.css'
const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, setPage }) => {
  
  const handleAddGenre = (genre) => {
    if (selectedGenres.find((selected) => selected.mal_id === genre.mal_id)) {
      setSelectedGenres(selectedGenres.filter((selected) => selected.mal_id !== genre.mal_id));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
    setPage(1);
  };

  const handleRemoveGenre = (genre) => {
    // setSelectedGenres(selectedGenres.filter((selected) => selected.mal_id !== genre.mal_id));
    // setGenres((prevGenres) => [...prevGenres.filter((g) => g.mal_id !== genre.mal_id)]);
    // setPage(1);
    setSelectedGenres(selectedGenres.filter((selected) => selected.mal_id !== genre.mal_id));
    // setGenres([...genres, genre]);
    setGenres((prevGenres) => {
      if (!prevGenres.some((g) => g.mal_id === genre.mal_id)) {
        return [...prevGenres, genre];
      }
      return prevGenres;
    });
    setPage(1);
  };

  const fetchGenres = async () => {
    try {
      const { data } = await axios.get(`https://api.jikan.moe/v4/genres/anime`);
      // console.log('genres: ', data)
      setGenres(data.data);
      // console.log('genres: ', data)

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

// console.log('genres from genres: ', genres)
  return (
    <div style={{ padding: "6px 0" }} className='chips'>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 10, backgroundColor: '#83677b', color: 'white'}}
          color="primary"
          key={`s-${genre.mal_id}`}
          label={genre.name}
          size="small"
          clickable
          onClick={() => handleRemoveGenre(genre)}
        />
      ))}
      {genres.map((genre) => (
        <Chip
          style={{ margin: 3, backgroundColor: '#adadad', }}
          key={`a-${genre.mal_id}`}
          label={genre.name}
          size="large"
          clickable
          onClick={() => handleAddGenre(genre)}
        />
      ))}
    </div>
  )
}


export default Genres;

