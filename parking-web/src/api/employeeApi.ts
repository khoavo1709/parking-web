import axiosClient from "./axiosClient";

const url: string = "/v1/emplloyee";

const parkingLotApi = {
  getAll: (id: any) => {
    return axiosClient.get(`${url}/get-list?companyId=${id}`);
  },

  create: (data: any) => {
    return axiosClient.post(`${url}/create`, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/get-one/${id}`);
  },

  update: (id: string, data: any) => {
    return axiosClient.put(`${url}/update/${id}`, { ...data, id: id });
  },

  delete: (id: string) => {
    return axiosClient.delete(`${url}/delete/${id}`);
  },
};
export default parkingLotApi;
