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
const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('input');
const adFormSelects = adForm.querySelectorAll('select');
const adFormTexts = adForm.querySelectorAll('textarea');
const adFormBtns = adForm.querySelectorAll('button');
const adFormBtnSubmit = adForm.querySelector('.ad-form__submit');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersInputs = mapFilters.querySelectorAll('input');
const mapFiltersSelects = mapFilters.querySelectorAll('select');

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

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');

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

  for (const input of mapFiltersInputs) {
    input.disabled = false;
  }

  for (const select of mapFiltersSelects) {
    select.disabled = false;
  }
};

const CustomValidation = function () { };

CustomValidation.prototype = {
  invalidities: [],

  checkValidity: function(input) {
    const validity = input.validity;

    if (validity.tooLong) {
      const max = input.maxLength;
      this.addInvalidity(`Нужно удалить ${  input.value.length - max } символов`);
    }

    if (validity.tooShort) {
      const min = input.minLength;
      const diff = min - input.value.length;

      if (diff === 1 || diff === 21) {
        this.addInvalidity(`Нужно ввести ещё ${ diff } символ`);
      } else if ((diff > 1 && diff < 5) || (diff > 21 && diff < 25)) {
        this.addInvalidity(`Нужно ввести ещё ${ diff } символа`);
      } else {
        this.addInvalidity(`Нужно ввести ещё ${ diff } символов`);
      }

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

const changeCapacityAttrs = (capacityArray, options) => {

  for (let i = 0; i < capacityArray.length; i++) {
    capacityArray[i].disabled = false;
    capacityArray[i].selected = false;
    capacityArray[i].removeAttribute('selected');
    let possibility = false;

    for (let j = 0; j < options.length; j++) {
      if (Number(capacityArray[i].value) === Number(options[j])) {
        possibility = true;
        capacityArray[i].selected = true;
        capacityArray[i].setAttribute('selected', 'selected');
      }
    }

    if(!possibility) {
      capacityArray[i].disabled = true;
    }
  }
};

const validateRoomsCapacity = (roomOption, capacityArray) => {

  if (Number(roomOption) === SELECT_ONE_ROOM) {

    const options = [SELECT_ONE_GUEST];
    changeCapacityAttrs(capacityArray, options);
  }

  if (Number(roomOption) === SELECT_TWO_ROOMS) {
    const options = [SELECT_ONE_GUEST, SELECT_TWO_GUESTS];
    changeCapacityAttrs(capacityArray, options);
  }

  if (Number(roomOption) === SELECT_THREE_ROOMS) {
    const options = [SELECT_ONE_GUEST, SELECT_TWO_GUESTS, SELECT_THREE_GUESTS];
    changeCapacityAttrs(capacityArray, options);
  }

  if (Number(roomOption) === SELECT_HUN_ROOMS) {
    const options = [SELECT_NO_GUESTS];
    changeCapacityAttrs(capacityArray, options);
  }

};

const validateTypeCosts = (typeOption) => {
  const priceInput = adForm.querySelector('#price');

  priceInput.min = MIN_PRICES[typeOption];
  priceInput.placeholder = MIN_PRICES[typeOption];
};

const changeCheckingsAttr = (changedElementVal, changingSelectArray) => {

  for (let i = 0; i < changingSelectArray.length; i++) {
    if (changingSelectArray[i].value === changedElementVal) {
      changingSelectArray[i].selected = true;
      return changingSelectArray[i];
    }
  }
};

const validateCheckings = () => {
  const timeinSelect = adForm.querySelector('#timein');
  const timeinSelectArray = timeinSelect.children;
  const timeoutSelect = adForm.querySelector('#timeout');
  const timeoutSelectArray = timeoutSelect.children;
  let timeinSelectVal = timeinSelect.value;
  let timeoutSelectVal = timeoutSelect.value;

  timeinSelect.addEventListener('change', (evt) => {
    timeinSelectVal = evt.target.value;
    if (String(timeinSelectVal) !== String(timeoutSelectVal)) {
      evt.target.selected = true;
      timeoutSelectVal = changeCheckingsAttr(evt.target.value, timeoutSelectArray);
    }
  });

  timeoutSelect.addEventListener('change', (evt) => {
    timeoutSelectVal = evt.target.value;
    if (String(timeinSelectVal) !== String(timeoutSelectVal)) {
      evt.target.selected = true;
      changeCheckingsAttr(evt.target.value, timeinSelectArray);
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

const validateForm = () => {
  const roomsSelect = adForm.querySelector('#room_number');
  const roomsSelectVal = roomsSelect.value;
  const capacityArray = adForm.querySelector('#capacity').children;
  const typesSelect = adForm.querySelector('#type');
  const typesSelectVal = typesSelect.value;
  const resetBtn = adForm.querySelector('.ad-form__reset');

  adFormBtnSubmit.addEventListener('click', (evt) => {

    validateFields(adFormInputs, evt);
    validateFields(adFormSelects, evt);

  });

  for (let i = 0; i < adFormInputs.length; i++) {
    adFormInputs[i].addEventListener('change', () => {
      removeOldCustomValMessages(adFormInputs[i]);
      createCustomValMessage(adFormInputs[i]);
    });
  }

  validateRoomsCapacity(roomsSelectVal, capacityArray);

  roomsSelect.addEventListener('change', (evt) => {
    validateRoomsCapacity(evt.target.value, capacityArray);
  });

  validateTypeCosts(typesSelectVal);

  typesSelect.addEventListener('change', (evt) => {
    validateTypeCosts(evt.target.value);
  });

  validateCheckings();

  resetBtn.addEventListener('click', () => {
    validateRoomsCapacity(roomsSelectVal, capacityArray);
  });

};

export {deactivatePage, activatePage, validateForm};
