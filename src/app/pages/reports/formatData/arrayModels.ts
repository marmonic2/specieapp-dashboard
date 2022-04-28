/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */

function matchLengthArray(arraysOfKeys:any[], objectWithData:any) {
  for (let i = 0; i < arraysOfKeys.length; ++i) {
    while (objectWithData[arraysOfKeys[i].key].length !== arraysOfKeys[i].length) {
      objectWithData[arraysOfKeys[i].key].push(arraysOfKeys[i].object);
    }
  }
  return objectWithData;
}

function addObjectoToArray(arraysOfKeys:any[], arrayData:any[]) {
  const newArrayData = arrayData.map((value) => matchLengthArray(arraysOfKeys, value));
  return newArrayData;
}

function emptyObjects(arraysOfKeys:any[]) {
  const objectEmpty = {};
  arraysOfKeys.forEach((key) => {
    objectEmpty[key] = '';
  });
  return objectEmpty;
}

function getGretestLength(arrayData:any[], arraysOfKeys:any[]) {
  arrayData.forEach((data) => {
    arraysOfKeys.forEach((element, i) => {
      if (data[element.key].length > 0 && data[element.key].length >= element.length) {
        arraysOfKeys[i].length = data[element.key].length;
        arraysOfKeys[i].object = emptyObjects(Object.keys(data[element.key][0]));
      }
    });
  });
  return arraysOfKeys;
}

function getArraysToObject(arrayData:any[], keys:any[]) {
  const arraysOfKeys = [];
  keys.forEach((key) => {
    if (Array.isArray(arrayData[0][key])) {
      arraysOfKeys.push({
        key,
        length: arrayData[0][key].length,
      });
    }
    return false;
  });
  return getGretestLength(arrayData, arraysOfKeys);
}

function getKeys(arrayData:any[]) {
  const keys = Object.keys(arrayData[0]);
  return getArraysToObject(arrayData, keys);
}

export function formattedArrayData(arrayData:any[]) {
  if (arrayData.length > 0) {
    const keys = getKeys(arrayData);
    const newArrayData = addObjectoToArray(keys, arrayData) || arrayData;
    return newArrayData;
  }
}
