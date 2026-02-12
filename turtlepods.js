const DATA_FILE = 'https://dcooke28.github.io/tbots/turtlepods.json';

let allData = [];
let currentId = 1;

async function load() {

  const response = await fetch(DATA_FILE);
  allData = await response.json();
        
  const params = new URLSearchParams(window.location.search);
  const queryId = params.get('id');
        
  if (queryId) {
      currentId = parseInt(queryId, 10);
      if (isNaN(currentId) || currentId < 1) {
          currentId = 1;
      }
  }

  // Clamp query id to a valid range
  currentId = Math.max(1, Math.min(currentId, allData.length));

  document.querySelector('.loading').style.display = 'none';

  displayData(currentId);
  updateNavigation();
}

function displayData(id) {
    const index = id - 1;
    const data = allData[index];

    currentId = id;

    window.history.replaceState({}, '', `?id=${id}`);

    document.getElementById('dataDescription').textContent = data.description || '';
    document.getElementById('dataSiteNumber').textContent = data['site number'] || '';
    document.getElementById('dataTransect').textContent = data.transect || '';
    document.getElementById('dataShovelTestNumber').textContent = data['shovel test number'] || '';
    document.getElementById('dataDepth').textContent = data.depth || '';
    document.getElementById('dataUtm').textContent = data.utm || '';

    const imageElement = document.getElementById('artifactImage');
    const imagePath = `imgs/${id}.jpg`;
    imageElement.src = imagePath;
    imageElement.alt = `Artifact ${id}`;
    imageElement.onerror = () => {
        imageElement.classList.add('placeholder');
        imageElement.style.display = 'flex';
        imageElement.textContent = 'No image available';
    };

    document.getElementById('currentId').textContent = id;
    document.getElementById('totalCount').textContent = allData.length;
}

function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentId <= 1;
    nextBtn.disabled = currentId >= allData.length;
}

document.getElementById('prevBtn').addEventListener('click', () => {
    if (currentId > 1) {
        displayData(currentId - 1);
        updateNavigation();
    }
});

document.getElementById('nextBtn').addEventListener('click', () => {
    if (currentId < allData.length) {
        displayData(currentId + 1);
        updateNavigation();
    }
});

load();