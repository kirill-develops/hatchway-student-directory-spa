// provided an array of numbers, this function will find the average
// if only one value, will return first value of array
const findAverage = (numberArray = []) => {
  if (numberArray.length < 1) { return numberArray[0]; }
  if (typeof numberArray === 'number') { return numberArray; }

  const sum = numberArray.reduce((partialSum, num) => partialSum + Number(num), 0);

  return sum / numberArray.length;
};

export default findAverage;
