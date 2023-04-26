import axios from "axios";
import { webStorage } from "./webStorage";

const axiosSetup = {
  json: axios.create({
    headers: {
      common: {
        "Content-Type": "application/json",
      },
    },
  }),
  formData: axios.create({
    headers: {
      common: {
        "Content-Type": "multipart/form-data",
      },
    },
  }),
};

if (typeof window !== "undefined" && webStorage.get("user")) {
  const { token } = webStorage.get("token");
  axiosSetup.json.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosSetup.formData.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export const fetchApi = axiosSetup;
