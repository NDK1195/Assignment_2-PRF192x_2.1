'use strict';
// Get DOM Elements
const btnSubmit = document.getElementById('submit-btn');
const inputID = document.getElementById('input-id');
const inputName = document.getElementById('input-name');
const inputAge = document.getElementById('input-age');
const selectType = document.getElementById('input-type');
const inputWeight = document.getElementById('input-weight');
const inputLength = document.getElementById('input-length');
const inputColor = document.getElementById('input-color-1');
const selectBreed = document.getElementById('input-breed');
const checkboxVaccinated = document.getElementById('input-vaccinated');
const checkboxDewormed = document.getElementById('input-dewormed');
const checkboxSterilized = document.getElementById('input-sterilized');

const tableBodyElement = document.getElementById('tbody');
const containerFormEle = document.getElementById('container-form');

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
  petData.age = inputAge.value;
  petData.type = selectType.value;
  petData.weight = inputWeight.value;
  petData.length = inputLength.value;
  petData.color = inputColor.value;
  petData.breed = selectBreed.value;
  petData.vaccinated = checkboxVaccinated.checked;
  petData.dewormed = checkboxDewormed.checked;
  petData.sterilized = checkboxSterilized.checked;

  return petData;
};

// Validate pet data function
// Input: pet data object
// Output: validate result (true or false)
const validateData = function (petData) {
  let result = true;
  try {
    if (petData.id === '') {
      throw 'Please enter Pet ID!';
    }

    if (petData.name === '') {
      throw 'Please enter Pet Name!';
    }

    if (petData.age === '') {
      throw 'Please enter Pet Age!';
    } else {
      if (Number(petData.age < 1) || Number(petData.age > 15)) {
        throw 'Age must be between 1 and 15!';
      }
    }

    if (petData.type === '') {
      throw 'Please select Pet Type!';
    }

    if (petData.weight === '') {
      throw 'Please enter Pet Weight!';
    } else {
      if (Number(petData.weight) < 1 || Number(petData.weight) > 15) {
        throw 'Weight must be between 1 and 15!';
      }
    }

    if (petData.length === '') {
      throw 'Please enter Pet Length!';
    } else {
      if (Number(petData.length) < 1 || Number(petData.length) > 100) {
        throw 'Length must be between 1 and 100!';
      }
    }

    if (petData.breed === '') {
      throw 'Please select Pet Breed!';
    }
  } catch (error) {
    alert(error);
    result = false;
  }
  return result;
};

// Clear input function
const clearInput = function () {
  inputID.value = '';
  inputName.value = '';
  inputAge.value = '';
  selectType.value = '';
  inputWeight.value = '';
  inputLength.value = '';
  inputColor.value = '#000000';
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
    <td>${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}</td>
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
      petArr[i].id
    }')">Edit</button></td>`;

    //Add row to table
    tableBodyElement.appendChild(row);
  }
};

// show pet data on form by pet id function
// Input: pet id
const startEditPet = function (petId) {
  const petObject = petArr.find(pet => pet.id === petId);
  // Show pet data on form
  inputID.value = petObject.id;
  inputName.value = petObject.name;
  inputAge.value = petObject.age;
  selectType.value = petObject.type;
  inputWeight.value = petObject.weight;
  inputLength.value = petObject.length;
  inputColor.value = petObject.color;
  selectBreed.value = petObject.breed;
  checkboxVaccinated.checked = petObject.vaccinated;
  checkboxDewormed.checked = petObject.dewormed;
  checkboxSterilized.checked = petObject.sterilized;

  containerFormEle.classList.remove('hide');
};
// Edit pet function
// input: pet object
const editPet = function (petObject) {
  const petIndexToEdit = petArr.findIndex(pet => pet.id === petObject.id);
  // set date edit same as date add
  petObject.date = petArr[petIndexToEdit].date;
  // update data
  petArr[petIndexToEdit] = petObject;
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
// Handle submit button click event
btnSubmit.addEventListener('click', function () {
  // Get data from input
  const petObject = getDataFromInput();
  console.log(petObject);
  // Validate data
  const validateResult = validateData(petObject);
  if (validateResult) {
    // Edit pet object and save to local storage
    editPet(petObject);
    saveToStorage('petArr', JSON.stringify(petArr));
    // Clear input and hide form
    clearInput();
    containerFormEle.classList.add('hide');
    // Display pet data after edit
    renderTableData(petArr);
  }
});

// Handle sidebar click event
sidebarTitleElement.style.cursor = 'pointer';
sidebarTitleElement.addEventListener('click', function () {
  sidebarElement.classList.toggle('active');
});
// Handle select type on change event
const breedOfDogList = breedArr.filter(breed => breed.type === 'Dog');
const breedOfCatList = breedArr.filter(breed => breed.type === 'Cat');
selectType.addEventListener('change', function () {
  const type = selectType.value;
  console.log(type);
  if (type === 'Dog') {
    renderBreed(breedOfDogList);
  } else if (type === 'Cat') {
    renderBreed(breedOfCatList);
  } else {
    renderBreed(breedArr);
  }
});
