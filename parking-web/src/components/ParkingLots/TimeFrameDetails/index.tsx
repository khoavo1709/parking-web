import { useEffect, useState } from "react";
interface IProps {
  idParkingLot: string;
}
const TimeFrameDetails = (props: IProps) => {
  const [data, setData] = useState<Array<TimeFrame>>();

  useEffect(() => {
    fetch(
      `http://localhost:8088/api/merchant/time-frame/get-list?parkingLotId=${props.idParkingLot}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res);
      })
      .then((res) => {
        console.log(res.data?.data);
        setData(res.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.idParkingLot]);

  return <div>{JSON.stringify(data)}</div>;
};

export default TimeFrameDetails;
