import baseAxios from "axios";

export const baseURL =
  process.env.REACT_APP_BE_API ||
  `${window.location.protocol}//${window.location.host}`;

const axios = baseAxios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default axios;
