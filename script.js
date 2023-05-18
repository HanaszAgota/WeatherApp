const API_KEY = "8be1860db359470181e104408231505";
const root = document.querySelector("#root");
let API_CITY = "Budapest";

async function getFetch(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
console.log(
  getFetch(
    `http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
  )
);

function getElements() {
  let a = async function () {
    const response = await getFetch(
      `http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
    );

    const main = document.createElement("main");
    main.classList.add("main");

    const section = document.createElement("section");
    section.classList.add("section");

    const condition = document.createElement("img");
    condition.classList.add("condition");
    condition.src = response.current.condition.icon;

    const temp = document.createElement("section");
    temp.classList.add("temperature");

    const h1 = document.createElement("h1");
    h1.id = "h1";
    h1.innerText = response.location.name;

    const temperature = document.createElement("div");
    temperature.innerText = response.current.temp_c + "℃";

    temp.append(temperature);

    const hum = document.createElement("section");
    hum.classList.add("humidity");
    hum.innerText = "💦" + "Humidity";

    const humidity = document.createElement("div");
    humidity.innerText = response.current.humidity + "%";
    hum.append(humidity);

    const wind = document.createElement("section");
    wind.classList.add("wind");
    wind.innerText = "💨" + "Wind Speed";

    const windSpeed = document.createElement("div");
    windSpeed.innerHTML = response.current.wind_kph + " km/h";

    wind.append(windSpeed);

    section.append(condition, temp, h1, hum, wind);

    main.append(section);

    root.append(main);
  };

  const container = document.createElement("container");
  container.id = "container"
  root.append(container);

  const label = document.createElement("label");
  label.setAttribute("for", "input");

  const input = document.createElement("input");
  input.id = "input";
  input.name = "input";
  input.setAttribute("list", "search");
  input.autocomplete = "off"; //kell ez?
  input.placeholder = "Please add a city";
  container.append(input)

  const dataList = document.createElement("datalist");
  dataList.id = "search";

  const searchButton = document.createElement('button');

  const searchIMG = document.createElement('img');
  searchIMG.classList.add('image');
  searchIMG.src = 'search.png';
  searchButton.appendChild(searchIMG);

  container.append(searchButton, label, dataList);

  root.append(container);
  a();
}
getElements();

function eventListener() {
  const input = document.querySelector("#input");

  input.addEventListener("change", function (event) {
    API_CITY = input.value;

    let a = async function () {
      let data = await getFetch(
        `http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
      );

      const main = document.querySelector("main");
      main.innerHTML = "";

      const section = document.createElement("section");
      section.classList.add("section");

      
      const condition = document.createElement("img");
      condition.classList.add("condition");
      condition.src = data.current.condition.icon;

      const temp = document.createElement("section");
      temp.classList.add("temperature");

      const h1 = document.createElement("h1");
      h1.id = "h1";
      h1.innerText = data.location.name;

      const temperature = document.createElement("div");
      temperature.innerText = data.current.temp_c + "°C";

      temp.append(temperature);

      const hum = document.createElement("section");
      hum.classList.add("humidity");
      hum.innerText = "Humidity";

      const humidity = document.createElement("div");
      humidity.innerText = data.current.humidity + "%";
      hum.append(humidity);

      const wind = document.createElement("section");
      wind.classList.add("wind");
      wind.innerText = "Wind Speed";

      const windSpeed = document.createElement("div");
      windSpeed.innerHTML = data.current.wind_kph + " km/h";

      wind.append(windSpeed);

      section.append(condition, temp, h1, hum, wind);

      main.append(section);

      root.append(main);
    };

    a();
  });
}
eventListener();

// API ami meghívja az autocomplete functiont,
// kell még egy function amibe az eventlister azt vizsgálja ha input keröl bele akkor mi lesz
// auto complete html form megnézése
function inputCitySearch() {
  const input = document.querySelector("#input");

  input.addEventListener("input", function (event) {
    if (input.value.length >= 3) {
      API_CITY = event.target.value;

      let a = async function () {
        let data = await getFetch(
          ` http://api.weatherapi.com/v1/search.json?key=8be1860db359470181e104408231505&q=${API_CITY} `
          //`http://api.weatherapi.com/v1/current.json?key=8be1860db359470181e104408231505&q=${API_CITY}`
        );
        console.log(data);

        // kéne egy datalistet generálni!
        const dataList = document.querySelector("#search");
        dataList.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
          const option = document.createElement("option");
          option.value = data[i].name;

          dataList.append(option);
        }
      };
      a();
    }
  });
}
inputCitySearch();