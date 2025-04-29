const getMinOfAverages = (...arrays) =>
  Math.min(
    ...arrays
      .filter((arr) => arr.length > 0)
      .map((arr) => arr.reduce((sum, num) => sum + num, 0) / arr.length),
  );

console.log(getMinOfAverages([1, 2, 3], [4, 5, 6, 7], [10, 20]));
console.log(getMinOfAverages([5], [10, 20, 30]));
console.log(getMinOfAverages([-1, -2, -3], [0, 0, 0]));
console.log(getMinOfAverages());
