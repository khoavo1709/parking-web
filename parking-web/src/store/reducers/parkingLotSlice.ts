import { createSlice } from "@reduxjs/toolkit";
import {
  createParkingLot,
  deleteParkingLot,
  getAllParkingLots,
  updateParkingLot,
  changeParkingLotStatus,
} from "@/store/actions/parkingLotAction";

export type ParkingLotState = {
  parkingLots: Array<ParkingLot>;
  loading: boolean;
  error: any;
};

const initialState: ParkingLotState = {
  parkingLots: [],
  loading: false,
  error: null,
};

export const parkingLotSlice = createSlice({
  name: "parkingLot",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllParkingLots.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllParkingLots.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = payload;
      })
      .addCase(getAllParkingLots.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createParkingLot.pending, (state) => {
        state.loading = true;
      })
      .addCase(createParkingLot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = payload;
      })
      .addCase(createParkingLot.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateParkingLot.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateParkingLot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = payload;
      })
      .addCase(updateParkingLot.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteParkingLot.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteParkingLot.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = payload;
      })
      .addCase(deleteParkingLot.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(changeParkingLotStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeParkingLotStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.parkingLots = payload;
      })
      .addCase(changeParkingLotStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const parkingLotActions = {
  ...parkingLotSlice.actions,
  getAllParkingLots,
  createParkingLot,
  updateParkingLot,
  deleteParkingLot,
  changeParkingLotStatus,
};
