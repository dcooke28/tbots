const dataUrl = 'proto.data';

const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');

function displayItemPage(data, id) {
  data.items.find(i => i.id == id);

  pageTitle.textContent = item.name;
  pageDescription.textContent = item.description;
}

function getItemIdFromQuery() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('id');
}

async function loadData() {
  const response = await fetch(dataUrl);

  if (!response.ok) {
    throw new Error(`Load data error - status ${response.status}`);
  }

  const data = await response.json();

  if (!itemId) {
    // display standard page
  } else {
    displayItemPage(data, itemId);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadData);
} else {
  loadData();
}