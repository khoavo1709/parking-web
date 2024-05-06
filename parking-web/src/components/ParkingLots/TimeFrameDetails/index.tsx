interface IProps {
  idParkingLot: string;
}

const TimeFrameDetails = (props: IProps) => {
  return <div>{props.idParkingLot}</div>;
};

export default TimeFrameDetails;
