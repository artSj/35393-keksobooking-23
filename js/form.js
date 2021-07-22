import {isEscEvent} from './utils.js';

const SELECT_ONE_GUEST = 1;
const SELECT_TWO_GUESTS = 2;
const SELECT_THREE_GUESTS = 3;
const SELECT_NO_GUESTS = 0;
const SELECT_ONE_ROOM = 1;
const SELECT_TWO_ROOMS = 2;
const SELECT_THREE_ROOMS = 3;
const SELECT_HUN_ROOMS = 100;
const MIN_PRICES = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const SEND_DATA_URL = 'https://23.javascript.pages.academy/keksobooking';
const SUFFIX_OPTION_1_CRITERIA_1 = 1;
const SUFFIX_OPTION_1_CRITERIA_2 = 21;
const SUFFIX_OPTION_2_CRITERIA_1 = 5;
const SUFFIX_OPTION_2_CRITERIA_2 = 25;
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('input');
const adFormSelects = adForm.querySelectorAll('select');
const adFormTexts = adForm.querySelectorAll('textarea');
const adFormBtns = adForm.querySelectorAll('button');
const adFormBtnSubmit = adForm.querySelector('.ad-form__submit');
const resetBtn = adForm.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersInputs = mapFilters.querySelectorAll('input');
const mapFiltersSelects = mapFilters.querySelectorAll('select');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const bodyLayout = document.querySelector('body');
const roomsSelect = adForm.querySelector('#room_number');
const roomsSelectVal = roomsSelect.value;
const typesSelect = adForm.querySelector('#type');
const typesSelectVal = typesSelect.value;
const offerAvatarInput = adForm.querySelector('.ad-form-header__upload input[type=file]');
const offerAvatarPreview = adForm.querySelector('.ad-form-header__preview');
const offerAvatarPreviewIco = adForm.querySelector('.ad-form-header__preview img');
const offerPhotoInput = adForm.querySelector('.ad-form__upload input[type=file]');
const offerPhotoPreview = adForm.querySelector('.ad-form__photo');

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');

  for (const input of adFormInputs) {
    input.disabled = true;
  }

  for (const select of adFormSelects) {
    select.disabled = true;
  }

  for (const text of adFormTexts) {
    text.disabled = true;
  }

  for (const btn of adFormBtns) {
    btn.disabled = true;
  }

  for (const input of mapFiltersInputs) {
    input.disabled = true;
  }

  for (const select of mapFiltersSelects) {
    select.disabled = true;
  }
};


const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');

  for (const input of adFormInputs) {
    input.disabled = false;
  }

  for (const select of adFormSelects) {
    select.disabled = false;
  }

  for (const text of adFormTexts) {
    text.disabled = false;
  }

  for (const btn of adFormBtns) {
    btn.disabled = false;
  }
};

const activateFilter = () => {
  mapFilters.classList.remove('map__filters--disabled');

  for (const input of mapFiltersInputs) {
    input.disabled = false;
  }

  for (const select of mapFiltersSelects) {
    select.disabled = false;
  }
};

const createValiditySymbolCountMessage = (diff) => {

  if (diff === SUFFIX_OPTION_1_CRITERIA_1 || diff === SUFFIX_OPTION_1_CRITERIA_2) {
    return (`${ diff } символ`);
  } else if ((diff > SUFFIX_OPTION_1_CRITERIA_1 && diff < SUFFIX_OPTION_2_CRITERIA_1) || (diff > SUFFIX_OPTION_1_CRITERIA_2 && diff < SUFFIX_OPTION_2_CRITERIA_2)) {
    return (`${ diff } символа`);
  } else {
    return (`${ diff } символов`);
  }
};

const CustomValidation = function () { };

