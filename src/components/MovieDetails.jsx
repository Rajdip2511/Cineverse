import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Chip, 
  Rating, 
  Button,
  CircularProgress,
  Grid 
} from '@mui/material';
import { ArrowBack, DateRange, Language, Timer, StarRate } from '@mui/icons-material';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = '33cb9f940dd9b9fd6d1525e86f05aca0'; // Use the same API key as in App.jsx

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const [movieResponse, creditsResponse] = await Promise.all([
          fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`),
          fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`)
        ]);

        const movieData = await movieResponse.json();
        const creditsData = await creditsResponse.json();

        setMovie({
          ...movieData,
          cast: creditsData.cast.slice(0, 5),
          director: creditsData.crew.find(person => person.job === 'Director')
        });
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!movie) return null;

  return (
    <Box sx={{ py: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="lg">
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
          sx={{ mb: 4 }}
          variant="outlined"
        >
          Back to Movies
        </Button>

        <Grid container spacing={4}>
          {/* Movie Poster */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </Paper>
          </Grid>

          {/* Movie Details */}
          <Grid item xs={12} md={8}>
            <Typography variant="h3" component="h1" gutterBottom>
              {movie.title}
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
              <Rating value={movie.vote_average / 2} precision={0.5} readOnly />
              <Typography variant="body1">
                ({movie.vote_average.toFixed(1)}/10 from {movie.vote_count} votes)
              </Typography>
            </Box>

            <Box sx={{ mb: 3, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              <Chip icon={<DateRange />} label={movie.release_date} />
              <Chip icon={<Timer />} label={`${movie.runtime} min`} />
              <Chip icon={<Language />} label={movie.original_language.toUpperCase()} />
              <Chip icon={<StarRate />} label={`${movie.popularity.toFixed(0)} popularity`} />
            </Box>

            {movie.genres && (
              <Box sx={{ mb: 3 }}>
                {movie.genres.map(genre => (
                  <Chip 
                    key={genre.id} 
                    label={genre.name} 
                    sx={{ mr: 1, mb: 1 }} 
                    variant="outlined" 
                  />
                ))}
              </Box>
            )}

            <Typography variant="h6" gutterBottom>Overview</Typography>
            <Typography variant="body1" paragraph>
              {movie.overview}
            </Typography>

            {movie.director && (
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Director:</strong> {movie.director.name}
              </Typography>
            )}

            {movie.cast && movie.cast.length > 0 && (
              <>
                <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                  Top Cast
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  {movie.cast.map(actor => (
                    <Chip 
                      key={actor.id}
                      label={`${actor.name} as ${actor.character}`}
                      variant="outlined"
                      sx={{ mb: 1 }}
                    />
                  ))}
                </Box>
              </>
            )}

            {movie.production_companies && movie.production_companies.length > 0 && (
              <Typography variant="body1" sx={{ mt: 2 }}>
                <strong>Production:</strong> {movie.production_companies.map(company => company.name).join(', ')}
              </Typography>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default MovieDetails;