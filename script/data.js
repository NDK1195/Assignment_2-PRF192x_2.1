'use strict';
// Get DOM Elements
const sidebarElement = document.getElementById('sidebar');
const sidebarTitleElement = document.getElementById('sidebar-title');
const inputFileElement = document.getElementById('input-file');

const btnExport = document.getElementById('export-btn');
const btnImport = document.getElementById('import-btn');
// Global variables
let petArr = JSON.parse(getFromStorage('petArr')) ?? [];
/*-------------------------
   HANDLE EVENTS
---------------------------*/
// Handle export button click event
btnExport.addEventListener('click', function () {
  const blob = new Blob([JSON.stringify(petArr)], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'petData.json');
});
// Handle import button click event
btnImport.addEventListener('click', function () {
  // Check if input file empty or not
  if (!inputFileElement.value) {
    alert('Please select file to import');
  } else {
    const file = inputFileElement.files[0];

    let reader = new FileReader();
    // Handle load file event
    reader.addEventListener('load', function () {
      // save import data to local storage
      saveToStorage('petArr', reader.result);
      alert('Import successfully');
    });
    //read file
    reader.readAsText(file);
    // clear input
    inputFileElement.value = '';
  }
});
// Handle sidebar click event
sidebarTitleElement.style.cursor = 'pointer';
sidebarTitleElement.addEventListener('click', function () {
  sidebarElement.classList.toggle('active');
});
