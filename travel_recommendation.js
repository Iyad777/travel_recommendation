document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.getElementById('btnSearch');
    const btnClear = document.getElementById('btnClear');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('results-container');

    // API URL
    const apiUrl = 'travel_recommendation_api.json';

    // Task 6: Fetch data from JSON
    const fetchData = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            resultsContainer.innerHTML = '<p>Error loading recommendations. Please try again later.</p>';
            return null;
        }
    };

    // Task 7: Handle keyword searches
    const handleSearch = async () => {
        const keyword = searchInput.value.toLowerCase().trim();
        const data = await fetchData();

        if (!data) return;

        let results = [];
        const keywordPlural = keyword.endsWith('s') ? keyword.slice(0, -1) : keyword + 's';

        if (keyword === 'beach' || keyword === 'beaches') {
            results = data.beaches;
        } else if (keyword === 'temple' || keyword === 'temples') {
            results = data.temples;
        } else if (keyword === 'country' || keyword === 'countries') {
            results = data.countries;
        } else {
            // Handle no match
            results = [];
        }

        displayResults(results, keyword);
    };

    // Task 8 & 10: Display recommendations and time
    const displayResults = (results, keyword) => {
        // Clear previous results first
        clearResults(); 
        
        if (results.length === 0) {
            resultsContainer.innerHTML = `<p>No recommendations found for "${keyword}". Please try 'beach', 'temple', or 'country'.</p>`;
            return;
        }

        results.forEach(item => {
            const resultCard = document.createElement('div');
            resultCard.classList.add('result-card');

            // Task 10: Check for timeZone and get current time
            let timeString = '';
            if (item.timeZone) {
                try {
                    const options = {
                        timeZone: item.timeZone,
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                        second: 'numeric'
                    };
                    const currentTime = new Date().toLocaleTimeString('en-US', options);
                    timeString = `<p class="time">Current time: ${currentTime}</p>`;
                } catch (error) {
                    console.error('Invalid time zone:', item.timeZone);
                    timeString = '<p class="time">Could not retrieve time.</p>';
                }
            }

            resultCard.innerHTML = `
                <img src="${item.imageUrl}" alt="${item.name}">
                <div class="result-card-content">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    ${timeString} 
                </div>
            `;
            resultsContainer.appendChild(resultCard);
        });
    };

    // Task 9: Clear button logic
    const clearResults = () => {
        resultsContainer.innerHTML = '';
    };

    const clearSearch = () => {
        resultsContainer.innerHTML = '';
        searchInput.value = '';
    };

    // Event Listeners
    if (btnSearch) {
        btnSearch.addEventListener('click', handleSearch);
    }
    
    if (btnClear) {
        btnClear.addEventListener('click', clearSearch);
    }
});