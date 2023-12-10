import React, { useState } from "react";
import "../App";
import Map from "./Map";
import data from "../data/cities.json";
import { calTollODW, calTollOptParam } from "../Services/Service";
import Loader from "./Loader";

export default function Main() {
  const [focused, setFocused] = useState("");
  const [IsLoaderActive, setIsLoaderActive] = useState(false);
  const [path, setPath] = useState("");
  const [from, setFrom] = useState({});
  const [to, setTo] = useState({});
  const [Res, setRes] = useState({});
  const defCarType = {
    Type: "Select car Type",
    Description: "",
    Axles: 0,
  };
  const [selCarType, setSelCarType] = useState(defCarType);
  const [showOptFuelInfo, setShowOptFuelInfo] = useState(false);
  const defaultFuelInfo = {
    city: 0,
    hwy: 0,
    price: 0,
  };
  const [fuelInfo, setFuelInfo] = useState(defaultFuelInfo);

  const carTypeList = [
    { Type: "Select car Type", Description: "", Axles: 0 },
    { Type: "2AxlesAuto", Description: "Car, SUV or Pickup truck", Axles: 2 },
    {
      Type: "3AxlesAuto",
      Description: "Car, SUV or Pickup truck towing 1-axle trailer",
      Axles: 3,
    },
    {
      Type: "4AxlesAuto",
      Description: "Car, SUV or Pickup truck towing 2-axle trailer",
      Axles: 4,
    },
    {
      Type: "2AxlesDualTire",
      Description: "SUV or Pickup, 4 tires on rear",
      Axles: 2,
    },
    {
      Type: "3AxlesDualTire",
      Description: "SUV or Pickup, 4 tires on rear, 1-axle trailer",
      Axles: 3,
    },
    {
      Type: "4AxlesDualTire",
      Description: "SUV or Pickup, 4 tires on rear, 2-axle trailer",
      Axles: 4,
    },
  ];
  const [filterlist, setFilterlist] = useState([]);
  //#region event
  const onCityPress = (type, obj) => {
    setFilterlist([]);
    setFocused("");
    console.log("Obj", obj);
    if (type === "from") {
      setFrom({
        name: obj.city,
        lat: obj.latitude,
        lng: obj.longitude,
      });
    } else if (type === "to") {
      setTo({
        name: obj.city,
        lat: obj.latitude,
        lng: obj.longitude,
      });
    }
  };
  const onCityChange = (Type, Str) => {
    setFilterlist(
      data.filter((o) => o.city.toLowerCase().includes(Str.toLowerCase()))
    );
    if (Type === "from") {
      setFrom((prev) => ({ ...prev, name: Str, lat: 0, lng: 0 }));
    } else if (Type === "to") {
      setTo((prev) => ({ ...prev, name: Str, lat: 0, lng: 0 }));
    }
  };
  const onTollCalc = () => {
    if (!from.name || from.name == "") {
      alert("Please select from to continue.");
      return;
    }
    if (!to.name || to.name == "") {
      alert("Please select to to continue.");
      return;
    }
    if (selCarType.Type === defCarType.Type) {
      alert("Please select car type to continue.");
      return;
    }
    let obj = {};
    if (showOptFuelInfo) {
      obj = {
        from: {
          address: from.name,
          lat: from.lat,
          lng: from.lng,
        },
        to: {
          address: to.name,
          lat: to.lat,
          lng: to.lng,
        },
        waypoints: [],
        serviceProvider: "here",
        vehicle: {
          type: selCarType.Type,
          axles: selCarType.Axles,
        },
        fuelOptions: {
          fuelCost: {
            value: fuelInfo.price,
            units: "USD/gallon",
            currency: "USD",
            fuelUnit: "gallon",
          },
          fuelEfficiency: {
            city: fuelInfo.city,
            hwy: fuelInfo.hwy,
            units: "mpg",
          },
        },
        units: {
          currency: "USD",
        },
      };
      console.log("Before calling : ", JSON.stringify(obj));
      setIsLoaderActive(true);
      calTollOptParam(obj)
        .then((d) => {
          setIsLoaderActive(false);
          if (d.status === 200) {
            setRes(d.data);
          } else {
            alert("Error while processing calculation of tolls.");
          }
        })
        .catch((ex) => {
          setIsLoaderActive(false);
          alert("Error while fetching data...");
        });
    } else {
      obj = {
        from: {
          address: from.name,
          lat: from.lat,
          lng: from.lng,
        },
        to: {
          address: to.name,
          lat: to.lat,
          lng: to.lng,
        },
        waypoints: [],
        serviceProvider: "here",
        vehicle: {
          type: selCarType.Type,
          axles: selCarType.Axles,
        },
      };
      console.log("Before calling : ", JSON.stringify(obj));
      setIsLoaderActive(true);
      calTollODW(obj)
        .then((d) => {
          setIsLoaderActive(false);
          if (d.status === 200) {
            setRes(d.data);
          } else {
            alert("Error while processing calculation of tolls.");
          }
        })
        .catch((ex) => {
          setIsLoaderActive(false);
          alert("Error while fetching data...");
        });
    }
  };
  //#endregion

  return (
    <div>
      <div className="flex row main">
        <div className="left column flex">
          <div className="input-div">
            <span>From :</span>
            <input
              onFocus={() => setFocused("from")}
              type="text"
              class="custom-textbox"
              placeholder="From..."
              value={from.name}
              onChange={(e) => {
                onCityChange("from", e.target.value);
              }}
            />
            {filterlist && filterlist.length > 0 && focused === "from" ? (
              <div className="custom-textbox" style={{ position: "relative" }}>
                <ul className="dropdown-li" style={{ zIndex: 9 }}>
                  {filterlist.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          onCityPress("from", item);
                        }}
                      >
                        {item.city}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="input-div">
            <span>To :</span>
            <input
              onFocus={() => setFocused("to")}
              type="text"
              class="custom-textbox"
              placeholder="To..."
              value={to.name}
              onChange={(e) => {
                onCityChange("to", e.target.value);
              }}
            />
            {filterlist && filterlist.length > 0 && focused === "to" ? (
              <div className="custom-textbox" style={{ position: "relative" }}>
                <ul className="dropdown-li">
                  {filterlist.map((item, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => {
                          onCityPress("to", item);
                        }}
                      >
                        {item.city}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
          <div className="input-div">
            <label for="exampleSelect">Select car type</label>
            <select
              id="exampleSelect"
              onChange={(e) => {
                let obj = carTypeList.find((c) => c.Type === e.target.value);
                if (obj) setSelCarType(obj);
              }}
              value={selCarType.Type}
            >
              {carTypeList.map((item, index) => {
                return (
                  <option
                    value={item.Type}
                    className="custom-textbox"
                    key={index}
                    label={item.Description + " - " + item.Type}
                  ></option>
                );
              })}
            </select>
          </div>
          <div className="button">
            <div class="optional-label-button">
              <div
                class="button-content"
                onClick={() => {
                  if (!showOptFuelInfo === false) {
                    setFuelInfo(defaultFuelInfo);
                  }
                  setShowOptFuelInfo(!showOptFuelInfo);
                }}
              >
                {showOptFuelInfo ? (
                  <div class="symbol">-</div>
                ) : (
                  <div class="symbol">+</div>
                )}
                <span>Optional Fuel Info</span>
              </div>
            </div>
            {showOptFuelInfo ? (
              <div>
                <div>
                  <span className="opt-lbl">City</span>
                  <input
                    className="custom-textbox"
                    type="number"
                    value={fuelInfo.city}
                    onChange={(e) => {
                      setFuelInfo((prev) => ({
                        ...prev,
                        city: e.target.value,
                      }));
                    }}
                  />
                </div>
                <div>
                  <span className="opt-lbl">Highway</span>
                  <input
                    className="custom-textbox"
                    type="number"
                    value={fuelInfo.hwy}
                    onChange={(e) => {
                      setFuelInfo((prev) => ({ ...prev, hwy: e.target.value }));
                    }}
                  />
                </div>
                <div>
                  <label className="opt-lbl">Enter Fuel Price</label>
                  <input
                    className="custom-textbox"
                    type="number"
                    value={fuelInfo.price}
                    onChange={(e) => {
                      setFuelInfo((prev) => ({
                        ...prev,
                        price: e.target.value,
                      }));
                    }}
                  />
                  <span>$ per gallon</span>
                </div>
              </div>
            ) : null}
          </div>
          <div className="button">
            <div class="optional-label-button">
              <div class="button-content" onClick={onTollCalc}>
                Calculate Toll
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <Map from={from} to={to} data={Res} />
        </div>
      </div>
      <div>
        {Res.routes &&
          Res.routes.map((item, index) => {
            return (
              <ul className="result-li">
                <li>Name : {item.summary.name}</li>
                <li>
                  Distance : {item.summary.distance?.text} miles /{" "}
                  {item.summary.distance?.metric} Kms
                </li>
                <li>Duration : {item.summary.duration?.text}</li>
                <li>Toll : {item.costs?.tagAndCash} $</li>
                <li>Fuel : {item.costs?.fuel} $</li>
                <li>Cost : {item.costs?.tagAndCash + item.costs?.fuel} $</li>
                {item.summary.diffs?.cheapest > 0 ? (
                  <li
                    style={{
                      color: "red",
                    }}
                  >
                    {item.summary.diffs.cheapest} $ higher than the cheapest
                    route.
                  </li>
                ) : null}
              </ul>
            );
          })}
      </div>
      <Loader IsLoaderActive={IsLoaderActive} />
    </div>
  );
}
