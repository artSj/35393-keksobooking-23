import {generateCardsArray} from './markup.js';
import {initialiseMap, renderMarkersArray} from './map.js';
import {activateFilter} from './form.js';

const PIN_QUANTITY = 8;

const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const mapLayout = document.querySelector('.map');

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
  const serverOffers = offers.slice(0, PIN_QUANTITY);
  const cards = generateCardsArray(offers.slice(0, PIN_QUANTITY));
  const offersMarkers = renderMarkersArray(serverOffers, cards);
  initialiseMap(offersMarkers);
  activateFilter();

};

const onOffersLoadError = (err) => {
  initialiseMap(0);
  showServerErrorMessage(err);
};

const getOffers = () => {

  fetch('https://23.javascript.pages.academy/keksobooking/data')
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


