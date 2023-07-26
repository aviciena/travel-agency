'use client'

import { Box, Button, Grid } from "@mui/material"
import styles from './trip-result.module.css'

export default function TripResult({ onSelectDay, data }) {
  return (
    <Box className={styles.container}>
      <Box className={styles.cardBody}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <p className={styles.title}>DETAIL PERJALANAN</p>
            <p className="blue-text">Estimasi {data.estimateTime} {data.estimateDesc.toLowerCase()} perjalanan</p>
            <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
              <Grid item xs={3.3} md={1.5}>{data.startDate}, <br /> {data.startTime}</Grid>
              <Box className={styles.tlDot} sx={{
                '&::after': {
                  bottom: { xs: '-50px !important', md: '-85px !important' }
                },
              }} />
              <Grid item>{data.from}</Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: { md: 8, xs: 3.8 } }}>
              <Grid item xs={3.3} md={1.5}>{data.endDate},<br /> {data.endTime}</Grid>
              <div className={styles.tlDotLast}></div>
              <Grid item>{data.destination}</Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: { md: 'grid', xs: 'block' }, justifyContent: { md: 'flex-end', xs: 'flex-start' } }} >
            <Box sx={{
              marginBottom: 'auto',
              marginTop: { xs: 3 },
              display: { xs: 'flex', md: 'block' },
              justifyContent: { xs: 'space-between', md: 'unset' }
            }}>
              <Box className={styles.title} sx={{ marginRight: { xs: 2 }, fontSize: { xs: '14px', md: '16px' } }}>KEBERANGKATAN {data.startTime}</Box>
              <p className={styles.badge}>{data.availableSeat} KURSI LAGI</p>
            </Box>
            <Box sx={{ marginTop: { md: 'auto', xs: 3 } }}>
              <p className={styles.title}>{data.priceText}</p>
              <Button
                variant="contained"
                sx={{ width: { md: '80%', xs: '100%' }, borderRadius: 3 }}
                onClick={() => onSelectDay({ time: data.startTime, price: data.price })}
              >Pilih</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box >
  );
}