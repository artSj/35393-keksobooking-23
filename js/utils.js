// Распознавание нажатия Esc

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

// Распознавание нажатия Esc END

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {isEscEvent, debounce};
