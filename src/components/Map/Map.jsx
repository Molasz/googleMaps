/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import "./Map.css";

const mapOptions = {
  center: { lat: 0, lng: 0 },
  zoom: 3,
};

function Map() {
  const dispatch = useDispatch();

  const [map, setMap] = useState();
  const [searchBox, setSearchBox] = useState();
  const [infoWindow, setInfoWindow] = useState();

  const [selectedMarker, setSelectedMarker] = useState();

  const [iconSize] = useState(new global.google.maps.Size(71, 71));
  const [iconScaledSize] = useState(new global.google.maps.Size(25, 25));
  const [iconOrigin] = useState(new global.google.maps.Point(0, 0));
  const [iconAnchor] = useState(new global.google.maps.Point(17, 34));

  const mapRef = useRef();
  const searchBoxRef = useRef();

  const icon = { iconSize, iconScaledSize, iconOrigin, iconAnchor };

  function onWindowOpen() {
    const deleteBtn = document.getElementsByClassName("window-btn")[0];
    deleteBtn.addEventListener("click", onDeleteMarker);
  }

  function onDeleteMarker() {
    if (!selectedMarker) return;
    selectedMarker.setMap(null);
    setSelectedMarker();
  }

  function onMarkerSelected(marker) {
    setSelectedMarker(marker);
    infoWindow.close();
    const infoText = `${marker.address} ${
      marker.phone ? `| ${marker.phone}` : ""
    }`;
    const photo = marker.photo
      ? `<img src="${marker.photo}" class="window__photo" />`
      : "";
    const anchor = marker.url
      ? `<a href="${marker.url}" target="_blank"> See in maps </a>`
      : "";

    infoWindow.setContent(`
    <div class="window">
      <b class="window__title">${marker.title}</b>
      <p class="window__info">${infoText}</p>
      ${photo}
      <div class="window__footer">
        <button type="button" class="window-btn"> Delete </button>
        ${anchor}
      </div>
    </div>
    `);

    infoWindow.open(marker.getMap(), marker);
  }

  function onSelectLocation() {
    const place = searchBox.getPlaces()[0];
    const bounds = new global.google.maps.LatLngBounds();

    if (!place || !bounds) return;

    if (place.geometry.viewport) bounds.union(place.geometry.viewport);
    else bounds.extend(place.geometry.location);

    map.fitBounds(bounds);

    const newIcon = { ...icon, url: place.icon };

    const newMarker = {
      map,
      icon: newIcon,
      title: place.name,
      position: place.geometry.location,
      optimized: true,
      animation: global.google.maps.Animation.DROP,
      address: place.formatted_address,
      phone: place.formatted_phone_number,
      photo: place.photos?.[0].getUrl(),
      url: place.url,
    };

    dispatch({ type: "addMarker", payload: newMarker });

    const marker = new global.google.maps.Marker(newMarker);
    marker.addListener("click", () => onMarkerSelected(marker));
  }

  useEffect(() => {
    const newMap = new global.google.maps.Map(mapRef.current, mapOptions);

    const newSearchBox = new global.google.maps.places.SearchBox(
      searchBoxRef.current
    );

    const newInfoWindow = new global.google.maps.InfoWindow();

    setMap(newMap);
    setSearchBox(newSearchBox);
    setInfoWindow(newInfoWindow);

    newMap.controls[global.google.maps.ControlPosition.TOP_CENTER].push(
      searchBoxRef.current
    );
  }, []);

  useEffect(() => {
    searchBox?.addListener("places_changed", onSelectLocation);
  }, [searchBox]);

  useEffect(() => {
    infoWindow?.addListener("domready", onWindowOpen);
  });

  return (
    <>
      <div ref={mapRef} className="map" />
      <input
        ref={searchBoxRef}
        className="searchBox"
        data-testid="search-box"
      />
    </>
  );
}

export default Map;
