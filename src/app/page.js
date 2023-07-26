'use client'

import styles from './page.module.css'
import SearchTicket from './components/molecules/SearchTicket'
import { Box } from '@mui/material'
import Carousels from './components/molecules/Carousel'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { resetData, setSearchTicket } from '@/redux/features/bookTicket'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetData());
  }, [])

  const onSearchTicketHandler = (payload) => {
    dispatch(setSearchTicket(payload));
    router.push('book/select-schedule')
  }

  return (
    <main className={styles.main}>
      <Box className={styles.reservationSection}>
        <label>Pesan Tiket Murah Pontianak - Singkawang !</label>
        <SearchTicket onSearchTicket={onSearchTicketHandler}></SearchTicket>
      </Box>
      <Carousels></Carousels>
    </main>
  )
}
