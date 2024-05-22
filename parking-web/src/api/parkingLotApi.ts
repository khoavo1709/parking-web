import axiosClient from "./axiosClient";

const url: string = "/v1/parking-lot";
const urlV2: string = "/v2/parking-lot";
const merchantUrl: string = "/merchant/parking-lot";

const parkingLotApi = {
  getAll: (id: any) => {
    const session_type = localStorage.getItem("SESSION_TYPE");
    if (session_type == "admin") {
      return axiosClient.get(`${merchantUrl}/get-list`);
    }
    return axiosClient.get(`${merchantUrl}/get-list?company_id=${id}`);
  },

  create: (data: any) => {
    return axiosClient.post(`${url}/create`, data);
  },

  getOne: (id: any) => {
    return axiosClient.get(`${url}/get-one/${id}`);
  },

  update: (id: string, data: any) => {
    return axiosClient.put(`${urlV2}/update`, { ...data, id: id });
  },

  delete: (id: string) => {
    return axiosClient.delete(`${url}/delete/${id}`);
  },
  checkNameDuplicate: (name: string) => {
    return axiosClient.post(`${url}/check-name`, { name });
  },

  changeStatus: (id: string, status: string) => {
    return axiosClient.put(`${url}/${id}/status`, { status });
  },
};
export default parkingLotApi;
