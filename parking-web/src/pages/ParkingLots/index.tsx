import { blockApi, parkingLotApi, timeFrameApi } from "@/api";
import GoogleMap from "@/components/Map";
import { useAppDispatch } from "@/store/hooks";
import { parkingLotActions } from "@/store/reducers/parkingLotSlice";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Form, message, Modal, Steps } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import AddBlockForm from "./AddBlockForm";
import ParkingLotsForm from "./AddParkingLotsForm";
import TimeFrameForm from "./AddTimeFrameForm";
import styles from "./index.module.less";

const { Step } = Steps;
interface IProps {
  parkingLotId: string | undefined;
  isVisible: boolean;
  onCancel: Function;
}

type parkingLotData = {
  parkingLot?: any;
  blocks?: any;
  timeFrames?: any;
};

const AddParkingLot = (props: IProps) => {
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lotForm] = Form.useForm();
  const [blocksForm] = Form.useForm();
  const [timeFramesForm] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState<parkingLotData>({});
  const [parkingLot, setParkingLot] = useState<ParkingLot|null>(null)
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
      parkingLotApi.getOne(props.parkingLotId)
        .then((res) => {
          setParkingLot(res.data.data as ParkingLot)
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

  const handleUpdate = async () => {
    try {
      parkingLotApi.update(parkingLot.id, {...data.parkingLot, blocks: data.blocks, timeFrames: data.timeFrames}).then((res) => {
      if (res.status >= 200 && res.status <= 299) {
        dispatch(parkingLotActions.getAllParkingLots(props.parkingLotId));
        message.success("You have successfully updated a this parking lot.");
        setIsLoading(false);
        props.onCancel();
        reset();
      } 
      }) .catch((error) => {
        if (error.response) {
          console.error("Server error:", error.response.status, error.response.data);
          message.error("An error occurred while updating the parking lot. Please try again later.");
        } else if (error.request) {
          console.error("Request error:", error.request);
          message.error("There was a network error. Please check your connection and try again.");
        } else {
          console.error("Error:", error.message);
          message.error("An unexpected error occurred. Please try again later.");
        }
      });
    } catch (e) {
      console.error("Unexpected error:", e);
    }
  };

  const reset = () => {
    lotForm.resetFields();
    blocksForm.resetFields();
    timeFramesForm.resetFields();
    setCurrent(0);
  };

  // const handleUpdate = async (id: string) => {
    // setIsLoading(true);
    // try {
    //   const data = form.getFieldValue;
    //   if (current == 0) {
    //     //load block, when click next
    //     const blocks = form.getFieldValue("blocks");
    //     if (!blocks) {
    //       const res = await blockApi.getAll(props.editData?.idParkingLot);
    //       if (res.data.data) {
    //         const blocks = res.data.data.map((e: Block) => {
    //           return {
    //             blockCode: e.blockCode,
    //             from: e.ParkingSlots[0].slotNumber,
    //             to: e.ParkingSlots[e.ParkingSlots.length - 1].slotNumber,
    //           };
    //         });
    //         form.setFieldsValue({ blocks });
    //       }
    //     }
    //     setCurrent(current + 1);
    //   } else if (current == 1 && data("blocks").length > 0) {
    //     //load timeframe, when click next
    //     const durations = form.getFieldValue("durations");
    //     if (!durations) {
    //       const res = await timeFrameApi.getAll(props.editData?.idParkingLot);
    //       if (res.data.data) {
    //         const durations = res.data.data.map((e: TimeFrame) => {
    //           return {
    //             time: e.duration,
    //             price: e.cost,
    //           };
    //         });
    //         form.setFieldsValue({ durations });
    //       }
    //     }
    //     setCurrent(current + 1);
    //   } else if (current == 2 && data("durations").length > 0) {
    //     setCurrent(current + 1);
    //   } else if (current == 3) {
    //     const parkingLot: ParkingLot = {
    //       name: data("name"),
    //       address: data("address"),
    //       description: data("description") ?? "",
    //       long: data("long"),
    //       lat: data("lat"),
    //       idParkingLot: props.editData?.idParkingLot ?? "",
    //       isDeleted: false,
    //       idCompany: authState.auth?.idCompany ?? "",
    //     };
    //     //update parking lot
    //     const isUpdated = await dispatch(parkingLotActions.updateParkingLot(parkingLot)).unwrap();
    //
    //     if (!isUpdated) {
    //       setIsLoading(false);
    //       message.error("You have failed. Please try again");
    //     }
    //
    //     //update block and slot
    //     const blocks = data("blocks").map((e: any) => {
    //       return {
    //         ...e,
    //         numOfSlot: e.to - e.from + 1,
    //         idParkingLot: props.editData?.idParkingLot,
    //       };
    //     });
    //     const res = await blockApi.update(props.editData?.idParkingLot, blocks);
    //     if (!res.data.data) {
    //       message.error("You have failed. Please try again");
    //     }
    //     //update time frame
    //     const timeFrames = data("durations").map((e: any) => {
    //       return {
    //         duration: e.time,
    //         cost: e.price,
    //         idParkingLot: props.editData?.idParkingLot,
    //       };
    //     });
    //
    //     const updatedTimeFrames = await timeFrameApi.update(
    //       props.editData?.idParkingLot,
    //       timeFrames,
    //     );
    //     if (updatedTimeFrames.data.data) {
    //       message.success("You have successfully updated this parking lot.");
    //     } else {
    //       message.error("You have failed. Please try again");
    //     }
    //     setIsLoading(false);
    //     props.onCancel();
    //     form.resetFields();
    //     setCurrent(0);
    //   }
    // } catch (error) {
    //   message.error(`${error}`);
    // }
    // setIsLoading(false);
  //
  //   setIsLoading(false);
  //   props.onCancel();
  //   reset();
  //
  //   dispatch(parkingLotActions.getAllParkingLots(id));
  // };

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
            <Step key={item.title} title={item.title} description={item.description} />
          ))}
        </Steps>
        <ParkingLotsForm
          parkingLot={parkingLot}
          form={lotForm}
          isVisible={current == 0}
          map={
            <div className="w-full aspect-[2] mb-8">
              this is a map
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
                <Button className=" w-[100px]" loading={isLoading} onClick={handleSubmit}>
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
