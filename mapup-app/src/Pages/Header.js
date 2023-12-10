import React from "react";

export default function Header() {
  return (
    <div className="header">
      <h1>US Toll Calculator – Maps with Tolls & Gas Costs</h1>
      <p>
        Looking to calculate toll costs between cities across North America? Use
        the this App! See trip cost breakdown - tolls, fuel and other applicable
        charges, toll plazas, discounts, etc. Travel on the cheapest or the
        fastest routes to your destination. For all vehicles - car, truck (2
        axle to 9 axle), EV, RV, bus, motorcycle - across all Latin American and
        North American countries.
      </p>
      <p>
        Business? Integrate Toll API for pre-trip, on-trip and post-trip toll
        and route information.
      </p>
      <p>
        Still not convinced? Just enter your From, destination, and press
        calculate toll to see tolls in seconds. Fill the optional fields -
        mileage, toll tags etc. - to get more accurate results.
      </p>
    </div>
  );
}
