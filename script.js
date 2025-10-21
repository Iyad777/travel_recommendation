// Example JSON data (replace with your travel_recommendation_api.json file if fetching)
const data = {
    "countries": [
      {
        "id": 1,
        "name": "Australia",
        "cities": [
          {
            "name": "Sydney, Australia",
            "imageUrl": "https://images.unsplash.com/photo-1506973035872-a4b6e3e179e6?auto=format&fit=crop&w=800&q=60",
            "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
          },
          {
            "name": "Melbourne, Australia",
            "imageUrl": "https://images.unsplash.com/photo-1526481280690-9d0a180f5c88?auto=format&fit=crop&w=800&q=60",
            "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
          }
        ]
      },
      {
        "id": 2,
        "name": "Japan",
        "cities": [
          {
            "name": "Tokyo, Japan",
            "imageUrl": "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=800&q=60",
            "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
          },
          {
            "name": "Kyoto, Japan",
            "imageUrl": "https://images.unsplash.com/photo-1580734075047-2a1f1df8b0c3?auto=format&fit=crop&w=800&q=60",
            "description": "Known for its historic temples, gardens, and traditional tea houses."
          }
        ]
      }
    ],
    "temples": [
      {
        "id": 1,
        "name": "Angkor Wat, Cambodia",
        "imageUrl": "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&w=800&q=60",
        "description": "A UNESCO World Heritage site and the largest religious monument in the world."
      },
      {
        "id": 2,
        "name": "Taj Mahal, India",
        "imageUrl": "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=800&q=60",
        "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
      }
    ],
    "beaches": [
      {
        "id": 1,
        "name": "Bora Bora, French Polynesia",
        "imageUrl": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=60",
        "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
      },
      {
        "id": 2,
        "name": "Copacabana Beach, Brazil",
        "imageUrl": "https://images.unsplash.com/photo-1535914254981-b5012eebbd15?auto=format&fit=crop&w=800&q=60",
        "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
      }
    ]
  };
  
  // Search Function
  function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';
  
    if (!input) return;
  
    let results = [];
  
    if (input.includes('beach')) {
      results = data.beaches;
    } else if (input.includes('temple')) {
      results = data.temples;
    } else {
      data.countries.forEach(country => {
        country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(input)) {
            results.push(city);
          }
        });
      });
    }
  
    if (results.length === 0) {
      resultsContainer.innerHTML = `<p style="text-align:center;">No results found!</p>`;
      return;
    }
  
    results.forEach(item => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <img src="${item.imageUrl}" alt="${item.name}">
        <div class="card-content">
          <h3>${item.name}</h3>
          <p>${item.description}</p>
        </div>
      `;
      resultsContainer.appendChild(card);
    });
  }
  
  // Clear Results
  function clearResults() {
    document.getElementById('results').innerHTML = '';
    document.getElementById('searchInput').value = '';
  }