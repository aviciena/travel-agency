'use client'

import * as React from 'react';
import styles from './searchticket.module.css'
import { Box, Button, Grid, MenuItem, Select } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleDown, faArrowCircleUp, faCalendarDays, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const fromObj = [
  {
    label: 'Pontianak',
    value: 1
  }
];

const destinationObj = [
  {
    label: 'Sungai Pinyuh',
    value: 1
  },
  {
    label: 'Mempawah',
    value: 2
  },
  {
    label: 'Sungai Kunyit',
    value: 3
  },
  {
    label: 'Sungai Duri',
    value: 4
  },
  {
    label: 'S Raya Kepulauan',
    value: 5
  },
  {
    label: 'Karimunting',
    value: 6
  },
  {
    label: 'Singkawang',
    value: 7
  }
];
export default function SearchTicket({ onSearchTicket, isShowPassenger = true }) {
  const [count, setCount] = React.useState(1);
  const [from, setFrom] = React.useState(fromObj[0].value);
  const [destination, setDestination] = React.useState(destinationObj[0].value);
  const [days, setDays] = React.useState(null);
  const [errorDate, setErrorDate] = React.useState({ isError: false, message: "" });

  const data = useSelector((state) => state.bookTicket);

  useEffect(() => {
    setFrom(1);
    setDestination(1);
    setDays(null);
    setCount(1);

    if (data.from) {
      const fromVal = fromObj.find((e) => e.label === data.from);
      setFrom(fromVal.value);
    }
    if (data.destination) {
      const destinationVal = destinationObj.find((e) => e.label === data.destination);
      setDestination(destinationVal.value);
    }
    if (data.date) {
      setDays(dayjs(data.date));
    }
    if (data.passengerCount) {
      setCount(data.passengerCount);
    }
  }, []);

  const onSearchTicketHandler = () => {
    if (days) {
      const payload = {
        from: fromObj[from - 1].label,
        destination: destinationObj[destination - 1].label,
        date: days.format('YYYY-MM-DD'),
        passengerCount: count
      }
      onSearchTicket(payload);
    } else {
      setErrorDate({ isError: true, message: "Anda Belum Memilih Tanggal!" });
    }
  }

  const onChangeDate = (e) => {
    setDays(e);
    setErrorDate({ isError: false, message: "" });
  }

  return (
    <Box className={styles.cardReservation}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={3} sx={{ paddingBottom: { xs: 2 } }}>
          <label className={styles.labels}>
            <FontAwesomeIcon
              icon={faArrowCircleUp}
              style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
            />
            Berangkat Dari
          </label>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={from}
            size="small"
            sx={{ display: 'block' }}
            onChange={(e) => setFrom(e.target.value)}
          >
            {
              fromObj.map((data) => (
                <MenuItem value={data.value} key={data.value}>{data.label}</MenuItem>
              ))
            }

          </Select>
        </Grid>
        <Grid item xs={12} md={3} sx={{ paddingBottom: { xs: 2 } }}>
          <label className={styles.labels}>
            <FontAwesomeIcon
              icon={faArrowCircleDown}
              style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
            />
            Tujuan Ke
          </label>
          <Select
            labelId="demo-select-small"
            id="demo-select-small"
            value={destination}
            size="small"
            sx={{ display: 'block' }}
            onChange={(e) => setDestination(e.target.value)}
          >
            {
              destinationObj.map((data) => (
                <MenuItem value={data.value} key={data.value}>{data.label}</MenuItem>
              ))
            }
          </Select>
        </Grid>
        <Grid item xs={12} md={isShowPassenger ? 2 : 3} sx={{ paddingBottom: { xs: 2 } }}>
          <label className={styles.labels}>
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
            />
            Tanggal Pergi
          </label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disablePast
              value={days}
              slotProps={{
                textField: {
                  size: 'small',
                  helperText: errorDate.message,
                  error: errorDate.isError
                }
              }}
              sx={{ width: '100%' }}
              onChange={onChangeDate}
            />
          </LocalizationProvider>
        </Grid>
        {isShowPassenger &&
          <Grid item xs={12} md={2} >
            <label className={styles.labels}>
              <FontAwesomeIcon
                icon={faUser}
                style={{ marginRight: '0.25rem', color: '#1F9BCF' }}
              />
              Penumpang
            </label>
            <Select
              labelId="demo-select-small"
              id="demo-select-small"
              value={count}
              size="small"
              sx={{ display: 'block' }}
              onChange={(e) => setCount(e.target.value)}
            >
              <MenuItem value={1}>1 Orang</MenuItem>
              <MenuItem value={2}>2 Orang</MenuItem>
              <MenuItem value={3}>3 Orang</MenuItem>
              <MenuItem value={4}>4 Orang</MenuItem>
              <MenuItem value={5}>5 Orang</MenuItem>
              <MenuItem value={6}>6 Orang</MenuItem>
              <MenuItem value={7}>7 Orang</MenuItem>
            </Select>
          </Grid>
        }
        <Grid item xs={12} md={2} sx={{ marginTop: 3.45 }}>
          <Button variant="contained" sx={{ width: '100%' }} onClick={onSearchTicketHandler}>Cari Tiket</Button>
        </Grid>
      </Grid >
    </Box>
  );
}