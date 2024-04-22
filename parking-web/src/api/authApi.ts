import axiosClient from "./axiosClient";

const authApi = {
  login: ({ email, password }: any) => {
    const url = `/v1/auth/login`;
    return axiosClient.post(url, { email, password });
  },
  signup: ({ email, password, companyName, phoneNumber }: any) => {
    const url = `/v1/company/create`;
    return axiosClient.post(url, { email, password, companyName, phoneNumber });
  },
  verify: (accessToken: any) => {
    const url = "/v1/auth/verify";
    return axiosClient.post(url, { accessToken });
  },
  updatePassword: (idCompany: any, password: string, newPassword: string) => {
    const url = `/v1/auth/password/${idCompany}`;
    return axiosClient.patch(url, { password: password, newPassword: newPassword });
  },
  update: (idCompany: any, data: any) => {
    const url = `/v1/auth/${idCompany}`;
    return axiosClient.patch(url, data);
  },
};
export default authApi;
