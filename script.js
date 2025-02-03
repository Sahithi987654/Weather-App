async function getWeather(city = null) {
    const apiKey = "8d56eb2d866f3ba14ed2bd942d6812db"; 
    let url;

    if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    } else {
        if (!navigator.geolocation) {
            document.getElementById("weatherResult").innerHTML = "<p>Geolocation is not supported by your browser.</p>";
            return;
        }
        navigator.geolocation.getCurrentPosition(async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            fetchWeather(url);
        }, () => {
            document.getElementById("weatherResult").innerHTML = "<p>Unable to retrieve location.</p>";
        });

        return;
    }

    fetchWeather(url);
}

async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            throw new Error(data.message);
        }

        document.getElementById("weatherResult").innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Condition: ${data.weather[0].description}</p>
        `;
    } catch (error) {
        document.getElementById("weatherResult").innerHTML = `<p>Error: ${error.message}</p>`;
    }
}
document.addEventListener("DOMContentLoaded", () => getWeather());
function searchWeather() {
    const city = document.getElementById("cityInput").value.trim();
    if (city) {
        getWeather(city);
    }
}
