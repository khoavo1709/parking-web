import { createSlice } from "@reduxjs/toolkit";
import { getAllParkingLots } from "@/store/actions/parkingLotAction";

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
      });
  },
});

export const parkingLotActions = {
  ...parkingLotSlice.actions,
  getAllParkingLots,
};
