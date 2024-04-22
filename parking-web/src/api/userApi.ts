import axiosClient from "./axiosClient";

const url = "/v1/user";

const userApi = {
  getAllUsers: async () => {
    return await axiosClient.get(`${url}`);
  },

  getUser: async (id: String) => {
    return await axiosClient.get(`${url}/${id}`);
  },
};
export default userApi;
