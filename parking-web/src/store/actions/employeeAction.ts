import { employeeApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (companyID: any, { rejectWithValue }) => {
    try {
      const res = await employeeApi.getAll(companyID);
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

const createEmployee = createAsyncThunk(
  "employees/create",
  async (data: any, { rejectWithValue, dispatch }) => {
    try {
      await employeeApi.create(data);

      const getList = await dispatch(getAllEmployees(data.companyID));

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

const updateEmployee = createAsyncThunk(
  "employees/update",
  async (data: Employee, { rejectWithValue, dispatch }) => {
    try {
      await employeeApi.update(data.id!, data);
      const getList = await dispatch(getAllEmployees(data.companyID));

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

const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      await employeeApi.delete(id);
      const companyId = localStorage.getItem("COMPANY_ID");
      const getList = await dispatch(getAllEmployees(companyId));

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

export { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };
