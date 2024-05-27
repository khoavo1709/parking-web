import { createSlice } from "@reduxjs/toolkit";
import {
  getAllCompanies,
  changeCompanyStatus,
} from "@/store/actions/companyAction";

export type CompanyState = {
  companies: Array<Company>;
  loading: boolean;
  error: any;
};

const initialState: CompanyState = {
  companies: [],
  loading: false,
  error: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCompanies.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCompanies.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companies = payload;
      })
      .addCase(getAllCompanies.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(changeCompanyStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeCompanyStatus.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.companies = payload;
      })
      .addCase(changeCompanyStatus.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export const companyActions = {
  ...companySlice.actions,
  getAllCompanies,
  changeCompanyStatus,
};
