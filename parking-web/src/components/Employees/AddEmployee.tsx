import { useAppDispatch } from "@/store/hooks";
import { LockTwoTone } from "@ant-design/icons";
import {
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
      const data = form.getFieldsValue();
      message.success(data);

      if (!props.employeeId) {
        handleAdd();
        message.success("You have successfully added a new employee");
      } else {
        handleUpdate();
        message.success("You have successfully update employee");
      }

      props.onCancel();
      form.resetFields;
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {};

  const handleUpdate = async () => {};

  const timeValidator = async (rule: any, value: any) => {
    if (value != null) {
      const { startTime, endTime } = form.getFieldsValue();
      if (startTime > endTime)
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
      <Form className="mt-5" layout="vertical" onFinish={handleSubmit}>
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
              <Select defaultValue={"active"}>
                <Select.Option value="active">active</Select.Option>
                <Select.Option value="inactive">inactive</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
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
              label="Shift start time"
              name="shiftStartTime"
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
              label="Shift end time"
              name="shiftEndTime"
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
