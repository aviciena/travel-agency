'use client'

import { Box, FormControlLabel, Grid, TextField, Button, Typography, Checkbox, Alert } from "@mui/material";
import styles from './order.module.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from "next/navigation";
import DepartureCard from "@/app/components/molecules/DepartureCard";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderDetails } from "@/redux/features/bookTicket";
import { randomAlphaNumeric, validateEmail } from "@/util/util";

const dataOrdersFields = [
  { "label": "Nama Pemesan", value: "", key: "name", isError: false, errorMessage: "", type: "text" },
  { "label": "Nomor Telepon", value: "", key: "phoneNumber", isError: false, errorMessage: "", type: "number" },
  { "label": "Email Pemesan", value: "", key: "email", isError: false, errorMessage: "", type: "email" },
  { "label": "Alamat", value: "", key: "address", isError: false, errorMessage: "", type: "text" }
]

export default function OrderTicket() {
  const router = useRouter();
  const dispatch = useDispatch();
  const orderData = useSelector((state) => state.bookTicket);

  const [copyPassenger, setCopyPassenger] = useState(false);
  const [tempDataOrdersFields, setTempDataOrdersFields] = useState(JSON.parse(JSON.stringify(dataOrdersFields)));
  const [passengerFields, setPassengerFields] = useState([]);
  const [showAlertCopy, setShowAlertCopy] = useState(false);

  useEffect(() => {
    if (orderData.orderedDetail) {
      const newTempData = []
      tempDataOrdersFields.map(data => {
        data.value = orderData.orderedDetail[data.key];
        newTempData.push(data);
      });
      setTempDataOrdersFields(JSON.parse(JSON.stringify(newTempData)));
    }

    const newDataPassenger = [];
    if (orderData.passengerDetails.length > 0) {
      const isCopy = orderData.passengerDetails[0].name === orderData.orderedDetail.name;
      setCopyPassenger(isCopy);
      orderData.passengerDetails.map(data => {
        const obj = {
          name: data.name,
          isError: false,
          errorMessage: ""
        }
        newDataPassenger.push(obj);
      });
    } else {
      for (let index = 0; index < orderData.passengerCount; index++) {
        const obj = {
          name: "",
          isError: false,
          errorMessage: ""
        }
        newDataPassenger.push(obj);
      }
    }

    setPassengerFields(JSON.parse(JSON.stringify(newDataPassenger)));
  }, []);

  const onChangeOrderDetails = (value, index) => {
    const newData = JSON.parse(JSON.stringify(tempDataOrdersFields));
    newData[index].value = value;
    newData[index].isError = false;
    newData[index].errorMessage = '';

    if (newData[index].value !== "" && newData[index].type === "email" && !validateEmail(newData[index].value)) {
      newData[index].isError = true;
      newData[index].errorMessage = 'Email tidak valid';
    }

    setTempDataOrdersFields(newData);

    if (copyPassenger && newData[index].key === "name") {
      const newData = JSON.parse(JSON.stringify(passengerFields));
      newData[0].name = value;
      setPassengerFields(newData);
    }
  }

  const onChangePassengerField = (value, index) => {
    const newData = JSON.parse(JSON.stringify(passengerFields));
    newData[index].name = value;
    newData[index].isError = false;
    newData[index].errorMessage = "";
    setPassengerFields(newData);

    if (copyPassenger && index === 0) {
      const newData = JSON.parse(JSON.stringify(tempDataOrdersFields));
      newData[index].value = value;
      setTempDataOrdersFields(newData);
    }
  }

  const onCopyPassenger = (e) => {
    const isCopy = e.target.checked;
    setCopyPassenger(isCopy);

    if (isCopy) {
      if (tempDataOrdersFields[0].value) {
        const newData = JSON.parse(JSON.stringify(passengerFields));
        newData[0].name = tempDataOrdersFields[0].value;
        newData[0].isError = false;
        newData[0].errorMessage = "";
        setPassengerFields(newData);
      } else {
        setShowAlertCopy(true);
        setCopyPassenger(false);
      }
    }
  }

  const onNextPaymentHandler = () => {
    const passengerDetails = [];
    const orderedDetail = {};
    let isError = false;

    const newPassengerData = JSON.parse(JSON.stringify(passengerFields));
    const newOrderedData = JSON.parse(JSON.stringify(tempDataOrdersFields));

    newPassengerData.map((data, index) => {
      if (data.name === "") {
        isError = true;
        data.isError = true;
        data.errorMessage = "Silahkan mengisi nama penumpang";
        newPassengerData[index] = data;
      }
      const obj = {
        name: data.name,
        ticketNumber: randomAlphaNumeric()
      };
      passengerDetails.push(obj);
    });

    newOrderedData.map((data, index) => {
      if (data.value === "") {
        isError = true;
        data.isError = true;
        data.errorMessage = `Silahkan mengisi ${data.label.toLowerCase()}`;
        newOrderedData[index] = data;
      }
      orderedDetail[data.key] = data.value;
    });

    if (isError) {
      setPassengerFields(newPassengerData);
      setTempDataOrdersFields(newOrderedData);
    } else {
      const payload = {
        orderedDetail,
        passengerDetails
      };
      dispatch(setOrderDetails(payload));
      router.push('book/payment');
    }
  }

  return (
    <main className={styles.container}>
      <Grid container spacing={1} sx={{ padding: { md: '2rem 12rem', xs: '2rem 2rem' } }}>
        <Grid item xs={12} md={7}>
          <Box>
            <div className={`${'blue-text'} ${styles.title}`}>Data Pemesan</div>
            <Grid container spacing={{ md: 4, xs: 1 }} sx={{ marginTop: '0 !important' }}>
              {
                tempDataOrdersFields.map((data, index) => (
                  <Grid item xs={12} md={5} key={`key-${index.toString()}`} sx={{ paddingTop: '0 !important' }}>
                    <p className={styles.inputLabel}>{data.label}</p>
                    <TextField
                      fullWidth
                      size="small"
                      value={data.value}
                      error={data.isError}
                      helperText={data.errorMessage}
                      type={data.type}
                      onChange={(e) => onChangeOrderDetails(e.target.value, index)}
                      FormHelperTextProps={{
                        sx: { marginLeft: 0 }
                      }} />
                  </Grid>
                ))
              }
            </Grid>
          </Box>
          <Box sx={{ marginTop: 3 }}>
            <Box className={`${'blue-text'} ${styles.title}`}>Data Penumpang</Box>
            <Grid container spacing={4} sx={{ marginTop: 0 }}>
              {passengerFields.map(function (_, i) {
                return (
                  <Grid item xs={12} md={5} key={`key-${i.toString()}`} sx={{ marginTop: 0, paddingTop: '0 !important' }}>
                    <p className={styles.inputLabel}>Nama Penumpang {i + 1}</p>
                    <TextField
                      fullWidth
                      size="small"
                      value={passengerFields[i].name || ""}
                      error={passengerFields[i].isError}
                      helperText={passengerFields[i].errorMessage}
                      onChange={(e) => onChangePassengerField(e.target.value, i)}
                      FormHelperTextProps={{
                        sx: { marginLeft: 0 }
                      }}
                    />
                    {i === 0 &&
                      <FormControlLabel
                        checked={copyPassenger}
                        onChange={onCopyPassenger}
                        control={<Checkbox size="small" />}
                        label={
                          <Typography className={`${'text-muted'} ${'fs-12'}`}>
                            Pemesan adalah penumpang
                          </Typography>
                        }
                      />
                    }
                  </Grid>
                );
              })}
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
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
                  sx={{ width: '100%' }}
                  endIcon={<ArrowForwardIcon />}
                  onClick={onNextPaymentHandler}>
                  Pembayaran
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} sx={{ marginTop: { md: 0.5, xs: 5 } }}>
          <DepartureCard isShowPrice />
        </Grid>
      </Grid >
      {showAlertCopy &&
        <Alert
          onClose={() => setShowAlertCopy(false)}
          severity="error"
          sx={{ position: 'absolute', top: '5rem' }}>
          Masukkan nama pemesan terlebih  dahulu!
        </Alert>
      }
    </main >
  );
}