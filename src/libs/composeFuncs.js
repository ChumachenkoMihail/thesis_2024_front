// call two or more functions
/**
 * compose functions
 * @param funcs
 * @returns call all function
 */
export const composeFunctions = (...funcs) => {
  return funcs.reduce(
    (f, g) =>
      (...args) =>
        f(g(...args)),
  );
};
