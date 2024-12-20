import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Toolbar,
  Typography,
  IconButton,
  Slide,
} from '@mui/material';
import { Home, Movie } from '@mui/icons-material';

const Header = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const handleSignUp = (event) => {
    event.preventDefault();
    // Add your sign up logic here
    setIsSignUpOpen(false);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    // Add your sign in logic here
    setIsSignInOpen(false);
  };

  return (
    <Slide appear={true} direction="down" in={true}>
      <AppBar 
        position="sticky" 
        sx={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar>
          <IconButton 
            color="inherit" 
            onClick={() => window.location.reload()}
            sx={{ mr: 2 }}
          >
            <Home />
          </IconButton>
          
          <Movie sx={{ mr: 1 }} />
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
            }}
          >
            CineVerse
          </Typography>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              variant="outlined" 
              color="inherit"
              onClick={() => setIsSignInOpen(true)}
              sx={{
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s',
                }
              }}
            >
              Sign In
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={() => setIsSignUpOpen(true)}
              sx={{
                '&:hover': {
                  transform: 'scale(1.05)',
                  transition: 'transform 0.2s',
                }
              }}
            >
              Sign Up
            </Button>
          </Box>

          {/* Sign Up Dialog */}
          <Dialog open={isSignUpOpen} onClose={() => setIsSignUpOpen(false)}>
            <form onSubmit={handleSignUp}>
              <DialogTitle>Sign Up</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Name"
                  type="text"
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsSignUpOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">Sign Up</Button>
              </DialogActions>
            </form>
          </Dialog>

          {/* Sign In Dialog */}
          <Dialog open={isSignInOpen} onClose={() => setIsSignInOpen(false)}>
            <form onSubmit={handleSignIn}>
              <DialogTitle>Sign In</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  margin="dense"
                  label="Email"
                  type="email"
                  fullWidth
                  required
                />
                <TextField
                  margin="dense"
                  label="Password"
                  type="password"
                  fullWidth
                  required
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setIsSignInOpen(false)}>Cancel</Button>
                <Button type="submit" variant="contained">Sign In</Button>
              </DialogActions>
            </form>
          </Dialog>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Header; 