CustomValidation.prototype = {
  invalidities: [],

  checkValidity: function(input) {
    const validity = input.validity;

    if (validity.tooLong) {
      const max = input.maxLength;
      const diff = input.value.length - max;
      const message = createValiditySymbolCountMessage(diff);

      this.addInvalidity(`Нужно удалить ещё ${ message }`);
    }

    if (validity.tooShort) {
      const min = input.minLength;
      const diff = min - input.value.length;
      const message = createValiditySymbolCountMessage(diff);

      this.addInvalidity(`Нужно ввести ещё ${ message }`);
    }

    if (validity.valueMissing) {
      this.addInvalidity('Это поле обязательно для заполнения');
    }

    if (validity.rangeOverflow) {
      const maxNum = input.max;
      this.addInvalidity(`Значение не должно превышать ${ maxNum }`);
    }

    if (validity.rangeUnderflow) {
      const minNum = input.min;
      this.addInvalidity(`Значение не должно быть меньше ${ minNum }`);
    }

    if (input.disabled) {
      this.addInvalidity('Выберите корректную опцию');
    }

  },

  addInvalidity: function(message) {
    this.invalidities.push(message);
  },

  getInvalidities: function() {
    return this.invalidities.join('. <br>');
  },

  setInvalidityBlank: function () {
    this.invalidities = [];
  },
};

const createCustomValMessage = (field) => {
  const fieldCustomValidation = new CustomValidation;
  fieldCustomValidation.setInvalidityBlank();
  fieldCustomValidation.checkValidity(field);

  const customValidityMessage = fieldCustomValidation.getInvalidities();
  if (customValidityMessage.length) {
    field.insertAdjacentHTML('afterend', `<p class="val_message" style="color: red; font-size: 0.8em;">*${  customValidityMessage  }</p>`);
  }
};

const removeOldCustomValMessages = (input) => {
  const inputParent = input.parentElement;
  const valMessages = inputParent.querySelectorAll('.val_message');

  if (valMessages.length) {
    for (const message of valMessages) {
      inputParent.removeChild(message);
    }
  }
};

const changeCapacityAttrs = (capacityOptions, options) => {

  for (let i = 0; i < capacityOptions.length; i++) {
    capacityOptions[i].disabled = false;
    capacityOptions[i].selected = false;
    capacityOptions[i].removeAttribute('selected');
    let possibility = false;

    for (let j = 0; j < options.length; j++) {
      if (Number(capacityOptions[i].value) === Number(options[j])) {
        possibility = true;
        capacityOptions[i].selected = true;
        capacityOptions[i].setAttribute('selected', 'selected');
      }
    }

    if(!possibility) {
      capacityOptions[i].disabled = true;
    }
  }
};

const validateRoomsCapacity = (roomOption, capacityOptions) => {

  if (Number(roomOption) === SELECT_ONE_ROOM) {

    const options = [SELECT_ONE_GUEST];
    changeCapacityAttrs(capacityOptions, options);
  }

  if (Number(roomOption) === SELECT_TWO_ROOMS) {
    const options = [SELECT_ONE_GUEST, SELECT_TWO_GUESTS];
    changeCapacityAttrs(capacityOptions, options);
  }

  if (Number(roomOption) === SELECT_THREE_ROOMS) {
    const options = [SELECT_ONE_GUEST, SELECT_TWO_GUESTS, SELECT_THREE_GUESTS];
    changeCapacityAttrs(capacityOptions, options);
  }

  if (Number(roomOption) === SELECT_HUN_ROOMS) {
    const options = [SELECT_NO_GUESTS];
    changeCapacityAttrs(capacityOptions, options);
  }

};

const validateTypeCosts = (typeOption) => {
  const priceInput = adForm.querySelector('#price');

  priceInput.min = MIN_PRICES[typeOption];
  priceInput.placeholder = MIN_PRICES[typeOption];
};

const changeCheckingsAttr = (changedElementVal, changingSelects) => {

  for (let i = 0; i < changingSelects.length; i++) {
    if (changingSelects[i].value === changedElementVal) {
      changingSelects[i].selected = true;
      return changingSelects[i];
    }
  }
};

