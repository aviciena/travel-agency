'use client'

import styles from './select-schedule.module.css'
import { Box } from '@mui/material'
import SearchTicket from '@/app/components/molecules/SearchTicket'
import TripDetails from '@/app/components/molecules/TripDetails'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { setSchedule, setSearchTicket } from '@/redux/features/bookTicket'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { currencyFormatter } from '@/util/util'

const tripList = [
  {
    id: '1',
    estimateTime: 6,
    estimateDesc: 'Jam',
    from: 'Pontianak',
    destination: 'Singkawang',
    time: '06:00',
    price: 113000,
    availableSeat: 10,
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: ''
  },
  {
    id: '2',
    estimateTime: 6,
    estimateDesc: 'Jam',
    from: 'Pontianak',
    destination: 'Singkawang',
    time: '08:00',
    price: 113000,
    availableSeat: 13,
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: ''
  },
  {
    id: '3',
    estimateTime: 6,
    estimateDesc: 'Jam',
    from: 'Pontianak',
    destination: 'Singkawang',
    time: '10:00',
    price: 113000,
    availableSeat: 9,
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: ''
  },
  {
    id: '4',
    estimateTime: 6,
    estimateDesc: 'Jam',
    from: 'Pontianak',
    destination: 'Singkawang',
    time: '12:00',
    price: 113000,
    availableSeat: 8,
    startTime: '',
    endTime: '',
    startDate: '',
    endDate: ''
  }
];

export default function SelectSchedule() {
  const router = useRouter();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.bookTicket);
  const [tempTripList, setTempTripList] = useState(JSON.parse(JSON.stringify(tripList)));

  useEffect(() => {
    if (data.date) {
      const newTripList = [];
      tempTripList.map((temp) => {
        const addFormat = temp.estimateDesc.toLowerCase() === "jam" ? 'hour' : 'minute';
        const orderDate = dayjs(`${data.date}T${temp.time}`);
        temp.from = data.from;
        temp.destination = data.destination;
        temp.startTime = orderDate.format('HH:mm');
        temp.endTime = orderDate.add(temp.estimateTime, addFormat).format('HH:mm');
        temp.startDate = orderDate.format('DD MMM');
        temp.endDate = orderDate.add(temp.estimateTime, addFormat).format('DD MMM');
        temp.priceText = currencyFormatter(temp.price);
        newTripList.push(temp);
      });
      setTempTripList(JSON.parse(JSON.stringify(newTripList)));
    }
  }, [data]);

  const onSelectDayHandler = (selectedTime) => {
    dispatch(setSchedule(selectedTime));
    router.push('book/order');
  }

  const onReSearchHandler = (payload) => {
    dispatch(setSearchTicket(payload));
  }

  return (
    <main>
      <Box className={styles.container}>
        <Box className={styles.reservationSection} sx={{ width: { xs: '100%', md: '77%' } }}>
          <label>Ubah Keberangkatan</label>
          <SearchTicket
            onSearchTicket={onReSearchHandler}
            isShowPassenger={false}
          />
        </Box>
      </Box>
      <Box
        className={styles.scheduleResult}
        sx={{
          width: { xs: '100%', md: '80%' },
          padding: { xs: '1rem', md: '3rem' }
        }}>
        <p>Menampilkan {tempTripList.length} Jadwal Terbaik</p>
        {
          tempTripList.map((data, index) => (
            <TripDetails
              onSelectDay={onSelectDayHandler}
              key={data.id}
              data={tempTripList[index]}
            />
          ))
        }
      </Box>
    </main>
  )
}
