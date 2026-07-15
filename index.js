// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area=";

// Your code here!

const stateInput = document.getElementById("state-input");

const fetchButton = document.getElementById("fetch-alerts");

const alertsDisplay = document.getElementById("alerts-display");

const errorMessage = document.getElementById("error-message");

fetchButton.addEventListener("click", () => {
  const state = stateInput.value.trim().toUpperCase();

  if (!state) {
       displayError("Please enter a state abbreviation.");
       return;
      }

  fetchWeatherAlerts(state);
});

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error("Unable to fetch weather alerts.");
    }

    const data = await response.json();

    displayAlerts(data);

    // Clear the input field
    stateInput.value = "";

    // Hide and clear any previous error
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");
  } catch (error) {
    displayError(error.message);
    console.log(error.message);
  }
}

function displayError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
}

function displayAlerts(data) {

    alertsDisplay.innerHTML = "";

    const title = document.createElement("h2");

    title.textContent = (`${data.title}: ${data.features.length}`);

    alertsDisplay.appendChild(title);

    const alertList = document.createElement("ul");

    data.features.forEach((alert) => {

      const listItem = document.createElement("li");

      listItem.textContent = alert.properties.headline;

      alertList.appendChild(listItem);
    });

    alertsDisplay.appendChild(alertList);
}

