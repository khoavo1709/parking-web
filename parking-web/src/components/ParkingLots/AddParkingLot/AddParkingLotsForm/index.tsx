import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { Col, Form, Input, Row, TimePicker, FormInstance } from "antd";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const { TextArea } = Input;

interface IProps {
  form: FormInstance;
  parkingLot: ParkingLot | null;
  isVisible: boolean;
  map: React.ReactElement;
  address: string;
  setAddress: (addr: string) => void;
  setMarker: (_: google.maps.LatLngLiteral) => void;
}

const ParkingLotsForm = (props: IProps) => {
  const form = props.form;
  const [placeAutocomplete, setPlaceAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const inputRef = useRef<HTMLInputElement>(null);
  const places = useMapsLibrary("places");
  const map = useMap();

  const onPlaceSelect = (place: google.maps.places.PlaceResult | null) => {
    if (!place) return;
    const lat = place.geometry?.location?.lat();
    const lng = place.geometry?.location?.lng();

    if (!lat || !lng) return;
    form.setFieldValue("lat", lat);
    form.setFieldValue("long", lng);
    form.setFieldValue("address", place.formatted_address);

    if (map && place.geometry?.viewport) {
      map.fitBounds(place.geometry?.viewport);
      props.setMarker({
        lat: lat!,
        lng: lng!,
      });
    }
  };

  useEffect(() => {
    if (!places) {
      return;
    }

    if (!places || !inputRef.current) {
      return;
    }

    const options: google.maps.places.AutocompleteOptions = {
      fields: ["geometry", "name", "formatted_address"],
      componentRestrictions: { country: ["vn"] },
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
      props.setAddress(tmp.address);
    }
  }, [props.parkingLot]);

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
          <Input placeholder="name" />
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
          <div className="autocomplete-container mr-4">
            <input
              value={props.address}
              onChange={(e) => {
                form.setFieldValue("address", e.target.value);
                props.setAddress(e.target.value);
              }}
              ref={inputRef}
              placeholder="address"
              className="w-full h-7 rounded-md px-2 border-[0.5px] ring-0 border-[#D9D9D9] focus:border-[#2078FF] focus:outline-none"
            />
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
