// Configuration
const DATA_FILE = 'data.json'; // Path to your JSON file
let allData = [];
let currentId = 1;

// Initialize the page
async function init() {
    // Load the JSON data
    try {
        const response = await fetch(DATA_FILE);
        if (!response.ok) {
            throw new Error(`Failed to load data file: ${response.status}`);
        }
        allData = await response.json();
        
        if (!Array.isArray(allData)) {
            throw new Error('Data file must contain an array');
        }

        if (allData.length === 0) {
            throw new Error('Data file is empty');
        }

        // Get the ID from query string parameter
        const params = new URLSearchParams(window.location.search);
        const queryId = params.get('id');
        
        if (queryId) {
            currentId = parseInt(queryId, 10);
            if (isNaN(currentId) || currentId < 1) {
                currentId = 1;
            }
        }

        // Clamp ID to valid range
        currentId = Math.max(1, Math.min(currentId, allData.length));

        // Hide loading message
        document.querySelector('.loading').style.display = 'none';

        // Display initial data
        displayData(currentId);
        updateNavigation();
    } catch (error) {
        showError(`Error: ${error.message}`);
    }
}

// Display data for a specific ID
function displayData(id) {
    const index = id - 1; // Convert 1-based ID to 0-based index
    
    if (index < 0 || index >= allData.length) {
        showError(`Invalid data ID: ${id}`);
        return;
    }

    const data = allData[index];
    currentId = id;

    // Update URL without reloading the page
    window.history.replaceState({}, '', `?id=${id}`);

    // Populate the HTML elements
    document.getElementById('dataName').textContent = data.name || '';
    document.getElementById('dataDescription').textContent = data.description || '';
    document.getElementById('dataSiteNumber').textContent = data['site number'] || '';
    document.getElementById('dataTransect').textContent = data.transect || '';
    document.getElementById('dataShovelTestNumber').textContent = data['shovel test number'] || '';
    document.getElementById('dataDepth').textContent = data.depth || '';

    // Update navigation info
    document.getElementById('currentId').textContent = id;
    document.getElementById('totalCount').textContent = allData.length;
}

// Update navigation button states
function updateNavigation() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    prevBtn.disabled = currentId <= 1;
    nextBtn.disabled = currentId >= allData.length;
}

// Show error message
function showError(message) {
    document.querySelector('.loading').style.display = 'block';
    document.querySelector('.loading').textContent = message;
    document.querySelector('.loading').classList.add('error-message');
}

// Navigation button event listeners
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

// Keyboard navigation
document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && currentId > 1) {
        displayData(currentId - 1);
        updateNavigation();
    } else if (event.key === 'ArrowRight' && currentId < allData.length) {
        displayData(currentId + 1);
        updateNavigation();
    }
});

// Start the application
init();