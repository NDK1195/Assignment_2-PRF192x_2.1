'use strict';
// DOM Elements
const inputBreedEle = document.getElementById('input-breed');
const selectTypeEle = document.getElementById('input-type');
const breedTableBodyEle = document.getElementById('tbody');

const btnSubmit = document.getElementById('submit-btn');
// Global variables
let breedArr = JSON.parse(getFromStorage('breedArr')) ?? [];
/*-------------------------
   FUNCTIONS
---------------------------*/
// Render breed table function
// input: breed array
const renderBreedTable = function (breedArr) {
  // Delete existing data
  breedTableBodyEle.innerHTML = '';
  // Add data to table
  for (let i = 0; i < breedArr.length; i++) {
    // Create row
    const row = document.createElement('tr');
    // Add data to row
    row.innerHTML = `
      <td>${breedArr[i].id}</td>
      <td>${breedArr[i].name}</td>
      <td>${breedArr[i].type}</td>
      <td><button class="btn btn-danger" onclick="deleteBreed('${breedArr[i].id}')">Delete</td>
    `;
    // Add row to table
    breedTableBodyEle.appendChild(row);
  }
};
// clear input function
const clearInput = function () {
  inputBreedEle.value = '';
  selectTypeEle.value = '';
};
// Get data from input function
// Output: breed object
const getDataFromInput = function () {
  const breedObj = {
    id: '',
    name: '',
    type: '',
  };

  breedObj.id = Date.now() + '';
  breedObj.name = inputBreedEle.value.trim();
  breedObj.type = selectTypeEle.value;

  return breedObj;
};
// validate data function
// input: breed obj
// output: validate result (true or false)
const validateData = function (breedObj) {
  let result = true;
  try {
    if (breedObj.name === '') {
      throw 'Please enter Breed name!';
    }
    if (breedObj.type === '') {
      throw 'Please select Breed type!';
    }
  } catch (error) {
    alert(error);
    result = false;
  }
  return result;
};
// delete breed function
// input: breed id
const deleteBreed = function (breedId) {
  // confirm before delete
  if (confirm('Are you sure?')) {
    // find breed index to delete
    const breedIndex = breedArr.findIndex(breedObj => breedObj.id === breedId);

    // delete breed from array and save to local storage
    breedArr.splice(breedIndex, 1);
    saveToStorage('breedArr', JSON.stringify(breedArr));
    breedArr = JSON.parse(getFromStorage('breedArr'));
    // rerender table
    renderBreedTable(breedArr);
  }
};
const init = function () {
  renderBreedTable(breedArr);
};
init();
/*-------------------------
   HANDLE EVENTS
---------------------------*/
// Handle submit button click event
btnSubmit.addEventListener('click', function (e) {
  e.preventDefault();
  // get data from input
  const breedObj = getDataFromInput();

  //  validate data
  const validateResult = validateData(breedObj);
  if (validateResult) {
    // add breed obj to breed array and save to local storage
    breedArr.push(breedObj);
    saveToStorage('breedArr', JSON.stringify(breedArr));
    breedArr = JSON.parse(getFromStorage('breedArr'));

    clearInput();
    // render data to table
    renderBreedTable(breedArr);
  }
});
console.log(breedArr);
