import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import Map from "../Map/Map";

import { key } from "../../config/MAPS_KEY";

function MapWrapper() {
  const mapRender = (status) =>
    status === "SUCCESS" ? null : <p> {status} </p>;

  return (
    <Wrapper apiKey={key} libraries={["places"]} render={mapRender}>
      <Map />
    </Wrapper>
  );
}

export default MapWrapper;
