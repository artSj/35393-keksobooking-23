import {generateCardsArray} from './markup.js';
import {renderMarkersArray} from './map.js';

const PRICE_RANGES = {
  low: {
    min: 0,
    max: 10000,
  },
  middle: {
    min: 10000,
    max: 50000,
  },
  high: {
    min: 50000,
    max: Infinity,
  },
};

const mapFilters = document.querySelector('.map__filters');
const wifiInput = mapFilters.querySelector('#filter-wifi');
const dishwasherInput = mapFilters.querySelector('#filter-dishwasher');
const parkingInput = mapFilters.querySelector('#filter-parking');
const washerInput = mapFilters.querySelector('#filter-washer');
const elevatorInput = mapFilters.querySelector('#filter-elevator');
const conditionerInput = mapFilters.querySelector('#filter-conditioner');
const housingTypeSelect = mapFilters.querySelector('#housing-type');
const housingPriceSelect = mapFilters.querySelector('#housing-price');
const housingRoomsSelect = mapFilters.querySelector('#housing-rooms');
const housingGuestsSelect = mapFilters.querySelector('#housing-guests');


const getOfferRank = (offer) => {

  let rank = 0;

  if (offer.offer.features !== undefined) {

    for (let i = 0; i < offer.offer.features.length; i++) {
      if (wifiInput.checked) {
        if (offer.offer.features[i] === wifiInput.value) {
          rank += 1;
        }
      }
      if (dishwasherInput.checked) {
        if (offer.offer.features[i] === dishwasherInput.value) {
          rank += 1;
        }
      }
      if (parkingInput.checked) {
        if (offer.offer.features[i] === parkingInput.value) {
          rank += 1;
        }
      }
      if (washerInput.checked) {
        if (offer.offer.features[i] === washerInput.value) {
          rank += 1;
        }
      }
      if (elevatorInput.checked) {
        if (offer.offer.features[i] === elevatorInput.value) {
          rank += 1;
        }
      }
      if (conditionerInput.checked) {
        if (offer.offer.features[i] === conditionerInput.value) {
          rank += 1;
        }
      }
    }
  }

  return rank;
};

const sortOffers = (offerA, offerB) => {
  const rankA = getOfferRank(offerA);
  const rankB = getOfferRank(offerB);

  return rankB - rankA;
};

const sortType = (offer) => offer.offer.type === housingTypeSelect.value;

const sortPrice = (offer) => {
  let rank = 0;

  if (housingPriceSelect.value === 'low') {
    if (offer.offer.price >= PRICE_RANGES.low.min && offer.offer.price <= PRICE_RANGES.low.max) {
      rank += 3;
    }
  }

  if (housingPriceSelect.value === 'middle') {
    if (offer.offer.price >= PRICE_RANGES.middle.min && offer.offer.price <= PRICE_RANGES.middle.max) {
      rank += 3;
    }
  }

  if (housingPriceSelect.value === 'high') {
    if (offer.offer.price >= PRICE_RANGES.high.min && offer.offer.price <= PRICE_RANGES.high.max) {
      rank += 3;
    }
  }

  return rank;
};

const sortRooms = (offer) => offer.offer.rooms === Number(housingRoomsSelect.value);

const sortGuests = (offer) => offer.offer.guests === Number(housingGuestsSelect.value);

const renderFilteredOffers = (offers, markersLayer, PIN_MAX_QUANTITY) => {
  const wifiValue = wifiInput.checked;
  const dishwasherValue = dishwasherInput.checked;
  const parkingValue = parkingInput.checked;
  const washerValue = washerInput.checked;
  const elevatorValue = elevatorInput.checked;
  const conditionerValue = conditionerInput.checked;
  const housingTypeValue = housingTypeSelect.value;
  const housingPriceValue = housingPriceSelect.value;
  const housingRoomsValue = housingRoomsSelect.value;
  const housingGuestsValue = housingGuestsSelect.value;

  let newOffers = offers.slice();

  if (housingTypeValue !== 'any') {
    newOffers = newOffers.filter(sortType);
  }

  if (housingPriceValue !== 'any') {
    newOffers = newOffers.filter(sortPrice);
  }

  if (housingRoomsValue !== 'any') {
    newOffers = newOffers.filter(sortRooms);
  }

  if (housingGuestsValue !== 'any') {
    newOffers = newOffers.filter(sortGuests);
  }

  if (wifiValue || dishwasherValue || parkingValue || washerValue || elevatorValue || conditionerValue) {
    newOffers = newOffers.filter(getOfferRank);
    newOffers = newOffers.sort(sortOffers);
  }

  newOffers = newOffers.slice(0, PIN_MAX_QUANTITY);

  const newCards = generateCardsArray(newOffers);
  const newOffersMarkers = renderMarkersArray(newOffers, newCards);
  markersLayer.clearLayers();
  for (let i = 0; i < newOffersMarkers.length; i++) {
    newOffersMarkers[i]
      .addTo(markersLayer);
  }
};

export {renderFilteredOffers};
