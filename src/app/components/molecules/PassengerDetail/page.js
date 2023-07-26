'use client'

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import styles from './passenger-detail.module.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLocationDot, faPhone, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export default function PassengerDetail() {
  const orderData = useSelector(state => state.bookTicket);

  return (
    <Box className={styles.container}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>DETAIL PENUMPANG</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {orderData.passengerDetails.map(function (data, i) {
            return (
              <Box className={styles.wrapper} key={`key-${i.toString()}`}>
                <Box className={styles.wrapperBody}>
                  <FontAwesomeIcon
                    icon={faUserGroup}
                    className="fa-usergroup"
                    style={{ color: "#1F9BCF", marginRight: '0.5rem' }}
                  />
                  <label>Nama Penumpang {i + 1}</label>
                </Box>
                <p>{data.name}</p>
              </Box>
            );
          })}
          <Box className={styles.wrapper}>
            <Box className={styles.wrapperBody}>
              <FontAwesomeIcon
                icon={faUser}
                className="fa-user"
                style={{ color: "#1F9BCF", marginRight: '0.5rem' }}
              />
              <label>Nama Pemesan</label>
            </Box>
            <p>{orderData.orderedDetail.name}</p>
          </Box>
          <Box className={styles.wrapper}>
            <Box className={styles.wrapperBody}>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="fa-location-dot"
                style={{ color: "#1F9BCF", marginRight: '0.5rem' }}
              />
              <label>Alamat</label>
            </Box>
            <p>{orderData.orderedDetail.address}</p>
          </Box>
          <Box className={styles.wrapper}>
            <Box className={styles.wrapperBody}>
              <FontAwesomeIcon
                icon={faPhone}
                className="fa-phone"
                style={{ color: "#1F9BCF", marginRight: '0.5rem' }}
              />
              <label>Telepon</label>
            </Box>
            <p>{orderData.orderedDetail.phoneNumber}</p>
          </Box>
          <Box className={styles.wrapper}>
            <Box className={styles.wrapperBody}>
              <FontAwesomeIcon
                icon={faEnvelope}
                className="fa-envelope"
                style={{ color: "#1F9BCF", marginRight: '0.5rem' }}
              />
              <label>Email</label>
            </Box>
            <p>{orderData.orderedDetail.email}</p>
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}