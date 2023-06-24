'use strict';
// Get DOM Elements
const btnFind = document.getElementById('find-btn');
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const selectType = document.getElementById('input-type');
const selectBreed = document.getElementById('input-breed');
const checkboxVaccinated = document.getElementById('input-vaccinated');
const checkboxDewormed = document.getElementById('input-dewormed');
const checkboxSterilized = document.getElementById('input-sterilized');

const tableBodyElement = document.getElementById('tbody');

const sidebarElement = document.getElementById('sidebar');
const sidebarTitleElement = document.getElementById('sidebar-title');
// Global variables
let petArr = JSON.parse(getFromStorage('petArr')) ?? [];
const breedArr = JSON.parse(getFromStorage('breedArr')) ?? [];
/*-------------------------
   FUNCTIONS
---------------------------*/
// Get input data functions
// Output: pet data object
const getDataFromInput = function () {
  const petData = {};

  petData.id = inputID.value.trim();
  petData.name = inputName.value.trim();
  petData.type = selectType.value;
  petData.breed = selectBreed.value;
  petData.vaccinated = checkboxVaccinated.checked;
  petData.dewormed = checkboxDewormed.checked;
  petData.sterilized = checkboxSterilized.checked;

  return petData;
};
// Clear input function
const clearInput = function () {
  inputID.value = '';
  inputName.value = '';
  selectType.value = '';
  selectBreed.value = '';
  checkboxVaccinated.checked = false;
  checkboxDewormed.checked = false;
  checkboxSterilized.checked = false;
};

// Render table data function
const renderTableData = function (petArr) {
  // Delete existing data
  tableBodyElement.innerHTML = '';
  // Add data to table
  for (let i = 0; i < petArr.length; i++) {
    // Format date after parse JSON
    const date = new Date(petArr[i].date);
    // Create new row
    const row = document.createElement('tr');
    // Add data to new row;
    row.innerHTML = `
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].name}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td><i class="bi ${petArr[i].dewormed ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? 'bi-check-circle-fill' : 'bi-x-circle-fill'
    }"></i></td>
    <td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td>`;

    //Add row to table
    tableBodyElement.appendChild(row);
  }
};

// Add breed to select breed function
// input: array of breed object
const renderBreed = function (breedArr) {
  // clear select option
  selectBreed.innerHTML = '';
  // add first select option
  const firstOption = document.createElement('option');
  firstOption.value = '';
  firstOption.text = 'Select Breed';
  selectBreed.appendChild(firstOption);
  // add other options
  for (let i = 0; i < breedArr.length; i++) {
    // create new option
    const newOption = document.createElement('option');
    // add data to option
    newOption.value = breedArr[i].name;
    newOption.text = breedArr[i].name;
    // add option to select
    selectBreed.appendChild(newOption);
  }
};
// Search pet function
// input: array of pet object
const searchPet = function (petList) {
  let result = petList;
  if (inputID.value) {
    result = result.filter(pet => pet.id.includes(inputID.value));
  }
  if (inputName.value) {
    result = result.filter(pet => pet.name.includes(inputName.value));
  }
  if (selectType.value !== '') {
    result = result.filter(pet => pet.type === selectType.value);
  }
  if (selectBreed.value !== '') {
    result = result.filter(pet => pet.breed === selectBreed.value);
  }
  if (checkboxVaccinated.checked) {
    result = result.filter(pet => pet.vaccinated === true);
  }
  if (checkboxDewormed.checked) {
    result = result.filter(pet => pet.dewormed === true);
  }
  if (checkboxSterilized.checked) {
    result = result.filter(pet => pet.sterilized === true);
  }
  return result;
};

const init = function () {
  // Render table when load
  renderTableData(petArr);
  // Load breed data to select
  renderBreed(breedArr);
};
init();
/*-------------------------
   HANDLE EVENTS
---------------------------*/
// Handle find button click event
btnFind.addEventListener('click', function () {
  const findResult = searchPet(petArr);
  renderTableData(findResult);
  clearInput();
});

// Handle sidebar click event
sidebarTitleElement.style.cursor = 'pointer';
sidebarTitleElement.addEventListener('click', function () {
  sidebarElement.classList.toggle('active');
});
