import { Chip } from '@mui/material';
import React, { useEffect } from 'react';
import axios from 'axios';
import './Genres.css'
const Genres = ({ selectedGenres, setSelectedGenres, genres, setGenres, setPage }) => {
  
  const handleAddGenre = (genre) => {
    // if (selectedGenres.find((selected) => selected.mal_id === genre.mal_id)) {
    //   setSelectedGenres(selectedGenres.filter((selected) => selected.mal_id !== genre.mal_id));
    // } else {
      setSelectedGenres([...selectedGenres, genre]);
      setGenres(genres.filter((g) => g.mal_id !== genre.id))
    // }
    setPage(1);
  };

  const handleRemoveGenre = (genre) => {

    // setSelectedGenres(selectedGenres.filter((selected) => selected.mal_id !== genre.mal_id));
    // setGenres((prevGenres) => {
    //   if (!prevGenres.some((g) => g.mal_id === genre.mal_id)) {
    //     return [...prevGenres, genre];
    //   }
    //   return prevGenres;
    // });
    setSelectedGenres(
      selectedGenres.filter((selected) => selected.mal_id !== genre.mal_id)
    );
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
      setGenres(data.data);

    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchGenres();
  }, []);

  const filteredGenres = genres.filter((genre) => !selectedGenres.some((selected) => selected.mal_id === genre.mal_id));

// console.log('genres from genres: ', genres)
  return (
    <div style={{ padding: "6px 0" }} className='chips'>
      {selectedGenres.map((genre) => (
        <Chip
          style={{ margin: 10, backgroundColor: '#ff00e9', color: 'white'}}
          color="primary"
          key={`s-${genre.mal_id}`}
          label={genre.name}
          size="small"
          clickable
          onClick={() => handleRemoveGenre(genre)}
        />
      ))}
      {filteredGenres.map((genre) => (
        <Chip
          style={{ margin: 3, backgroundColor: 'white', }}
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

