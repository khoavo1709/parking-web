import axiosClient from "./axiosClient";

const merchantUrl: string = "/merchant/parking-lot";

const parkingLotApi = {
  getAll: (id: any) => {
    return axiosClient.get(`${merchantUrl}/get-list?company=${id}`);
  },
};

export default parkingLotApi;
