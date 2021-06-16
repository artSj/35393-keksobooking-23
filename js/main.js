'use strict';

// Создание случайных целых чисел в диапазоне

const generateIntegralNum = (min, max) => {

  if (max < min) {
    return 'Error! Please, write correct max number';
  }

  if (min === max) {
    return max;
  }

  return Math.floor(min + Math.random() * Math.floor(max - min));

};

// Создание случайных целых чисел в диапазоне END

// Вычисление, сколько цифр в переданном числе до запятой

const findDotNum = (num) => {
  const numArray = Array.from(num);

  for (let i = 0; i < numArray.length; i++) {
    if (numArray[i] === '.') {
      return i + 1;
    }
  }

  return 'Error! There is no dot';
};

// Вычисление, сколько цифр в переданном числе до запятой END

// Создание случайных чисел с плавающей точкой после запятой

const generateNonIntegralNum = (min, max, numAfterPoint) => {

  if (max < min) {
    return 'Error! Please, write correct max number';
  }

  if (min === max) {
    return max;
  }

  if (numAfterPoint < 1) {
    return 'Error! Please, write correct numAfterPoint';
  }

  const nonIntegralNum = (min + Math.random() * (max - min)).toString();
  const numBeforePoint = findDotNum(nonIntegralNum);
  return Number(nonIntegralNum.slice(0, numBeforePoint + numAfterPoint));
};

// Создание случайных чисел с плавающей точкой после запятой END

generateIntegralNum();
generateNonIntegralNum();
