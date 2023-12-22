import axios from "axios";
const url = "https://toll-web.onrender.com/";
export const calTollODW = (obj) => {
  const apiUrl = url + "calc-toll";
  return axios.post(apiUrl, obj);
};

// export const calTollTruck = (obj) => {
//   const apiUrl =
//     "https://apis.tollguru.com/toll/v2/origin-destination-waypoints/";
//   return axios.post(apiUrl, obj);
// };

export const calTollOptParam = (obj) => {
  const apiUrl = url + "calc-toll-opt-param";
  return axios.post(apiUrl, obj);
};
