import {generateIntegralNum, generateNonIntegralNum} from './utils.js';

const AVATAR_URL = 'img/avatars/user';
const AVATAR_TYPE = '.png';
const AVATAR_MAX_NUM = 10;
const OFFER_TITLE = 'Lorem Ipsum';
const OFFER_PRICE_MIN = 1;
const OFFER_PRICE_MAX = 1000000;
const OFFER_TYPE = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const OFFER_ROOMS_MIN = 1;
const OFFER_ROOMS_MAX = 5;
const OFFER_GUESTS_MIN = 1;
const OFFER_GUESTS_MAX = 20;
const OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTION = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.';
const OFFER_PHOTOS = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const LOCATION_X_MIN = 35.65000;
const LOCATION_X_MAX = 35.70000;
const LOCATION_Y_MIN = 139.70000;
const LOCATION_Y_MAX = 139.80000;
const LOCATION_NUM_AFTER_POINT_MIN = 1;
const LOCATION_NUM_AFTER_POINT_MAX = 5;

// Создание url аватара

const generateUrl = (number) => {
  if (number < 10) {
    return AVATAR_URL + 0 + number + AVATAR_TYPE;
  }

  return AVATAR_URL + number + AVATAR_TYPE;
};

// Создание url аватара END

// Создание массива url аватаров

const generateUrlArray = (amount) => {
  const numbersArray = [];
  const avatarNumbersArray = [];

  for (let i = 0; i < amount; i++) {
    numbersArray[i] = i + 1;
  }

  for (let i = 0; i < amount; i++) {
    const number = generateIntegralNum(0, numbersArray.length);
    const avatarNumber = numbersArray[number];
    avatarNumbersArray[i] = generateUrl(avatarNumber);
    numbersArray.splice(number, 1);
  }

  return avatarNumbersArray;
};

// Создание массива url аватаров END

// Создание массива предложений

const generateOffersArray = (amount) => {
  const offersArray = [];

  const urlArray = generateUrlArray(AVATAR_MAX_NUM);

  for (let i = 0; i < amount; i++) {
    const offerFeatures = OFFER_FEATURES.slice(generateIntegralNum(0, OFFER_FEATURES.length));
    let offerPhotos = [];
    //const locationX = generateNumber(LOCATION_X_MIN, LOCATION_X_MAX - PIN_WIDTH - PIN_WIDTH / 2);
    //const locationY = generateNumber(LOCATION_Y_MIN, LOCATION_Y_MAX - PIN_HEIGHT);
    const locationX = generateNonIntegralNum(LOCATION_X_MIN, LOCATION_X_MAX, generateIntegralNum(LOCATION_NUM_AFTER_POINT_MIN, LOCATION_NUM_AFTER_POINT_MAX));
    const locationY = generateNonIntegralNum(LOCATION_Y_MIN, LOCATION_Y_MAX, generateIntegralNum(LOCATION_NUM_AFTER_POINT_MIN, LOCATION_NUM_AFTER_POINT_MAX));

    if (OFFER_PHOTOS.length > 0) {
      offerPhotos = OFFER_PHOTOS.slice(generateIntegralNum(0, OFFER_PHOTOS.length));
    }

    offersArray[i] = {
      'author':
        {
          'avatar': urlArray[i],
        },
      'offer':
        {
          'title': OFFER_TITLE,
          'address': `${locationX.toString()}, ${locationY.toString()}`,
          // 'price': OFFER_PRICE[generateIntegralNum(0, OFFER_PRICE.length)],
          'price': generateIntegralNum(OFFER_PRICE_MIN, OFFER_PRICE_MAX),
          'type': OFFER_TYPE[generateIntegralNum(0, OFFER_TYPE.length)],
          'rooms': generateIntegralNum(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX),
          'guests': generateIntegralNum(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX),
          'checkin': OFFER_CHECKIN[generateIntegralNum(0, OFFER_CHECKIN.length)],
          'checkout': OFFER_CHECKOUT[generateIntegralNum(0, OFFER_CHECKOUT.length)],
          'featured': offerFeatures,
          'description': OFFER_DESCRIPTION,
          'photos': offerPhotos,
        },
      'location':
        {
          'lat': locationX,
          'lng': locationY,
        },
    };
  }

  return offersArray;
};

// Создание массива предложений END

export {generateOffersArray};
