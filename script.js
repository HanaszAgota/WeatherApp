const apiKey = '32c5e785825d4345be6104218231505';
const root = document.querySelector('#root');

fetch(`http://api.weatherapi.com/v1/current.json?key=32c5e785825d4345be6104218231505&q=&aqi=no
`)

// const header = document.createElement('h1');
// header.textContent = 'Weather App';
// header.classList.add('header');
// root.appendChild(header);

const searchContainer = document.createElement('div');
searchContainer.classList.add('search-container');
root.appendChild(searchContainer);

const searchInput = document.createElement('input');
searchInput.classList.add('search-input');
searchInput.setAttribute('type', 'text');
searchInput.setAttribute('placeholder', 'Search for a city');
searchContainer.appendChild(searchInput);

const searchButton = document.createElement('button');
searchButton.classList.add('search-button');
//searchButton.textContent = 'Search';
const searchIMG = document.createElement('img');
searchIMG.classList.add('image');
searchIMG.src = 'search.png';
searchButton.appendChild(searchIMG);

searchContainer.appendChild(searchButton);

const weatherCard = document.createElement('div');
weatherCard.classList.add('weather-card');
root.appendChild(weatherCard);





