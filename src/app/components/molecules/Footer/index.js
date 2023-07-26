'use client'

import { Box, Grid } from '@mui/material';
import styles from './footer.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance, faFacebook, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Box
        className={styles.infoContainer}
        sx={{
          padding: { xs: '1rem 2rem', md: '1rem 12rem' },
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12} md={2}>
            <FontAwesomeIcon
              icon={faBehance}
              className="fa-behance fa-3x"
            />
          </Grid>
          <Grid item xs={12} md={3} sx={{ marginTop: { xs: 3, md: 0 } }}>
            <p>CALL CENTER</p>
            <Box className={styles.callcenter}>
              <p>Telepon</p>
              <p>(0562) 123 1652</p>
            </Box>
            <Box className={styles.callcenter}>
              <p>Pesan Whatsapp</p>
              <p>0812-9872-92836</p>
            </Box>
          </Grid>
          <Grid item xs={12} md={2} sx={{ marginTop: { xs: 3, md: 0 } }}>
            <p>SOSIAL MEDIA</p>
            <Grid
              container
              className={styles.callcenter}
              spacing={2}
              sx={{
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <Grid item>
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="fa-instagram fa-3x"
                />
              </Grid>
              <Grid item>
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="fa-facebook fa-3x"
                />
              </Grid>
              <Grid item>
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="fa-whatsapp fa-3x"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <div className={styles.copyright}>
        <span>Copyright &copy; Travel Agency 2023</span>
      </div>
    </footer>
  );
}