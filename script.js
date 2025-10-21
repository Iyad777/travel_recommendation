// Fetch data from JSON
async function fetchData() {
  const response = await fetch('travel_recommendation_api.json');
  const data = await response.json();
  return data;
}

// Search function
async function search() {
  const keyword = document.getElementById('searchInput').value.toLowerCase();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = ''; // clear old results

  const data = await fetchData();
  let matches = [];

  if (keyword.includes('beach')) {
    matches = data.beaches;
  } else if (keyword.includes('temple')) {
    matches = data.temples;
  } else if (keyword.includes('country')) {
    matches = data.countries;
  }

  if (matches.length > 0) {
    matches.forEach(place => {
      resultsDiv.innerHTML += `
        <div class="card">
          <h2>${place.name}</h2>
          <img src="${place.imageUrl}" alt="${place.name}">
          <p>${place.description}</p>
        </div>`;
    });
  } else {
    resultsDiv.innerHTML = "<p>No results found. Try another keyword!</p>";
  }
}

// Clear button logic
function clearResults() {
  document.getElementById('searchInput').value = '';
  document.getElementById('results').innerHTML = '';
}