import { RootState } from ".";

export const selectParkingLot = (state: RootState) => state.parkingLot;
export const selectAuth = (state: RootState) => state.auth;
export const selectEmployee = (state: RootState) => state.employee;
export const selectCompany = (state: RootState) => state.company;
