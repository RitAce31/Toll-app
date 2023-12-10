import axios from "axios";
export const calTollODW = async (obj) => {
  const apiUrl = "http://localhost:8000/calc-toll";
  return axios.post(apiUrl, obj);
};

export const calTollTruck = (obj) => {
  const apiUrl =
    "https://apis.tollguru.com/toll/v2/origin-destination-waypoints/";
  return axios.post(apiUrl, obj);
};

export const calTollOptParam = (obj) => {
  const apiUrl = "http://localhost:8000/calc-toll-opt-param";
  return axios.post(apiUrl, obj);
};
