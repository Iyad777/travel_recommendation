const resultsContainer = document.getElementById('results');

// Fetch data from your JSON file
async function fetchPlaces() {
  try {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Search function
async function searchPlaces() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const data = await fetchPlaces();

  resultsContainer.innerHTML = ''; // clear previous results

  if (!keyword) {
    alert("Please enter a keyword (beach, temple, country)!");
    return;
  }

  // Filter results based on keyword
  let filtered = [];

  if (keyword.includes("beach")) filtered = data.beaches;
  else if (keyword.includes("temple")) filtered = data.temples;
  else {
    // check countries
    filtered = [];
    data.countries.forEach(country => {
      if (country.name.toLowerCase().includes(keyword)) {
        filtered = filtered.concat(country.cities);
      } else {
        // check cities inside country
        const matchedCities = country.cities.filter(city =>
          city.name.toLowerCase().includes(keyword)
        );
        filtered = filtered.concat(matchedCities);
      }
    });
  }

  // Display results
  if (filtered.length === 0) {
    resultsContainer.innerHTML = `<p class="no-results">No results found for "${keyword}"</p>`;
    return;
  }

  filtered.forEach(place => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <img src="images/${place.imageUrl}" alt="${place.name}">
      <div class="card-body">
        <h3>${place.name}</h3>
        <p>${place.description}</p>
      </div>
    `;
    resultsContainer.appendChild(card);
  });
}

// Clear results
function clearResults() {
  document.getElementById('searchInput').value = '';
  resultsContainer.innerHTML = '';
}