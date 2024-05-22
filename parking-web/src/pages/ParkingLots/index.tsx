import AddParkingLot from "@/components/ParkingLots/AddParkingLot";
import { useAdmin } from "@/hooks/useAdmin";
import { changeParkingLotStatus } from "@/store/actions/parkingLotAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { parkingLotActions } from "@/store/reducers/parkingLotSlice";
import { selectParkingLot } from "@/store/selectors";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Select,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StatusTag = ({ status }: { status: string }) => {
  if (status == "active") {
    return <Tag color="green">active</Tag>;
  }
  if (status == "inactive") {
    return <Tag color="gray">inactive</Tag>;
  }
  return <Tag color="yellow">pending</Tag>;
};

const StatusOptions = ({
  status,
  parkingLot,
}: {
  status: string;
  parkingLot: ParkingLot;
}) => {
  const dispatch = useAppDispatch();

  const handleChangeStatus = (status: string) => {
    dispatch(changeParkingLotStatus({ id: parkingLot.id!, status }))
      .then(() => {
        message.success(
          `you have successfully updated the status of ${parkingLot.name}`,
        );
      })
      .catch((e) => {
        console.log(e);
        message.error("Can not change this parking lot's status at the moment");
      });
  };

  return (
    <Select
      defaultValue={status}
      className="w-[100px]"
      onChange={handleChangeStatus}
    >
      <Select.Option value="active">active</Select.Option>
      <Select.Option value="inactive">inactive</Select.Option>
    </Select>
  );
};

const ParkingLots: FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const parkingLotState = useAppSelector(selectParkingLot);
  const [dataSource, setDataSource] = useState<Array<ParkingLot>>(
    parkingLotState.parkingLots,
  );
  const [idParkingLot, setIdParkingLot] = useState<string>();
  const dispatch = useAppDispatch();
  const { isAdmin } = useAdmin();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

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
      dataIndex: "status",
      align: "center",
      render: (status: string, parkingLot) => (
        <>
          {isAdmin == false && <StatusTag status={status} />}
          {isAdmin == true && (
            <StatusOptions status={status} parkingLot={parkingLot} />
          )}
        </>
      ),
    },
    {
      title: "",
      dataIndex: "id",
      align: "center",
      width: "10%",
      render: (id: string, parkingLot) => {
        return (
          <div className="flex gap-2.5 justify-center flex-col md:flex-row">
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
            {isAdmin == false && (
              <Tooltip title="Edit">
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => {
                    setIsVisible(true);
                    setIdParkingLot(id);
                  }}
                />
              </Tooltip>
            )}
            {parkingLot.isDeleted || isAdmin || isAdmin == undefined ? null : (
              <Tooltip title="Delete">
                <Popconfirm
                  okText="Yes"
                  cancelText="No"
                  title="Are you sure to delete this parking lot?"
                  onConfirm={() => handleDelete(id)}
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

  const handleDelete = (id: string) => {
    dispatch(parkingLotActions.deleteParkingLot(id));
  };

  const handleSearch = (search: string, filter: string) => {
    setSearch(search);
    setFilter(filter);

    let tmp = parkingLotState.parkingLots;

    if (search) {
      tmp = parkingLotState.parkingLots.filter(
        (e) => e.name.toLowerCase().search(search.toLowerCase()) >= 0,
      );
    }

    if (filter != "all") {
      tmp = tmp.filter((e) => e.status == filter);
    }

    setDataSource(tmp);
  };

  const handleParkingLotsUpdate = () => {
    handleSearch(search, filter);
  };

  useEffect(() => {
    const idCompany = localStorage.getItem("COMPANY_ID");
    dispatch(parkingLotActions.getAllParkingLots(idCompany));
  }, [dispatch]);

  useEffect(() => {
    handleParkingLotsUpdate();
  }, [parkingLotState.parkingLots]);

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
              onSearch={(e) => handleSearch(e, filter)}
            />
          </Col>
          <Col>
            <Select
              value={filter}
              onChange={(e) => handleSearch(search, e)}
              className="w-[100px] h-10"
            >
              <Select.Option value="all">All</Select.Option>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="active">Active</Select.Option>
              <Select.Option value="inactive">Inactive</Select.Option>
            </Select>
          </Col>

          <Col flex="auto" />
          {isAdmin != undefined && !isAdmin && (
            <Col span={4}>
              <Button
                type="primary"
                size="large"
                block
                onClick={() => {
                  setIsVisible(true);
                  setIdParkingLot(undefined);
                }}
              >
                Add
              </Button>
            </Col>
          )}
          <Col span={24}>
            <Table<ParkingLot>
              bordered
              dataSource={dataSource}
              columns={columns}
              loading={parkingLotState.loading}
              rowKey={(row) => row.id!}
            />
          </Col>
        </Row>
      </Card>

      <AddParkingLot
        parkingLotId={idParkingLot}
        isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
      />
    </div>
  );
};

export default ParkingLots;
