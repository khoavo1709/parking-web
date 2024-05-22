import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectEmployee } from "@/store/selectors";
import {
  Button,
  Card,
  Col,
  Popconfirm,
  Row,
  Table,
  Tag,
  Tooltip,
  message,
} from "antd";
import Search from "antd/lib/input/Search";
import { useEffect, useState } from "react";

import { ColumnsType } from "antd/es/table";
import {
  DeleteOutlined,
  EditOutlined,
  UnderlineOutlined,
} from "@ant-design/icons";
import AddEmployee from "@/components/Employees/AddEmployee";
import { employeeActions } from "@/store/reducers/employeeSlice";
import moment from "moment";
import { deleteEmployee } from "@/store/actions/employeeAction";

const Employees = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<Array<Employee>>([]);
  const employeeState = useAppSelector(selectEmployee);
  const dispatch = useAppDispatch();
  const [employeeId, setEmployeeId] = useState<string>();

  const columns: ColumnsType<Employee> = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Start shift",
      dataIndex: "startShiftTime",
      render: (time: string) => moment(time).format("HH:mm"),
    },
    {
      title: "End shift",
      dataIndex: "endShiftTime",
      render: (time: string) => moment(time).format("HH:mm"),
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: string) =>
        status == "active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="gray">Inactive</Tag>
        ),
    },
    {
      title: "",
      dataIndex: "id",
      align: "center",
      width: "10%",
      render: (id: string) => {
        return (
          <div className="flex gap-2.5 justify-center flex-col md:flex-row">
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

  const handleDelete = (id: string) => {
    try {
      dispatch(deleteEmployee(id));
    } catch (e) {
      console.log(e);
      message.error("Can not delete this employee at the moment");
    }
  };

  useEffect(() => {
    const companyID = localStorage.getItem("COMPANY_ID");
    dispatch(employeeActions.getAllEmployees(companyID));
  }, [dispatch]);

  useEffect(() => {
    console.log(employeeState.employees);
    setDataSource(employeeState.employees);
  }, [employeeState.employees]);

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
              loading={employeeState.loading}
              rowKey={(row) => row.id!}
            />
          </Col>
        </Row>
      </Card>

      <AddEmployee
        employeeId={employeeId}
        isVisible={isVisible}
        onCancel={() => {
          setIsVisible(false);
          setEmployeeId(undefined);
        }}
      />
    </div>
  );
};

export default Employees;
