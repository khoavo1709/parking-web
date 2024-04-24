import { Form, Button, Space, InputNumber, FormInstance } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { numberValidator } from "@/utils/validator";
import { useEffect } from "react";

interface IProps {
  form: FormInstance;
  parkingLot: ParkingLot | null;
  isVisible: boolean;
}

const TimeFrameForm = (props: IProps) => {
  useEffect(() => {
    if (props.parkingLot) {
      props.form.resetFields();
      props.form.setFieldsValue({ timeFrames: props.parkingLot.timeFrames });
    }
  }, [props.parkingLot]);

  const DurationValidator = (rule: any, value: any, callback: any) => {
    const index = rule.field.split(".")[1];
    if (value != null) {
      const res = props.form
        .getFieldsValue()
        .timeFrames.find((x: any, i: number) => x.time == value && i != index);
      if (res) callback("Duration is being duplicated!");
      else callback();
    } else {
      callback();
    }
  };

  if (!props.isVisible) {
    return null;
  }

  return (
    <Form
      form={props.form}
      layout="vertical"
      className=" overflow-y-scroll max-h-[300px]"
    >
      <Form.List name="timeFrames">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }: any) => (
              <Space
                key={key}
                align="baseline"
                className="flex px-10 justify-start items-center"
              >
                <Form.Item
                  {...restField}
                  style={{ marginRight: "60px" }}
                  label="Duration"
                  name={[name, "duration"]}
                  fieldKey={[fieldKey, "duration"]}
                  className=""
                  rules={[
                    { required: true, message: "Please, enter duration." },
                    { validator: DurationValidator },
                  ]}
                >
                  <InputNumber
                    min={0}
                    maxLength={18}
                    step={30}
                    addonAfter="minute"
                    placeholder="Duration"
                  />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Price"
                  name={[name, "cost"]}
                  fieldKey={[fieldKey, "cost"]}
                  rules={[
                    { required: true, message: "Please, enter price." },
                    { validator: numberValidator },
                  ]}
                >
                  <InputNumber
                    min={0}
                    maxLength={18}
                    step={50000}
                    addonAfter="₫"
                    placeholder="Price"
                    formatter={(value: any) =>
                      value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                  />
                </Form.Item>
                <MinusCircleOutlined
                  className=" ml-10"
                  onClick={() => remove(name)}
                />
              </Space>
            ))}
            <Form.Item className="px-10 mt-5">
              <Button onClick={() => add()} block icon={<PlusOutlined />} />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default TimeFrameForm;
