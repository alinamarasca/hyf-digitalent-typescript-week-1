// If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9.
// The sum of these multiples is 23.
// Find the sum of all the multiples of 3 or 5 below 1000.

const assessment1 = number => {
  let arr = [];
  for (let i = 0; i < number; i++) {
    if (i % 3 === 0 || i % 5 === 0) {
      arr.push(i);
    }
  }
  return arr.reduce((acc, curr) => acc + curr, 0);
};

console.log(assessment1(1000));