const validateCheckings = () => {
  const timeinSelect = adForm.querySelector('#timein');
  const timeinSelects = timeinSelect.children;
  const timeoutSelect = adForm.querySelector('#timeout');
  const timeoutSelects = timeoutSelect.children;
  let timeinSelectVal = timeinSelect.value;
  let timeoutSelectVal = timeoutSelect.value;

  timeinSelect.addEventListener('change', (evt) => {
    timeinSelectVal = evt.target.value;
    if (String(timeinSelectVal) !== String(timeoutSelectVal)) {
      evt.target.selected = true;
      timeoutSelectVal = changeCheckingsAttr(evt.target.value, timeoutSelects);
    }
  });

  timeoutSelect.addEventListener('change', (evt) => {
    timeoutSelectVal = evt.target.value;
    if (String(timeinSelectVal) !== String(timeoutSelectVal)) {
      evt.target.selected = true;
      changeCheckingsAttr(evt.target.value, timeinSelects);
    }
  });
};

const validateFields = (fieldsArray, evt) => {
  let stopSubmit;

  for (let i = 0; i < fieldsArray.length; i++) {

    const field = fieldsArray[i];

    if (field.checkValidity() === false) {
      removeOldCustomValMessages(field);
      createCustomValMessage(field);
      stopSubmit = true;
    } else {
      removeOldCustomValMessages(field);
      stopSubmit = false;
    }

    if (stopSubmit) {
      evt.preventDefault();
    }
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    bodyLayout.removeChild(bodyLayout.lastChild);
    bodyLayout.removeEventListener('keydown', onPopupEscKeydown);
  }
};

const openModal = (message) => {
  bodyLayout.appendChild(message);

  bodyLayout.addEventListener('keydown', onPopupEscKeydown);

  message.addEventListener('click', () => {
    bodyLayout.removeChild(bodyLayout.lastChild);
    bodyLayout.removeEventListener('keydown', onPopupEscKeydown);
  });
};

const onLoadSuccess = () => {
  const successMessage = successMessageTemplate.cloneNode(true);

  openModal(successMessage);
  adForm.reset();
  mapFilters.reset();
};

const onLoadError = () => {
  const errorMessage = errorMessageTemplate.cloneNode(true);

  openModal(errorMessage);
};

const showPreview = (file, preview, hideIcon) => {
  const name = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => name.endsWith(it));

  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      if (hideIcon) {
        hideIcon();
      }
      preview.style = `background-image: url(${  reader.result}); background-repeat: no-repeat, background-position: center; background-size: cover;`;
    });

    reader.readAsDataURL(file);
  }
};

const validateForm = () => {
  const capacityOptions = adForm.querySelector('#capacity').children;

  adFormBtnSubmit.addEventListener('click', (evt) => {
    validateFields(adFormInputs, evt);
    validateFields(adFormSelects, evt);

  });

  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(SEND_DATA_URL,
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.status} ${response.statusText}`);
    })
      .then(() => onLoadSuccess())
      .catch((err) => {
        onLoadError(err);
      });
  });

  for (let i = 0; i < adFormInputs.length; i++) {
    adFormInputs[i].addEventListener('change', () => {
      removeOldCustomValMessages(adFormInputs[i]);
      createCustomValMessage(adFormInputs[i]);
    });
  }

  validateRoomsCapacity(roomsSelectVal, capacityOptions);

  roomsSelect.addEventListener('change', (evt) => {
    validateRoomsCapacity(evt.target.value, capacityOptions);
  });

  validateTypeCosts(typesSelectVal);

  typesSelect.addEventListener('change', (evt) => {
    validateTypeCosts(evt.target.value);
  });

  validateCheckings();

  offerAvatarInput.addEventListener('change', () => {
    const avatar = offerAvatarInput.files[0];
    const hideIcon = () => offerAvatarPreviewIco.style = 'opacity: 0;';
    showPreview(avatar, offerAvatarPreview, hideIcon);
  });

  offerPhotoInput.addEventListener('change', () => {
    const photo = offerPhotoInput.files[0];
    showPreview(photo, offerPhotoPreview);
  });

  resetBtn.addEventListener('click', () => {
    validateRoomsCapacity(roomsSelectVal, capacityOptions);
    validateTypeCosts(typesSelectVal);
    mapFilters.reset();
  });
};

export {deactivatePage, activateForm, activateFilter, validateForm};
