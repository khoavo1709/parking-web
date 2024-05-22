import { createSlice } from "@reduxjs/toolkit";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "@/store/actions/employeeAction";

export type EmployeeState = {
  employees: Array<Employee>;
  loading: boolean;
  error: any;
};

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null,
};

export const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllEmployees.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employees = payload;
      })
      .addCase(getAllEmployees.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employees = payload;
      })
      .addCase(createEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(updateEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteEmployee.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.employees = payload;
      })
      .addCase(deleteEmployee.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const employeeActions = {
  ...employeeSlice.actions,
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
