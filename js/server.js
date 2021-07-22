import {generateCardsArray} from './markup.js';
import {initialiseMap, renderMarkersArray} from './map.js';
import {activateFilter} from './form.js';
import {debounce} from './utils.js';
import {renderFilteredOffers} from './filter.js';

const RERENDER_DELAY = 500;
const PIN_MAX_QUANTITY = 10;
const LOAD_DATA_URL = 'https://23.javascript.pages.academy/keksobooking/data';

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mapLayout = document.querySelector('.map');
const mapFilters = document.querySelector('.map__filters');

const showServerErrorMessage = (err) => {
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageText = errorMessage.querySelector('.error__message');
  const errorMessageBtn = errorMessage.querySelector('.error__button');

  errorMessageText.textContent = `Произошла ошибка при загрузке данных с сервера. ${  err}`;
  errorMessageBtn.textContent = 'Продолжить';
  mapLayout.appendChild(errorMessage);

  errorMessageBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    mapLayout.removeChild(errorMessage);
  });
};

const onOffersLoadSuccess = (offers) => {
  const cards = generateCardsArray(offers.slice(0, PIN_MAX_QUANTITY));
  const offersMarkers = renderMarkersArray(offers.slice(0, PIN_MAX_QUANTITY), cards);
  const markersLayer = initialiseMap(offersMarkers);
  activateFilter();

  mapFilters.addEventListener('change', debounce(
    () => renderFilteredOffers(offers, markersLayer, PIN_MAX_QUANTITY),
    RERENDER_DELAY,
  ));
};

const onOffersLoadError = (err) => {
  initialiseMap(0);
  showServerErrorMessage(err);
};

const getOffers = () => {

  fetch(LOAD_DATA_URL)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((offers) => {
      onOffersLoadSuccess(offers);
    })
    .catch((err) => {
      onOffersLoadError(err);
    });
};

export {getOffers};


