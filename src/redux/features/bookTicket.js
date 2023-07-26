import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: "",
  from: "",
  destination: "",
  date: "",
  time: "",
  price: 0,
  discount: 0,
  passengerCount: 1,
  passengerDetails: [],
  orderedDetail: {
    name: "",
    phoneNumber: "",
    email: "",
    address: ""
  },
  paymentDetail: {
    name: "",
    accountNumber: "",
    description: ""
  },
  codeBooking: "",
  maxPayment: "",
  resi: ""
}

const bookTicketSlice = createSlice({
  name: "bookTicket",
  initialState,
  reducers: {
    setSearchTicket: (state, { payload }) => {
      state.from = payload.from;
      state.destination = payload.destination;
      state.date = payload.date;
      state.passengerCount = payload.passengerCount;
    },
    setSchedule: (state, { payload }) => {
      state.time = payload.time;
      state.price = payload.price
    },
    setOrderDetails: (state, { payload }) => {
      state.orderedDetail = payload.orderedDetail;
      state.passengerDetails = payload.passengerDetails;
    },
    setPaymentDetails: (state, { payload }) => {
      state.paymentDetail = payload;
    },
    setConfirmation: (state, { payload }) => {
      state.status = payload.status;
      state.codeBooking = payload.codeBooking;
      state.maxPayment = payload.maxPayment;
    },
    resetData: () => {
      return initialState
    }
  }
});

export const {
  setSearchTicket,
  setSchedule,
  setOrderDetails,
  setPaymentDetails,
  setConfirmation,
  resetData
} = bookTicketSlice.actions;

const bookTicketReducer = bookTicketSlice.reducer;
export default bookTicketReducer;