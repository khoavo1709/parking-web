import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, Modal, Steps } from "antd";
import { useEffect, useState } from "react";
import styles from "./index.module.less";
import ParkingLotsForm from "./AddParkingLotsForm";
import { parkingLotApi } from "@/api";
import AddBlockForm from "./AddBlockForm";
import TimeFrameForm from "./AddTimeFrameForm";

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
  const [parkingLot, setParkingLot] = useState<ParkingLot | null>(null);
  const [lotForm] = Form.useForm();

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
      parkingLotApi
        .getOne(props.parkingLotId)
        .then((res) => {
          setParkingLot(res.data.data as ParkingLot);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.parkingLotId]);

  const handleSubmit = () => {
    setIsLoading(true);
    try {
      if (current == 0) {
        lotForm.validateFields().then(() => {
          const idCompany = localStorage.getItem("COMPANY_ID");
          let { name, address, lat, long, description, startTime, endTime } =
            lotForm.getFieldsValue();
          startTime = moment(startTime).subtract(20, "hours");
          endTime = moment(endTime).subtract(20, "hours");
          const parkingLot = {
            name,
            address,
            lat: parseFloat(lat),
            long: parseFloat(long),
            description,
            startTime,
            endTime,
            companyID: idCompany,
          };

          setData((old) => ({ ...old, parkingLot: parkingLot }));
          next();
        });
      } else if (current == 1 && blocksForm.getFieldValue("blocks")) {
        blocksForm.validateFields().then(() => {
          setData((old) => ({ ...old, blocks: blocksForm.getFieldValue("blocks") }));
          next();
        });
      } else if (current == 2 && timeFramesForm.getFieldValue("timeFrames")) {
        timeFramesForm.validateFields().then(() => {
          setData((old) => ({ ...old, timeFrames: timeFramesForm.getFieldValue("timeFrames") }));
          next();
        });
      } else if (current == 3) {
        if (!props.parkingLotId) {
          handleAdd();
        } else {
          handleUpdate();
        }
      }
    } catch (error) {
      // message.error(`${error}`);
      message.error(JSON.stringify(error));
    }
    setIsLoading(false);
  };

  const handleAdd = async () => {
    console.log(data.parkingLot);
    const newParkingLot = await dispatch(
      parkingLotActions.createParkingLot(data.parkingLot),
    ).unwrap();

    if (!newParkingLot) {
      setIsLoading(false);
      message.error("You have failed. Please try again");
    }

    //add block and slot
    const blocks = data.blocks.map((b: any) => {
      return {
        code: b.code,
        slot: b.slot,
        parking_lot_id: newParkingLot.id,
      };
    });

    try {
      blocks.forEach((b: any) => {
        blockApi.create(b);
      });
    } catch (e) {
      console.log(e);
      message.error("You have failed. Please try again");
    }

    const timeFrames = data.timeFrames.map((t: any) => {
      return {
        duration: t.duration,
        cost: t.cost,
        parkingLotId: newParkingLot.id,
      };
    });
    console.log(timeFrames);

    try {
      timeFrames.forEach((t: any) => {
        timeFrameApi.create(t);
      });
    } catch (e) {
      console.log(e);
      message.error("You have failed. Please try again");
    }

    message.success("You have successfully added a new parking lot.");
    dispatch(parkingLotActions.getAllParkingLots(newParkingLot.id));
    setIsLoading(false);
    props.onCancel();
    reset();
  };

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
        <ParkingLotsForm
          parkingLot={parkingLot}
          form={lotForm}
          isVisible={current == 0}
          map={
            <div className="w-full aspect-[2] mb-8">
              <div>This is a map</div>
            </div>
          }
        />
        <AddBlockForm
          form={blocksForm}
          parkingLot={parkingLot}
          isVisible={current == 1}
        />
        <TimeFrameForm
          form={timeFramesForm}
          parkingLot={parkingLot}
          isVisible={current == 2}
        />
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
