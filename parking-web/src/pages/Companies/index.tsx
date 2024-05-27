import { useAdmin } from "@/hooks/useAdmin";
import { changeCompanyStatus } from "@/store/actions/companyAction";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { companyActions } from "@/store/reducers/companySlice";
import { selectCompany } from "@/store/selectors";
import { Card, Col, Row, Select, Table, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import Search from "antd/lib/input/Search";
import { FC, useEffect, useState } from "react";

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
  company,
}: {
  status: string;
  company: Company;
}) => {
  const dispatch = useAppDispatch();

  const handleChangeStatus = (status: string) => {
    dispatch(changeCompanyStatus({ id: company.id!, status }))
      .then(() => {
        message.success(
          `you have successfully updated the status of ${company.name}`
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

const Companies: FC = () => {
  const companyState = useAppSelector(selectCompany);
  const [dataSource, setDataSource] = useState<Array<Company>>(
    companyState.companies
  );
  const dispatch = useAppDispatch();
  const { isAdmin } = useAdmin();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const columns: ColumnsType<Company> = [
    {
      title: "Company name",
      dataIndex: "name",
    },
    {
      title: "Phone number",
      dataIndex: "phoneNumber",
      width: "30%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "30%",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (status: string, company) => (
        <>
          {isAdmin == false && <StatusTag status={status} />}
          {isAdmin == true && (
            <StatusOptions status={status} company={company} />
          )}
        </>
      ),
    },
  ];

  const handleSearch = (search: string, filter: string) => {
    setSearch(search);
    setFilter(filter);

    let tmp = companyState.companies;

    if (search) {
      tmp = companyState.companies.filter(
        (e) => e.name.toLowerCase().search(search.toLowerCase()) >= 0
      );
    }

    if (filter != "all") {
      tmp = tmp.filter((e) => e.status == filter);
    }

    setDataSource(tmp);
  };

  const handleCompaniesUpdate = () => {
    handleSearch(search, filter);
  };

  useEffect(() => {
    dispatch(companyActions.getAllCompanies());
  }, [dispatch]);

  useEffect(() => {
    handleCompaniesUpdate();
  }, [companyState.companies]);

  return (
    <div>
      <h1>Companies</h1>
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
          <Col span={24}>
            <Table<Company>
              bordered
              dataSource={dataSource}
              columns={columns}
              loading={companyState.loading}
              rowKey={(row) => row.id!}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Companies;
