let data = [];

fetch('data/travel_recommendation_api.json')
    .then(res => res.json())
    .then(json => {
        data = json;

        document.getElementById("submit").addEventListener("click", handleSearch);
        document.getElementById("reset").addEventListener("click", handleClear);
    });

function handleSearch() {
    const input = document.getElementById("search-input").value.toLowerCase();

    if (input.includes("beach")) {
        showResults(data.beaches);
    } else if (input.includes("temple")) {
        showResults(data.temples);
    } else if (input.includes("country")) {
        let allCities = [];

        data.countries.forEach(country => {
            allCities = allCities.concat(country.cities);
        });

        showResults(allCities);
    } else {
        resultsContainer.innerHTML = "";

        alert("No results found. Please try searching for 'beach', 'temple', or 'country'.");
    }
}

const resultsContainer = document.getElementById("results");

function showResults(places) {
    resultsContainer.innerHTML = ""; // clear old results

    places.forEach(place => {
        const card = document.createElement("div");

        card.innerHTML = `
      <h3>${place.name}</h3>
      <img src="${place.imageUrl}" width="200" height="150" alt="${place.name}">
      <p>${place.description}</p>
    `;

        resultsContainer.appendChild(card);
    });
}

function handleClear() {
    const searchInput = document.getElementById("search-input")
    searchInput.value = "";
    resultsContainer.innerHTML = "";
}
