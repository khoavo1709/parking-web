import axiosClient from "./axiosClient";

const url: string = "/v1/time-frame";

const timeFrameApi = {
  getAll: (idParkingLot: any) => {
    return axiosClient.get(url + `/${idParkingLot}/time-frame`);
  },

  create: async (data: any) => {
    return await axiosClient.post(`${url}/create`, data);
  },
  update: async (idParkingLot: any, data: any) => {
    return await axiosClient.patch(`${url}/update/${idParkingLot}`, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/get-one/${id}`);
  },

  // update: async (id: string, data: any) => {
  //   return await axiosClient.patch(`${url}/update/${id}`, data);
  // },
  //
  // delete: async (id: string) => {
  //   return await axiosClient.delete(`${url}/delete/${id}`);
  // },
};
export default timeFrameApi;
