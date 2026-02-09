const dataUrl = 'https://dcooke28.github.io/tbots/proto.json';

const pageTitle = document.getElementById('pageTitle');
const pageDescription = document.getElementById('pageDescription');

const itemSiteNumber = document.getElementById('siteNumber');
const itemTransect = document.getElementById('transect');
const itemShovelTestNumber = document.getElementById('shovelTestNumber');
const itemUtm = document.getElementById('utm');
const itemStratumBaseDepth = document.getElementById('stratumBaseDepth');
const photo = document.getElementById('photo');

function displayItemPage(data, id) {
  const item = data.find(i => i.id == id);

  pageTitle.textContent = item.name;
  pageDescription.textContent = item.details;

  itemSiteNumber.textContent = item.site_number;
  itemTransect.textContent = item.transect;
  itemShovelTestNumber.textContent = item.shovel_test_number;
  itemUtm.textContent = item.utm;
  itemStratumBaseDepth.textContent = item.stratum_base_depth;

  photo.src = item.photo;
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
  const itemId = getItemIdFromQuery();

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