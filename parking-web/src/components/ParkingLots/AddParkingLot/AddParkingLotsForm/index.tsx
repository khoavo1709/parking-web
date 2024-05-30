import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Col, Form, Input, Row, TimePicker, FormInstance } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const { TextArea } = Input;

interface IProps {
  form: FormInstance;
  parkingLot: ParkingLot | null;
  isVisible: boolean;
  map: React.ReactElement;
}

const ParkingLotsForm = (props: IProps) => {
  const form = props.form;
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    console.log(place?.adr_address);
  };

  useEffect(() => {
    if (!places || !inputRef.current) {
      console.log("im fucked");
      return;
    }

    const options = {
      fields: ["geometry", "name", "formatted_address"],
    };

    setPlaceAutocomplete(new places.Autocomplete(inputRef.current, options));
  }, [places]);

  useEffect(() => {
    if (!placeAutocomplete) return;

    placeAutocomplete.addListener("place_changed", () => {
      onPlaceSelect(placeAutocomplete.getPlace());
    });
  }, [placeAutocomplete]);

  useEffect(() => {
    form.resetFields();
    if (props.parkingLot) {
      console.log(props.parkingLot);
      const tmp = props.parkingLot;
      form.setFieldsValue({
        name: tmp.name,
        address: tmp.address,
        lat: tmp.lat,
        long: tmp.long,
        description: tmp.description,
        startTime: moment(tmp.startTime, "HH:mm"),
        endTime: moment(tmp.endTime, "HH:mm"),
      });
    }
  }, [form, props.parkingLot]);

  if (!props.isVisible) {
    return null;
  }

  const timeValidator = async (_: any, value: any) => {
    if (value != null) {
      const { startTime, endTime } = props.form.getFieldsValue();
      if (startTime > endTime)
        throw new Error("Start time must not be greater than end time");
    }
  };

  return (
    <div>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Name"
          name="name"
          rules={[
            { required: true, message: "Please input parking lot name!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Start time"
              name="startTime"
              rules={[
                { required: true, message: "Please input start time!" },
                { validator: timeValidator },
              ]}
            >
              <TimePicker format={"HH:mm"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="End time"
              name="endTime"
              rules={[
                { required: true, message: "Please input end time!" },
                { validator: timeValidator },
              ]}
            >
              <TimePicker format={"HH:mm"} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true, message: "Please input address!" }]}
        >
          <div className="autocomplete-container">
            <TextArea ref={inputRef} rows={2} />
          </div>
        </Form.Item>
        {props.map}
        <Row gutter={[20, 0]}>
          <Col span={12}>
            <Form.Item
              label="Lat"
              name="lat"
              rules={[{ required: true, message: "Please input lat!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Long"
              name="long"
              rules={[{ required: true, message: "Please input long!" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Description" name="description">
          <TextArea rows={2} />
        </Form.Item>
      </Form>
    </div>
  );
};

export default ParkingLotsForm;
