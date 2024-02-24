const input = document.getElementById("search-input");
const button = document.getElementById("search-button");
const apiKey = "1edb8314218ef623105b01874e8689c0";

const placeholderText = "Where ?"
input.placeholder = placeholderText;

input.addEventListener("blur", () => {
  input.placeholder = placeholderText
});

input.addEventListener("focus", () => {
  input.placeholder = ""
});

input.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    const inputValue = input.value;
    searchCity(inputValue);
  }
});

button.addEventListener("click", () => {
  const inputValue = input.value;
  searchCity(inputValue);
});

const searchCity = async (city) => {
  try {
    const data = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=pt_br`
      );
      if(data.ok) {
        const result = await data.json();
        showWeather(result);
        
        
        console.log(result.sys.country);
        searchTopAlbuns(result.sys.country);
      } else {
        throw new Error
      }
    } catch {
        console.log("City not found! Try again");
    }
};

const showWeather = (data) => {
  document.querySelector(".weather-icon").src = `assets/${data.weather[0].icon}.svg`; 
  document.querySelector(".city-name").innerHTML = `${data.name}`;
  document.querySelector(".weather-status").innerHTML = `${data.weather[0].description}`
  document.querySelector(".temperature").innerHTML = `${data.main.temp.toFixed(0)}°C`;
  document.querySelector(".maxTemp").innerHTML = `Max: ${data.main.temp_max.toFixed(0)}°C`;
  document.querySelector(".minTemp").innerHTML = `Min: ${data.main.temp_min.toFixed(0)}°C`;
  document.querySelector(".music-country-name").innerHTML = `Top Playtlists  ${data.sys.country}`;
  
}

const cleanOnEnter = () => {
  document.querySelector(".music-country-name").innerHTML = "";
  document.querySelector(".playlist-box").innerHTML = "";
}