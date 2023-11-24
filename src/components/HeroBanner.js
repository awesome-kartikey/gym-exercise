import React from 'react'
import { Box, Stack, Typography, Button } from '@mui/material';

import HeroBannerImage from '../assets/images/banner.png';
import { Height } from '@mui/icons-material';

const HeroBanner = () => {
  return (
    <Box sx={{
      mt: { sm: '212px', xs: '70px' },
      ml: { sm: '50px' },
      // height: '80vh',
      // display: 'flex',
      // backgroundImage: 'url(./images/banner.png)',
      // ,
      // backgroundPosition: 'left bottom',
      // backgroundSize: '100%',
      // backgroundRepeat: 'no-repeat',

      // flexDirection: 'column',
      // justifyContent: 'center',
      // alignItems: 'center',
      // p: '20px',
      // textAlign: 'center',
      // color: '#fff'
    }}
      position='relative'
      px='20px'
    >
      <Typography color='#FF2625' fontSize='26px' fontWeight='600'>
        Fitness Club
      </Typography>
      <Typography fontWeight={700}
        sx={{ fontSize: { lg: '44px', xs: '40px' } }}
        mb='23px' mt='30px'
      >
        Sweat, Smile <br /> and Repeat
      </Typography>
      <Typography
        fontSize="22px"
        lineHeight="35px"
        mb={4}
      >
        Check out the most effective exercises
      </Typography>
      <Button
        variant="contained"
        color="error"
        sx={{
          backgroundColor: '#ff2625',
          padding: '10px'
        }}
      >
        Explore Exercises
      </Button>
      <Typography
        fontWeight={600}
        color="#FF2625"
        sx={{ opacity: 0.1, display: { lg: 'block', xs: 'none' } }}
        fontSize="200px"
      >
        Exercise
      </Typography>
      <img
        src={HeroBannerImage}
        alt="banner_image"
        className='hero-banner-img'
      />
    </Box>
  )
}

export default HeroBanner