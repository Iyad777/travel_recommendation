// Fetch JSON and store data
let travelData = {};

fetch('travel_recommendation_api.json')
  .then(response => response.json())
  .then(data => travelData = data)
  .catch(error => console.error(error));

// Search function
function search() {
  const query = document.getElementById('searchInput').value.toLowerCase();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  // Search countries
  travelData.countries?.forEach(country => {
    if (country.name.toLowerCase().includes(query)) {
      country.cities.forEach(city => {
        addResult(city);
      });
    } else {
      country.cities.forEach(city => {
        if (city.name.toLowerCase().includes(query)) {
          addResult(city);
        }
      });
    }
  });

  // Search beaches
  travelData.beaches?.forEach(beach => {
    if (beach.name.toLowerCase().includes(query)) {
      addResult(beach);
    }
  });

  // Search temples
  travelData.temples?.forEach(temple => {
    if (temple.name.toLowerCase().includes(query)) {
      addResult(temple);
    }
  });
}

// Add a single result card
function addResult(item) {
  const resultsContainer = document.getElementById('results');
  const card = document.createElement('div');
  card.className = 'result-card';
  card.innerHTML = `
    <img src="${item.imageUrl}" alt="${item.name}">
    <h3>${item.name}</h3>
    <p>${item.description}</p>
  `;
  resultsContainer.appendChild(card);
}

// Clear results
function clearResults() {
  document.getElementById('results').innerHTML = '';
  document.getElementById('searchInput').value = '';
}