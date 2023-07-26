'use client'

import { Box } from "@mui/material";
import styles from './departure-card.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleDown, faArrowCircleUp } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { currencyFormatter, getDayName } from "@/util/util";
import dayjs from "dayjs";
import { useEffect } from "react";
require('dayjs/locale/de');

export default function DepartureCard() {
  const orderData = useSelector((state) => state.bookTicket);

  useEffect(() => {
    dayjs.locale('de');
  }, []);

  return (
    <Box className={styles.scheduleContainer}>
      <div className={`${'white-text'} ${styles.detailTitle}`}>Detail Keberangkatan</div>
      <div className={styles.destinationWrapper}>
        <p>
          <FontAwesomeIcon
            icon={faArrowCircleUp}
            size="xs"
            style={{ marginRight: '0.25rem', color: 'white' }}
          />
          {orderData.from}
        </p>
        <p className={`${'text-muted'} ${'fs-12'}`}>Jalan Arteri Supadio Km. 17, Limbung, Raya R iver, Limbung, Kec. Sungai Raya, Kabupaten Kubu Raya, Kalimantan Barat 78381</p>
      </div>
      <Box className={styles.destinationWrapper} sx={{ margin: '1.5rem 0' }}>
        <p>
          <FontAwesomeIcon
            icon={faArrowCircleDown}
            size="xs"
            style={{ marginRight: '0.25rem', color: 'white' }}
          />
          {orderData.destination}
        </p>
        <p className={`${'text-muted'} ${'fs-12'}`}>Jl. Alianyang, Pasiran, Kec. Singkawang Bar., Kota Singkawang, Kalimantan Barat 79123</p>
      </Box>
      <div className={styles.detailText}>
        {`${getDayName(orderData.date)}, ${dayjs(orderData.date).format('DD MMMM YYYY')} ${orderData.time}`}
      </div>
      <div className={styles.priceText}>{currencyFormatter(orderData.price)}</div>
    </Box>
  );
}