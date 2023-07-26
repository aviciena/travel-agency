'use client'

import { Grid, FormControlLabel, Typography, RadioGroup, Radio, Box, Button, Checkbox } from '@mui/material';
import styles from './payment.module.css'
import DepartureCard from '@/app/components/molecules/DepartureCard';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import PassengerDetail from '@/app/components/molecules/PassengerDetail/page';
import Tnc from '@/app/components/molecules/Tnc/page';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPaymentDetails } from '@/redux/features/bookTicket';
import { currencyFormatter } from '@/util/util';

const bankList = [
  {
    url: "/bank/bca-va.png",
    alt: "bca",
    value: "bca",
    description: "BCA Virtual Account",
    account_number: "111234566"
  },
  {
    url: "/bank/maybank-va.png",
    alt: "maybank",
    value: "maybank",
    description: "Maybank Virtual Account",
    account_number: "0018273455"
  },
  {
    url: "/bank/bri-va.png",
    alt: "bri",
    value: "bri",
    description: "BRI Virtual Account",
    account_number: "9998273445"
  },
  {
    url: "/bank/bni-va.png",
    alt: "bni",
    value: "bni",
    description: "BNI Virtual Account",
    account_number: "00092266634"
  },
  {
    url: "/bank/cimb-va.png",
    alt: "cimb",
    value: "cimb",
    description: "CMIB Virtual Account",
    account_number: "3345454522"
  },
  {
    url: "/bank/danamon-va.png",
    alt: "danamon",
    value: "danamon",
    description: "Danamon Virtual Account",
    account_number: "4445343554"
  },
  {
    url: "/bank/mandiri-va.png",
    alt: "mandiri",
    value: "mandiri",
    description: "Mandiri Virtual Account",
    account_number: "99998827723"
  },
  {
    url: "/bank/bjb-va.png",
    alt: "bjb",
    value: "bjb",
    description: "BJB Virtual Account",
    account_number: "34434355532"
  }
];

export default function Payment() {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderData = useSelector(state => state.bookTicket);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [checkedTnc, setCheckedTnc] = useState(false);
  const [enableConfirmation, setEnableConfirmation] = useState(false);

  const onConfirmationClicked = () => {
    const data = bankList.find(e => e.value === selectedPayment);
    const payload = {
      name: data.value,
      accountNumber: data.account_number,
      description: data.description
    }

    dispatch(setPaymentDetails(payload));

    router.push('book/confirmation');
  }

  const onChangeTnCHandler = (e) => {
    setCheckedTnc(e.target.checked);
    const isEnable = selectedPayment && e.target.checked;
    setEnableConfirmation(isEnable);
  }

  const onSelectedPayment = (e) => {
    setSelectedPayment(e.target.value);
    const isEnable = checkedTnc && e.target.value;
    setEnableConfirmation(isEnable);
  }

  return (
    <main className={styles.container}>
      <Grid container spacing={7} sx={{ padding: { md: '2rem 12rem', xs: '2rem 2rem' } }}>
        <Grid item xs={12} md={7}>
          <div className={`${'blue-text'} ${styles.title}`}>Pilih Metode Pembayaran</div>
          <Box sx={{ margin: '0.5rem 0 3rem 0' }}>
            <RadioGroup
              row
              value={selectedPayment}
              onChange={onSelectedPayment}
            >
              {
                bankList.map((data, index) => (
                  <Grid item xs={6} md={3} key={`key-${index.toString()}`}>
                    <FormControlLabel
                      control={<Radio />}
                      value={data.value}
                      label={
                        <Image
                          src={data.url}
                          alt={data.alt}
                          width={60}
                          height={45}
                          style={{ marginTop: '0.2rem' }}
                        />
                      }
                    />
                  </Grid>
                ))
              }
            </RadioGroup>
          </Box>
          <Tnc />
          <div className={`${'blue-text'} ${styles.title}`}>Detail Harga</div>
          <Box className={`${styles.card} ${styles.priceContainer}`}>
            <Box className={styles.priceWrapper}>
              <label>Harga Tiket</label>
              <label>{currencyFormatter(orderData.price)}</label>
            </Box>
            <hr className={styles.hr} />
            <Box className={styles.priceWrapper}>
              <label>Total Diskon</label>
              <label>- Rp. 0</label>
            </Box>
            <hr className={styles.hr} />
            <Box className={styles.priceWrapper}>
              <label>Biaya Layanan</label>
              <label>Rp. 0</label>
            </Box>
            <hr className={styles.hr} />
            <Box className={styles.priceWrapper}>
              <label className='blue-text'>Total Bayar</label>
              <label className={`${'blue-text'} ${'fs-18'}`}>{currencyFormatter(orderData.price)}</label>
            </Box>
          </Box>
          <FormControlLabel
            control={<Checkbox checked={checkedTnc} onChange={onChangeTnCHandler} />}
            label={
              <Typography className={`${'text-muted'} ${'fs-12'}`}>
                Silahkan tandai kotak ini sebagai bukti bahwa anda mengerti dan menerima ketentuan-ketentuan diatas yang diberlakukan oleh managemen operator Travel Agency
              </Typography>
            }
            sx={{ margin: '0.5rem 0 2rem 0', fontSize: '12px' }}
          />
          <Grid container spacing={2}>
            <Grid item xs={6} md={5}>
              <Button
                variant="outlined"
                sx={{ width: '100%' }}
                startIcon={<ArrowBackIcon />}
                onClick={() => router.back()}>
                Sebelumnya
              </Button>
            </Grid>
            <Grid item xs={6} md={5}>
              <Button
                variant="contained"
                disabled={!enableConfirmation}
                sx={{ width: '100%' }}
                endIcon={<CheckIcon />}
                onClick={onConfirmationClicked}>
                Konfirmasi
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={5} sx={{ marginTop: { md: 0.5, xs: -2.5 } }}>
          <DepartureCard />
          <PassengerDetail />
        </Grid>
      </Grid>
    </main>
  );
}