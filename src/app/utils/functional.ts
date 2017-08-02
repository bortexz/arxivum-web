const R = require('ramda');

/**
 * Function to find by id.
 */
export const findById = (id) => R.find(item => item._id === id);

/**
 * returns a new Object result from assigning a new property to the object provided
 *
 * * note: R.flip ensures the new property overrides the previous one if it existed.
 */
export const assign = R.flip(R.merge);

/**
 * Returns a new array of files where the file passed is filtered
 * file: the file to be filtered.
 */
export const filterFile = R.curry((id, files) =>
  R.filter((item) => item._id !== id)(files));

/**
 * Returns a new array of files where one file has been replaced
 * id: id of the file to be replaced
 * getReplacement: Function with signature file => file, used to get the new value of the file.
 * files: list of the files where to replace the file.
 */
export const replaceFileInList = R.curry((id, getReplacement, files) =>
  R.map((item) => item._id === id ? getReplacement(item) : item)(files));
