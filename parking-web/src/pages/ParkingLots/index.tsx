import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Popconfirm, Row, Table, Tag, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

const ParkingLots: FC = () => {
  const navigate = useNavigate();

  const columns: ColumnsType<ParkingLot> = [
    {
      title: "Parking lot name",
      dataIndex: "name",
    },
    {
      title: "Address",
      dataIndex: "address",
      width: "30%",
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      align: "center",
      render: (isDeleted: boolean) =>
        isDeleted ? (
          <Tag color="red">Deleted</Tag>
        ) : (
          <Tag color="green">Available</Tag>
        ),
    },
    {
      title: "",
      dataIndex: "id",
      align: "center",
      width: "10%",
      render: (id: string, parkingLot) => {
        return (
          <div className="flex gap-2.5 justify-start flex-col md:flex-row">
            <Tooltip title="View details">
              <Button
                type="primary"
                ghost
                icon={<EyeOutlined />}
                onClick={() =>
                  navigate(`/parking-lot/${id}`, { state: parkingLot })
                }
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button type="default" icon={<EditOutlined />} />
            </Tooltip>
            {parkingLot.isDeleted ? null : (
              <Tooltip title="Delete">
                <Popconfirm
                  okText="Yes"
                  cancelText="No"
                  title="Are you sure to delete this parking lot?"
                >
                  <Button danger icon={<DeleteOutlined />} />
                </Popconfirm>
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Parking lots</h1>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search"
              allowClear
              enterButton
            />
          </Col>
          <Col flex="auto" />
          <Col span={4}>
            <Button type="primary" size="large" block>
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Table<ParkingLot> bordered columns={columns} />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ParkingLots;
