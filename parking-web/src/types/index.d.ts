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
  status: string;
};

type Block = {
  id?: string;
  code: string;
  description: string;
  idParkingLot: string;
  isFull: boolean;
  slot: number;
  ParkingSlots: Array<ParkingSlot>;
  ParkingLot?: ParkingLot;
};

type TimeFrame = {
  id?: string;
  parkingLotId: string;
  duration: number;
  cost: number;
};

type Employee = {
  id?: string;
  name: string;
  email: string;
  phoneNumber: string;
  companyID: string;
  status: string;
  startShiftTime: any;
  endShiftTime: any;
};

type Company = {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  status: string;
};

type Reservation = {
  id: string;
  idVehicle: string;
  idUser: string;
  idParkingSlot: string;
  idTimeFrame: string;
  startTime: string;
  endTime: string;
  bookingDate: string;
  total: string;
  state: string;
  parkingSlot: Slot;
  Vehicle: Vehicle;
  TimeFrame: TimeFrame;
  parkingLot: ParkingLot;
  isGoodReview?: boolean;
  comment?: boolean;
  user?: {
    displayName: string;
  };
};

type Vehicle = {
  idVehicle: string;
  idUser: string;
  name: string;
  number: string;
  type: string;
};
