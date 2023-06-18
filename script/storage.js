'use strict';
const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};
const getFromStorage = function (key) {
  return localStorage.getItem(key);
};
