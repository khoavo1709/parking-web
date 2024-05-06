import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, FormInstance, Input, InputNumber, Row } from "antd";
import { useEffect, useState } from "react";

type Props = {
  form: FormInstance;
  parkingLot: ParkingLot | null;
  isVisible: boolean;
};

const AddBlockForm = (props: Props) => {
  const [clickAdd, setClickAdd] = useState<number>(0);

  useEffect(() => {
    if (props.parkingLot) {
      props.form.setFieldsValue({ blocks: props.parkingLot.blocks });
    }
  }, [props.parkingLot]);

  const BlockCodeValidator = async (rule: any, value: any) => {
    const index = rule.field.split(".")[1];
    if (value != null) {
      const res = props.form
        .getFieldsValue()
        .blocks.find((x: any, i: number) => x.code == value && i != index);
      if (res) console.log("Block code is being duplicated!");
      if (res) throw new Error("Block code is being duplicated!");
    }
  };

  if (!props.isVisible) {
    return null;
  }

  return (
    <Form form={props.form} layout="vertical">
      <Form.List name="blocks">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }: any) => (
              <Row key={key} gutter={[20, 20]}>
                <Col span={12}>
                  <Form.Item
                    label="Block code"
                    {...restField}
                    name={[name, "code"]}
                    fieldKey={[fieldKey, "blockCode"]}
                    rules={[
                      { required: true, message: "Please input block code!" },
                      { validator: BlockCodeValidator },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    {...restField}
                    name={[name, "slot"]}
                    fieldKey={[fieldKey, "slot"]}
                    label="Slot numbers"
                    rules={[
                      { required: true, message: "Enter number of slots" },
                      // { validator: SlotNumberValidator },
                    ]}
                  >
                    <InputNumber min={0} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={2} className=" flex items-center">
                  <MinusCircleOutlined
                    className=" ml-5"
                    onClick={() => {
                      remove(name);
                      setClickAdd(clickAdd - 1);
                    }}
                  />
                </Col>
              </Row>
            ))}
            <Form.Item className="mt-5">
              <Button
                onClick={() => {
                  props.form.validateFields().then(() => {
                    add();
                    setClickAdd(clickAdd + 1);
                  });
                }}
                block
                icon={<PlusOutlined />}
              />
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddBlockForm;
