import BookingItem from "@/components/Bookings/BookingItem";
import { Card, Checkbox, Col, Empty, Row, Select, Spin } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const Bookings = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [dataSoure, setDataSource] = useState<Reservation[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [parkingLotState, setparkingLotState] = useState<ParkingLot[]>([]);
  const handleChange = async (id: string) => {
    fetch(
      `http://localhost:8088/api/merchant/ticket/get-all?parking_lot_id=${id}`,
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
        console.log(res.data);
        setDataSource(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setDataSource(reservations);
  }, [reservations]);

  useEffect(() => {
    let idCompany = localStorage.getItem("COMPANY_ID");
    fetch(
      `http://localhost:8088/api/merchant/parking-lot/get-list?company_id=${idCompany}`,
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
        console.log(res.data);
        setparkingLotState(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>Booking</h1>
      <Card className="mb-4">
        <Row gutter={[20, 20]}>
          <Col span={12}>
            <Select
              placeholder="Select parking lot"
              className="w-full"
              onChange={handleChange}
            >
              {parkingLotState.map((parkingLot) => (
                <Option value={parkingLot.id} key={parkingLot.id}>
                  {parkingLot.name}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={12}></Col>
          <Col span={12}></Col>
        </Row>
      </Card>
      <Card>
        {isLoading && <Spin size="large" />}
        <Row gutter={[20, 20]}>
          {dataSoure.length > 0 ? (
            dataSoure?.map((reservation: Reservation) => (
              <Col span={8} key={reservation.id}>
                <BookingItem reservation={reservation} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Empty className="justify-center" />
            </Col>
          )}
        </Row>
      </Card>
    </div>
  );
};

export default Bookings;
