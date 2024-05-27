import { companyApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllCompanies = createAsyncThunk(
  "companies/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const res = await companyApi.getAll();
      return res.data.data;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

const changeCompanyStatus = createAsyncThunk(
  "companies/changeSatus",
  async (
    data: { id: string; status: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await companyApi.changeStatus(data.id, data.status);
      const getList = await dispatch(getAllCompanies());

      return getList.payload;
    } catch (error: any) {
      if (!error.response) {
        throw error;
      }
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export { getAllCompanies, changeCompanyStatus };
