import React, { useState, useEffect } from 'react';
import { Container, Switch, FormControlLabel, Box, TextField, Grid } from '@mui/material';
import MovieCard from './MovieCard';

const API_KEY = '33cb9f940dd9b9fd6d1525e86f05aca0';
const API_URL = 'https://api.themoviedb.org/3';

const HomePage = ({ darkMode, setDarkMode }) => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (search = '') => {
    const endpoint = search
      ? `${API_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(search)}`
      : `${API_URL}/movie/popular?api_key=${API_KEY}`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      fetchMovies(event.target.value);
    } else {
      fetchMovies();
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, py: 4 }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={handleSearch}
            sx={{ mr: 2 }}
          />
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="primary"
              />
            }
            label={darkMode ? "Dark Mode" : "Light Mode"}
          />
        </Box>

        <Grid container spacing={3}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;