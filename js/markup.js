import {generateOffersArray} from './offers.js';

const PIN_QUANTITY = 8;
const TYPE_NAMES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card').content;
const offers = Array.from(generateOffersArray(PIN_QUANTITY));

const generateCards = (offer) => {
  const cardElement = cardTemplate.cloneNode(true);
  let cardRooms = ' комнаты для ';
  let cardGuests = ' гостей';
  const featuresList = cardElement.querySelector('.popup__features');
  const featuresItems = cardElement.querySelectorAll('.popup__feature');
  const photosList = cardElement.querySelector('.popup__photos');
  const photoItem = cardElement.querySelector('.popup__photo');

  for (let i = featuresItems.length - 1; i >= 0; i--) {

    let featureUse = 0;

    for (let j = 0; j < offer.offer.featured.length; j++) {
      if (featuresItems[i].classList[1] === (`popup__feature--${  offer.offer.featured[j]}`)) {
        featureUse = 1;
      }
    }

    if (!featureUse) {
      featuresList.removeChild(featuresItems[i]);
    }
  }

  if (offer.offer.rooms === 1) {
    cardRooms = ' комната для ';
  }

  if (offer.offer.guests === 1) {
    cardGuests = ' гостя';
  }

  if (offer.offer.photos.length > 1) {
    for (let i = 1; i < offer.offer.photos.length; i++) {
      photosList.appendChild(photoItem.cloneNode(true));
    }
  }

  const photoItems = cardElement.querySelectorAll('.popup__photo');

  cardElement.querySelector('.popup__avatar').src = offer.author.avatar;
  cardElement.querySelector('.popup__title').innerText = offer.offer.title;
  cardElement.querySelector('.popup__text--address').innerText = offer.offer.address;
  cardElement.querySelector('.popup__text--price').innerText = `${offer.offer.price} ₽/ночь`;
  cardElement.querySelector('.popup__type').innerText = TYPE_NAMES[offer.offer.type];
  cardElement.querySelector('.popup__text--capacity').innerText = offer.offer.rooms + cardRooms + offer.offer.guests + cardGuests;
  cardElement.querySelector('.popup__text--time').innerText = `Заезд после ${  offer.offer.checkin  }, выезд до ${  offer.offer.checkout}`;
  cardElement.querySelector('.popup__description').innerText = offer.offer.description;

  for (let i = 0; i < photoItems.length; i++) {
    photoItems[i].src = offer.offer.photos[i];
  }

  for (let i = 0; i < cardElement.children.length; i++) {
    if (cardElement.children[i].length === 0) {
      cardElement.children[i].style.cssText = 'display: none;';
    }
  }

  if (!offer.offer.price) {
    cardElement.querySelector('.popup__text--price').style.cssText = 'display: none;';
  }

  if (!offer.offer.rooms || !offer.offer.guests) {
    cardElement.querySelector('.popup__text--capacity').style.cssText = 'display: none;';
  }

  if (!offer.offer.checkin || !offer.offer.checkout) {
    cardElement.querySelector('.popup__text--time').style.cssText = 'display: none;';
  }

  if (!offer.offer.type) {
    cardElement.querySelector('.popup__type').style.cssText = 'display: none;';
  }

  if (!offer.offer.photos.length) {
    cardElement.querySelector('.popup__photos').style.cssText = 'display: none;';
  }

  return cardElement;
};

const renderCards = () => {
  const fragmentCard = document.createDocumentFragment();

  fragmentCard.appendChild(generateCards(offers[0]));

  mapCanvas.appendChild(fragmentCard);
};

export {renderCards};

