import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectParkingLot } from "@/store/selectors";
import { Button, Card, Col, Popconfirm, Row, Table, Tag, Tooltip } from "antd";
import Search from "antd/lib/input/Search";
import { useState } from "react";

import { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import AddEmployee from "@/components/Employees/AddEmployee";

const Employees = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<Employee>>([]);
  const parkingLotState = useAppSelector(selectParkingLot);
  const dispatch = useAppDispatch();
  const [employeeId, setEmployeeId] = useState<string>();

  const handleDelete = (id: string) => {
    console.log(id);
  };

  const columns: ColumnsType<Employee> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Status",
      dataIndex: "isDeleted",
      align: "center",
      render: (status: string) =>
        status != "ACTIVE" ? (
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
      render: (id: string) => {
        return (
          <div className="flex gap-2.5 justify-start flex-col md:flex-row">
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsVisible(true);
                  setEmployeeId(id);
                }}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                okText="Yes"
                cancelText="No"
                title="Are you sure to delete this employee lot?"
                onConfirm={() => handleDelete(id)}
              >
                <Button danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const handleSearch = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <h1>Employees</h1>
      <Card>
        <Row gutter={[20, 20]}>
          <Col span={8}>
            <Search
              className="full"
              size="large"
              placeholder="Search"
              allowClear
              enterButton
              onSearch={(e) => handleSearch(e)}
            />
          </Col>
          <Col flex="auto" />
          <Col span={4}>
            <Button
              type="primary"
              size="large"
              block
              onClick={() => {
                setIsVisible(true);
              }}
            >
              Add
            </Button>
          </Col>
          <Col span={24}>
            <Table<Employee>
              bordered
              dataSource={dataSource}
              columns={columns}
              loading={parkingLotState.loading}
              rowKey={(row) => row.id!}
            />
          </Col>
        </Row>
      </Card>

      <AddEmployee
        employeeId={employeeId}
        isVisible={isVisible}
        onCancel={() => setIsVisible(false)}
      />
    </div>
  );
};

export default Employees;
