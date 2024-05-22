import { employeeApi } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getAllEmployees = createAsyncThunk(
  "employees/getAll",
  async (companyId: any, { rejectWithValue }) => {
    try {
      const res = await employeeApi.getAll(companyId);
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

      const getList = await dispatch(getAllEmployees(data.companyId));

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
      const getList = await dispatch(getAllEmployees(data.companyId));

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
  async (idCompany: string, { rejectWithValue, dispatch }) => {
    try {
      await employeeApi.delete(idCompany);
      const getList = await dispatch(getAllEmployees(idCompany));

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
