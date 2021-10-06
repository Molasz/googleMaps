import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";

import Map from "../Map/Map"

const key = "AIzaSyAK8uXlfZrzUSEWe5eWWhE0ykXa-0ic6Z8"

function MapWrapper() {
  const mapRender = (status) => status === "SUCCESS" ? null : <p> {status} </p>

  return (
    <Wrapper
      apiKey={key}
      libraries={['places']}
      render={mapRender}
    >
      <Map />
    </Wrapper>
  );
}

export default MapWrapper;
