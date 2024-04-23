import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.less";

const { Step } = Steps;
interface IProps {
  parkingLotId: string | undefined;
  isVisible: boolean;
  onCancel: Function;
}

const AddParkingLot = (props: IProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [blocksForm] = Form.useForm();
  const [timeFramesForm] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const steps = [
    {
      title: `${props.parkingLotId ? "Change paring lot" : "Add parking lot"}`,
      description: "Enter information of your parking",
    },
    {
      title: "Set up block",
      description: "",
    },
    {
      title: "Set up time and price",
      description: "",
    },
    {
      title: "Submit",
      description: "",
    },
  ];

  useEffect(() => {
    if (props.parkingLotId) {
      // fetch parking lot by id
    }
  }, [props.parkingLotId]);

  const handleSubmit = () => {
    setIsLoading(true);
    if (current == 0) {
      next();
    } else if (current == 1 && blocksForm.getFieldValue("blocks")) {
      next();
    } else if (current == 2 && timeFramesForm.getFieldValue("timeFrames")) {
      next();
    } else if (current == 3) {
      if (!props.parkingLotId) {
        handleAdd();
      } else {
        handleUpdate();
      }
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {};

  const handleUpdate = async () => {};

  const reset = () => {
    setCurrent(0);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  return (
    <Modal
      className="m-5"
      title={props.parkingLotId ? "Update paring lot" : "Add parking lot"}
      centered
      closable
      width={800}
      footer={null}
      open={props.isVisible}
      onCancel={() => {
        reset();
        props.onCancel();
      }}
    >
      <div className="px-5">
        <Steps current={current}>
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
              description={item.description}
            />
          ))}
        </Steps>
        {current == 3 && (
          <div className=" text-xl text-center">
            <QuestionCircleOutlined
              style={{ fontSize: "40px", color: "#08c", marginBottom: "10px" }}
            />
            <h3>Are you sure about your parking information?</h3>
          </div>
        )}
        <Form layout="vertical" onFinish={handleSubmit}>
          <div className={styles["steps-action"]}>
            {current > 0 && (
              <Button className=" w-[100px] mx-2" onClick={prev}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Form.Item>
                <Button
                  className=" w-[100px]"
                  loading={isLoading}
                  onClick={handleSubmit}
                >
                  Next
                </Button>
              </Form.Item>
            )}
            {current === steps.length - 1 && (
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                  Submit
                </Button>
              </Form.Item>
            )}
          </div>
        </Form>
      </div>
    </Modal>
  );
};

export default AddParkingLot;
