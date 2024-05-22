import { parkingLotApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllParkingLots = createAsyncThunk(
  "parkingLots/getAll",
  async (idCompany: any, { rejectWithValue }) => {
    try {
      const res = await parkingLotApi.getAll(idCompany);
      return res.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const createParkingLot = createAsyncThunk(
  "parkingLots/create",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      await parkingLotApi.create(data);
      const companyId = localStorage.getItem("COMPANY_ID");
      const getList = await dispatch(getAllParkingLots(companyId));

      return getList.payload;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const updateParkingLot = createAsyncThunk(
  "parkingLots/update",
  async (data: ParkingLot, { rejectWithValue, dispatch }) => {
    try {
      await parkingLotApi.update(data.id!, data);
      const companyId = localStorage.getItem("COMPANY_ID");
      const getList = await dispatch(getAllParkingLots(companyId));

      return getList.payload;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const deleteParkingLot = createAsyncThunk(
  "parkingLots/delete",
  async (idCompany: string, { rejectWithValue, dispatch }) => {
    try {
      await parkingLotApi.delete(idCompany);
      const companyId = localStorage.getItem("COMPANY_ID");
      const getList = await dispatch(getAllParkingLots(companyId));

      return getList.payload;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

const changeParkingLotStatus = createAsyncThunk(
  "parkingLots/changeSatus",
  async (
    data: { id: string; status: string },
    { rejectWithValue, dispatch },
  ) => {
    try {
      await parkingLotApi.changeStatus(data.id, data.status);
      const companyId = localStorage.getItem("COMPANY_ID");
      const getList = await dispatch(getAllParkingLots(companyId));

      return getList.payload;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  },
);

export {
  getAllParkingLots,
  createParkingLot,
  updateParkingLot,
  deleteParkingLot,
  changeParkingLotStatus,
};
