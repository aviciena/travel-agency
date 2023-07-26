'use client'

import { Box, Button, Grid } from '@mui/material';
import styles from './confirmation.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown, faArrowCircleUp, faCalendarDays, faTicket } from '@fortawesome/free-solid-svg-icons';
import { CopyAll } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { currencyFormatter, getDayName, randomAlphaNumeric } from '@/util/util';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import AlertDialog from '@/app/components/molecules/AlertDialog';
import { resetData } from '@/redux/features/bookTicket';

export default function Confirmation() {
  const router = useRouter();
  const dispatch = useDispatch();

  const orderData = useSelector(state => state.bookTicket);

  const [showCopyAlert, setShowCopyAlert] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [maxPayment, setMaxPayment] = useState(null);
  const [codeBooking, setCodeBooking] = useState(null);
  const [alert, setAlert] = useState({ open: false, title: 'Success', message: 'Pemesanan tiket anda telah berhasil, kami akan memproses pesanan anda dan menghubungi anda jika ada perubahan jadwal dan melakukan konfirmasi untuk kedatangan anda.' });

  useEffect(() => {
    setMaxPayment(dayjs().add(20, 'minutes').format('DD MMMM YYYY HH:mm'));
    setCodeBooking(randomAlphaNumeric());

  }, []);

  const onCopyAccountNumber = () => {
    setShowCopyAlert(true);
    navigator.clipboard.writeText(orderData?.paymentDetail?.accountNumber);
    setTimeout(() => {
      setShowCopyAlert(false);
    }, 1000);
  }

  const onClickAlertHandler = () => {
    setAlert(prevState => ({ ...prevState, open: false }));
    router.replace('/');
    dispatch(resetData());
  }

  return (
    <main className={styles.container}>
      <AlertDialog
        open={alert.open}
        title={alert.title}
        message={alert.message}
        onLeftAction={onClickAlertHandler}
        leftText="OK"
      />
      <Box className={styles.wrapper}>
        <Box sx={{ marginBottom: { xs: '1.7rem', md: '3rem' } }}>
          <Box className={`${'blue-text'} ${'fs-18'}`}>Detail Tiket Anda</Box>
          <Grid container sx={{ marginTop: '1rem' }}>
            <Grid item md={4} xs={12}>
              <p className={`${'mb-05'}`} >
                <FontAwesomeIcon
                  icon={faArrowCircleUp}
                  style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
                />
                {`${orderData?.from} - ${orderData?.destination}`}
                <FontAwesomeIcon
                  icon={faArrowCircleDown}
                  style={{ marginLeft: '0.25rem', color: '#1F9BCF' }}
                />
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
                />
                {`${getDayName(orderData?.date)}, ${dayjs(orderData?.date).format('DD MMMM YYYY')} ${orderData?.time}`}
              </p>
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Status Pemesanan</p>
              <p className={styles.bookedTxt}>BOOKED</p>
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Kode Booking</p>
              <p className={`${'fs-20'}`}>
                <FontAwesomeIcon
                  icon={faTicket}
                  style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
                />
                {codeBooking}
              </p>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: '2rem' }}>
            <p className={`${'mb-05'} ${'fw-500'}`} >Total Bayar</p>
            <p className={`${'mb-05'} ${'fs-28'}`}>{currencyFormatter(orderData?.price)}</p>
            <p className='fs-14' style={{ color: 'red' }}>Batas Pembayaran: {maxPayment}</p>
          </Box>
          <p style={{ marginTop: '2rem', marginBottom: '0.5rem', fontSize: '18px' }}>Data Pembayaran</p>
          <Grid container>
            <Grid item md={4} xs={12}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Harga</p>
              <p>{currencyFormatter(orderData?.price)}</p>
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Potongan</p>
              <p>Rp. 0</p>
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Total</p>
              <p>{currencyFormatter(orderData?.price)}</p>
            </Grid>
          </Grid>
          <Grid container sx={{ marginTop: '2rem' }}>
            <Grid item md={4} xs={12}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Jenis Pembayaran</p>
              <p>{orderData?.paymentDetail?.description}</p>
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Batas Pembayaran</p>
              <p style={{ color: 'red' }}>{maxPayment}</p>
            </Grid>
            <Grid item md={4} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
              <p className={`${'mb-05'} ${'fw-500'}`} >Kode Pembayaran</p>
              <Box className={styles.codeContainer}>
                <p>{orderData?.paymentDetail?.accountNumber}</p>
                <Button
                  variant="outlined"
                  size='small'
                  className={styles.copyContainer}
                  startIcon={<CopyAll />}
                  onClick={onCopyAccountNumber}
                >{showCopyAlert ? 'Copied' : 'Copy'}</Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <hr className={styles.hr} />
        <Box className={styles.orderedDetailContainer}>
          <Box>
            <Box className={`${'fs-18'}`}>Data Pemesan</Box>
            <Grid container sx={{ marginTop: { xs: '0rem', md: '1rem' } }}>
              <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1rem', md: 0 } }}>
                <p className={`${'mb-05'} ${'fw-500'}`} >Nama Pemesan</p>
                <p>{orderData?.orderedDetail?.name}</p>
              </Grid>
              <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
                <p className={`${'mb-05'} ${'fw-500'}`} >Email Pemesan</p>
                <p>{orderData?.orderedDetail?.email}</p>
              </Grid>
              <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
                <p className={`${'mb-05'} ${'fw-500'}`} >No Telpon Pemesan</p>
                <p>{orderData?.orderedDetail?.phoneNumber}</p>
              </Grid>
              <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
                <p className={`${'mb-05'} ${'fw-500'}`} >Waktu Pesan</p>
                <p>{dayjs().format('DD MMMM YYYY HH:mm')}</p>
              </Grid>
            </Grid>
          </Box>
          <Box className={styles.passengerContainer}>
            <Box className={`${'fs-18'}`}>Data Penumpang</Box>
            {orderData?.passengerDetails.map(function (data, i) {
              return (
                <Grid container sx={{ marginTop: { xs: '0rem', md: '1rem' } }} key={`key-${i.toString()}`}>
                  <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
                    <p className={`${'mb-05'} ${'fw-500'}`} >Nama Penumpang {i + 1}</p>
                    <p>{data?.name}</p>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
                    <p className={`${'mb-05'} ${'fw-500'}`} >No Tiket</p>
                    <p>{data?.ticketNumber}</p>
                  </Grid>
                  <Grid item md={3} xs={12} sx={{ marginTop: { xs: '1.25rem', md: 0 } }}>
                    <p className={`${'mb-05'} ${'fw-500'}`} >Tanggal Berangkat</p>
                    <p>{`${dayjs(orderData?.date).format('DD MMMM YYYY')} ${orderData?.time}`}</p>
                  </Grid>
                </Grid>
              )
            })}
          </Box>
        </Box>
        {selectedImage === null &&
          <label>
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={({ target }) => {
                if (target.files) {
                  const file = target.files[0];
                  setSelectedImage({ uri: URL.createObjectURL(file), file });
                }
              }}
            />
            <Box className={styles.uploadImageWrapper} sx={{ width: { xs: '100%', md: '20%' } }}>
              Pilih Resi
            </Box>
          </label>
        }
        {selectedImage &&
          <Box sx={{ marginTop: '2rem', marginBottom: '1rem' }}>
            <Image
              src={selectedImage.uri}
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
              alt='resi-image'
            />
          </Box>
        }
        <Button
          variant='contained'
          size='medium'
          className={styles.button}
          disabled={selectedImage ? false : true}
          sx={{ width: { xs: '100%', md: '30%' } }}
          onClick={() => {
            setAlert(prevState => ({ ...prevState, open: true }));
          }}>
          Upload Resi
        </Button>
      </Box>
    </main >
  );
}