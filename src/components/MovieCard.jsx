import React from 'react';
import { Card, CardContent, CardMedia, Typography, Rating, Box } from '@mui/material';

const MovieCard = ({ movie }) => {
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" noWrap>
          {movie.title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
          />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            {movie.vote_average.toFixed(1)}/10
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {movie.release_date?.split('-')[0]}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MovieCard;