type ParkingLot = {
  id?: string;
  name: string;
  description: string;
  address: string;
  lat: string;
  long: string;
  idCompany: string;
  isDeleted: boolean;
  timeFrames?: TimeFrame[];
  blocks?: Block[];
  startTime?: any;
  endTime?: any;
};
