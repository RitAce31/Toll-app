const axios = require("axios");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
var cors = require("cors");

dotenv.config();
app.use(express.json());

// use it before all route definitions
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.post("/calc-toll", async (req, res) => {
  try {
    console.log("req", req.body);
    const response = await axios.post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints",
      req.body,
      {
        headers: {
          "x-api-key": "2GBQ8nDgphnGhTtgRJTjpT3rpNdBG2d2",
          "Content-Type": "application/json",
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.post("/calc-toll-opt-param", async (req, res) => {
  try {
    console.log("req", req.body);
    const response = await axios.post(
      "https://apis.tollguru.com/toll/v2/origin-destination-waypoints/",
      req.body,
      {
        headers: {
          "x-api-key": "2GBQ8nDgphnGhTtgRJTjpT3rpNdBG2d2",
          "Content-Type": "application/json",
        },
      }
    );
    res.send(response.data);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(8000, () => {
  console.log("Backend server is running on 8000 port");
});
