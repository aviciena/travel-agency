'use client'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Box } from "@mui/material";

export default function Carousels() {
  return (
    <Box sx={{ marginTop: 5, marginBottom: 3, width: { xs: '100%', md: '70%' } }}>
      <Carousel autoPlay infiniteLoop showThumbs={false} showStatus={false} interval={3500}>
        <div>
          <img
            src="/cr2.jpeg"
            alt="Vercel Logo"
            style={{ width: '90%', height: '80%' }}
          />
        </div>
        <div>
          <img
            src="/cr3.jpeg"
            alt="Vercel Logo"
            style={{ width: '90%', height: '80%' }}
          />
        </div>
      </Carousel>
    </Box>
  );
}