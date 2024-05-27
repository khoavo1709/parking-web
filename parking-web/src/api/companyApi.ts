import axiosClient from "./axiosClient";

const url: string = "/merchant/company";

const companyApi = {
  getAll: () => {
    return axiosClient.get(`${url}`);
  },

  changeStatus: (id: string, status: string) => {
    return axiosClient.put(`${url}/${id}/status`, { status });
  },
};
export default companyApi;
