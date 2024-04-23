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