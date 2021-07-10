const adForm = document.querySelector('.ad-form');
const adFormInputs = adForm.querySelectorAll('input');
const adFormSelects = adForm.querySelectorAll('select');
const adFormTexts = adForm.querySelectorAll('textarea');
const adFormBtns = adForm.querySelectorAll('button');
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

export {deactivatePage, activatePage};
