export const isObjectEmpty = (obj) => {
  if (obj === null || obj === undefined) {
    return true; // Object is null or undefined
  }
  return Object.keys(obj).length === 0;
};

export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};
