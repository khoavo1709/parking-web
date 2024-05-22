import { createEmployee } from "@/store/actions/employeeAction";
import { useAppDispatch } from "@/store/hooks";
import { LockTwoTone } from "@ant-design/icons";
import {
  Alert,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Select,
  TimePicker,
  message,
} from "antd";
import { useEffect, useState } from "react";

interface IProps {
  employeeId: string | undefined;
  isVisible: boolean;
  onCancel: () => any;
}

const AddEmployee = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    if (props.employeeId) {
      console.log("fetch employee");
    }
  }, [props.employeeId]);

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      const companyId = localStorage.getItem("COMPANY_ID");
      const {
        name,
        phoneNumber,
        status,
        email,
        password,
        startShiftTime,
        endShiftTime,
      } = form.getFieldsValue();

      const data = {
        name,
        phoneNumber,
        status,
        email,
        password,
        companyID: companyId,
        startShiftTime: new Date(startShiftTime).toISOString(),
        endShiftTime: new Date(endShiftTime).toISOString(),
      };

      console.log(data);

      if (!props.employeeId) {
        handleAdd(data);
        message.success("You have successfully added a new employee");
      } else {
        handleUpdate();
        message.success("You have successfully updated employee");
      }

      form.resetFields();
      props.onCancel();
    } catch (e) {
      message.error("Email was duplicated");
      console.log(e);
    }

    setIsLoading(false);
  };

  const handleAdd = (data: any) => {
    dispatch(createEmployee(data));
  };

  const handleUpdate = () => {};

  const timeValidator = async (rule: any, value: any) => {
    if (value != null) {
      const { startShiftTime, endShiftTime } = form.getFieldsValue();
      if (startShiftTime > endShiftTime)
        throw new Error("Start time must not be greater than end time");
    }
  };

  return (
    <Modal
      className="m-5"
      title={props.employeeId ? "Update employee" : "Add employee"}
      centered
      closable
      width={800}
      footer={null}
      open={props.isVisible}
      onCancel={() => {
        form.resetFields();
        props.onCancel();
      }}
    >
      <Form
        className="mt-5"
        layout="vertical"
        onFinish={handleSubmit}
        form={form}
        initialValues={{ status: "active" }}
      >
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input employee name!" },
              ]}
            >
              <Input placeholder="John Doe" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label={props.employeeId ? "Status" : "Default status"}
              name="status"
              rules={[
                { required: true, message: "Please input employee status!" },
              ]}
            >
              <Select>
                <Select.Option value="active">active</Select.Option>
                <Select.Option value="inactive">inactive</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input placeholder="0123456789" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                { type: "email", message: "Invalid email!" },
              ]}
            >
              <Input placeholder="johndoe@domain.com" />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 6,
                  message: "Password must be minimum 6 characters.",
                },
              ]}
            >
              <Input.Password
                placeholder="Password"
                prefix={<LockTwoTone />}
              ></Input.Password>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Start shift time"
              name="startShiftTime"
              rules={[
                { required: true, message: "Please input start time!" },
                { validator: timeValidator },
              ]}
            >
              <TimePicker format={"HH:mm"} />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="End shift time"
              name="endShiftTime"
              rules={[
                { required: true, message: "Please input end time!" },
                { validator: timeValidator },
              ]}
            >
              <TimePicker format={"HH:mm"} />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end">
          <Form.Item className="ml-auto">
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Submit
            </Button>
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default AddEmployee;
