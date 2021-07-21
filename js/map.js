import {activateForm} from './form.js';

const INITIAL_COORDINATES = {
  lat: 35.681700,
  lng: 139.753891,
};

const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const myAddress = document.querySelector('#address');

const offersMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const myMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const renderMarkersArray = (offers, popupElements) => {

  const markers = [];

  for (let i = 0; i < offers.length; i++) {
    const marker = L.marker(
      {
        lat: offers[i].location.lat,
        lng: offers[i].location.lng,
      },
      {
        icon: offersMarkerIcon,
      },
    );

    marker.bindPopup(popupElements[i]);

    markers[i] = marker;
  }

  return markers;
};

const myPin = L.marker(
  {
    lat: INITIAL_COORDINATES.lat,
    lng: INITIAL_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: myMarkerIcon,
  },
);

const generateInitialAddress = () => myAddress.defaultValue = `${INITIAL_COORDINATES.lat.toFixed(5)  }, ${  myPin._latlng .lng.toFixed(5)}`;
const generateAddress = (evt) => myAddress.defaultValue = `${evt.target.getLatLng().lat.toFixed(5)  }, ${  evt.target.getLatLng().lng.toFixed(5)}`;

const initialiseMap = (offersMarkers) => {

  const map = L.map('map-canvas')
    .on('load', () => {
      activateForm();
    })
    .setView({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    }, 12);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);

  const markersLayer = L.layerGroup().addTo(map);

  if (offersMarkers) {
    for (let i = 0; i < offersMarkers.length; i++) {
      offersMarkers[i]
        .addTo(markersLayer);
    }
  }

  myPin.addTo(map);
  generateInitialAddress();

  myPin.on('moveend', (ev) => {
    generateAddress(ev);
  });

  adForm.addEventListener('reset',  () => {

    myPin.setLatLng({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    });

    generateInitialAddress();

    map.setView({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    }, 12);
  });

  mapFilters.addEventListener('reset', () => {
    myPin.setLatLng({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    });

    generateInitialAddress();

    map.setView({
      lat: INITIAL_COORDINATES.lat,
      lng: INITIAL_COORDINATES.lng,
    }, 12);

    for (let i = 0; i < offersMarkers.length; i++) {
      offersMarkers[i]
        .addTo(markersLayer);
    }
  });

  return markersLayer;
};

export {initialiseMap, renderMarkersArray, generateInitialAddress};
