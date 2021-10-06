import React from "react";

import { render } from "../../utils/test-utils";

import Map from "./Map";

const map = { controls: [[]], fitBounds: jest.fn() };
const bounds = { extended: jest.fn(), union: jest.fn() };

const place = {
  geometry: { viewport: "GEOMETRY" },
  location: { viewport: "LOCATION" },
};

const infoWindow = {
  close: jest.fn(),
  open: jest.fn(),
  setContent: jest.fn(),
  addListener: jest.fn(),
};

const searchBox = {
  addListener: jest.fn(),
  getPlaces: jest.fn(() => [place]),
};

const mapSpy = jest.fn();
class MapClass {
  constructor() {
    mapSpy();
    return map;
  }
}

const sizeSpy = jest.fn();
class Size {
  constructor() {
    sizeSpy();
    return "SIZE";
  }
}

const pointSpy = jest.fn();
class Point {
  constructor() {
    pointSpy();
    return "POINT";
  }
}

const boundsSpy = jest.fn();
class LatLngBounds {
  constructor() {
    boundsSpy();
    return bounds;
  }
}

const markerSpy = jest.fn();
class Marker {
  constructor() {
    markerSpy();
    return "POINT";
  }
}

const searchSpy = jest.fn();
class SearchBox {
  constructor() {
    searchSpy();
    return searchBox;
  }
}

const infoSpy = jest.fn();
class InfoWindow {
  constructor() {
    infoSpy();
    return infoWindow;
  }
}

const google = {
  maps: {
    Map: MapClass,
    Size,
    Point,
    LatLngBounds,
    Marker,
    InfoWindow,
    places: { SearchBox },
    ControlPosition: { TOP_CENTER: 0 },
  },
};

describe("Given Map component", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("When renders", () => {
    global.google = google;
    it("Then create Map, SearchBox and InfowWindow", () => {
      const component = render(<Map />);

      expect(mapSpy).toHaveBeenCalled();
      expect(searchSpy).toHaveBeenCalled();
      expect(infoSpy).toHaveBeenCalled();
      component.unmount();
    });
  });
});
