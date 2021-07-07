// Создание случайных целых чисел в диапазоне

const generateIntegralNum = (a, b) => {

  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));

  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
};

// Создание случайных целых чисел в диапазоне END

// Создание случайных чисел с плавающей точкой после запятой

const generateNonIntegralNum = (a, b, numAfterPoint) => {

  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));

  const result = Math.random() * (upper - lower) + lower;

  return result.toFixed(numAfterPoint);
};

// Создание случайных чисел с плавающей точкой после запятой END

export {generateIntegralNum, generateNonIntegralNum};
