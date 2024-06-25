const searchBtn = document.querySelector("#button");
const input = document.querySelector("input");
const centerIcon = document.querySelector(".center-icon");
const centerTemp = document.querySelector(".center-temp");
const centerCity = document.querySelector(".center-city");
const minTemp = document.querySelector(".footer-min");
const maxTemp = document.querySelector(".footer-max");
const apiKey = process.env.API_Key;

const fetchData = async (postalCode) => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}=${postalCode}&days=3&aqi=no&alerts=no`
    );
    if (!response.ok) {
      console.error("response error");
    } else {
      var data = await response.json();
      console.log("response", data);
    }
  } catch (error) {
    console.error("Error fetching", error);
  }
  const todaysWeather = await data.forecast.forecastday[0].day;
  const city = await data.location.name;
  const icon = await todaysWeather.condition.icon;

  const appData = { todaysWeather, city, icon };

  return appData;
};

searchBtn.addEventListener("click", async (event) => {
  event.preventDefault;
  const postalCode = input.value;
  const weatherData = await fetchData(postalCode);
  fetchForecast(weatherData);
});

async function fetchForecast(appData) {
  const { todaysWeather, city, icon } = appData;
  centerIcon.src = `https:${icon}`;
  centerCity.textContent = city;
  centerTemp.innerHTML = todaysWeather.avgtemp_f;
  document.querySelector(".low").textContent = "low";
  minTemp.textContent = todaysWeather.mintemp_f;
  document.querySelector(".high").textContent = "high";
  maxTemp.textContent = todaysWeather.maxtemp_f;
  console.log(appData);
}
