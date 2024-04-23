import axiosClient from "./axiosClient";

const url: string = "/v1/block";

const blockApi = {
  getAll: (idParkingLot: any) => {
    return axiosClient.get(url + `get-list?idParkingLot=${idParkingLot}`);
  },

  create: async (data: any) => {
    return await axiosClient.post(`${url}/create`, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/get-one/${id}`);
  },

  update: async (idParkingLot: any, data: any) => {
    return await axiosClient.patch(`${url}/update/${idParkingLot}`, data);
  },

  delete: async (id: string) => {
    return await axiosClient.delete(`${url}/delete/${id}`);
  },
};
export default blockApi;
