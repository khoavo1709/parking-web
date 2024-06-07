import { Card, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";
interface IProps {
  idParkingLot: string;
}
const CommentDetails = (props: IProps) => {
  const [data, setData] = useState<Array<Reservation>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const columns: ColumnsType<Reservation> = [
    {
      title: "User",
      dataIndex: "user",
      align: "center",
      width: "20%",
      render: (user: { displayName: string }) => {
        return user.displayName;
      },
    },
    {
      title: "Review",
      dataIndex: "isGoodReview",
      align: "center",
      width: "10%",
      render: (isGoodReview: boolean) => {
        return (
          <>
            {isGoodReview ? (
              <p className="text-green-600">Possitive</p>
            ) : (
              <p className="text-yellow-600">Negative</p>
            )}
          </>
        );
      },
    },
    {
      title: "Comment",
      dataIndex: "comment",
      align: "center",
    },
  ];

  useEffect(() => {
    fetch(
      `http://localhost:8088/api/merchant/ticket/get-all?parking_lot_id=${props.idParkingLot}`,
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
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [props.idParkingLot]);

  return (
    <Row gutter={[20, 20]}>
      <Col span={24}>
        <h3 className=" text-xl">Comments</h3>
        <Col flex="auto" />
        <Card>
          <Table<Reservation>
            bordered
            columns={columns}
            dataSource={data?.filter((v) => !!v.comment)}
            loading={isLoading}
            rowKey={(row) => row.id!}
            pagination={{ pageSize: 5 }}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default CommentDetails;
