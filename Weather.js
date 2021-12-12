// -----------------box4----------------------
let weather = {
    "apikey": "bac1513942cf7b11a53cb059bb7e487b",
    // https://openweathermap.org/current
    fetchweather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + this.apikey
        ).then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind
        const { pressure } = data.main
        console.log(name, description, temp, humidity, speed, pressure);
        document.querySelector(".city").innerHTML = "Weather in " + name;
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temperature").innerHTML = temp + "°C";
        // document.querySelector(".icon-mini").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".pressure-value").innerHTML = pressure;
        document.querySelector(".wind-value").innerHTML = speed;
        document.querySelector(".humidity-value").innerHTML = humidity;
        document.querySelector(".card1-bottom").classList.remove("onLoading")
        document.querySelector(".hidden").classList.remove("onLoading")
    },
    search: function () {
        this.fetchweather(document.querySelector(".searchbar").value);
    }
};

document.querySelector(".search-icon")
    .addEventListener("click", function () {
        weather.search();
    })

    document.querySelector(".searchbar").addEventListener("keyup",function(event){
        if (event.key == "Enter"){
            weather.search();
        }
    })



// -----------------box4----------------------
const latInp = document.querySelector("#latitude")
const lonInp = document.querySelector("#longitude")
const searchBtn = document.querySelector(".search-btn")
const lines = document.querySelector(".lines")
const aqi_value = document.querySelector(".aqi-value")
const appid = "bac1513942cf7b11a53cb059bb7e487b"
const link = "https://api.openweathermap.org/data/2.5/air_pollution"
// http:api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={API key}// 

const getUserLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(onPositionGathered,onPositionGatherError)
    }
    else {
        onPositionGatherError(alert("plz enter the correct altitude or longitude"))
    }
}

const onPositionGathered = pos => {
    let lat = pos.coords.latitude.toFixed(4),
        lon = pos.coords.longitude.toFixed(4)

    latInp.value = lat
    lonInp.value = lon
    getAirQuality(lat,lon)
}

const getAirQuality = async (lat, lon) => {
    const data = await fetch(`${link}?lat=${lat}&lon=${lon}&appid=${appid}`).catch(err => onPositionGatherError(err))
    const airData = await data.json()

    // console.log(airData)
    setValueOfAir(airData)

}
const onPositionGatherError = e => {
    e.alert("plz enter the correct altitude or longitude")
}
searchBtn.addEventListener("click",()=>{
    let lat = parseFloat(latInp.value).toFixed(4)
    let lon = parseFloat(lonInp.value).toFixed(4)
    getAirQuality(lat,lon)
})
const setValueOfAir = airData => {
    const aqi = airData.list[0].main.aqi
    let text = "",value = ""

    switch (aqi) {
        case 1:
            value = Math.floor(Math.random() * (50 - 0 + 1)) + 0
            text = `
                    <style>
                        .good{
                            border: 2px solid blue;
                            padding: 5px;
                            border-radius: 5px;
                        }
                    </style>
                    <progress  class="line" value="10" max="100"> 10% </progress>
                             `
            break;

        case 2:
            value = Math.floor(Math.random() * (150 - 100 + 1)) + 100
            text = `
                    <style>
                        .good{
                            border: 2px solid blue;
                            padding: 5px;
                            border-radius: 5px;
                        }
                    </style>
                    <progress  class="line" value="25" max="100"> 25% </progress>`
            break;

        case 3:
            value = Math.floor(Math.random() * (200 - 150 + 1)) + 150
            text = `
                    <style>
                        .standard{
                            border: 2px solid blue;
                            padding: 5px;
                            border-radius: 5px;
                        }
                    </style>
                    <progress  class="line" value="40" max="100"> 40% </progress>`
            break;

        case 4:
            value = Math.floor(Math.random() * (250 - 200 + 1)) + 200
            text = `
                    
                    <style>
                        .standard{
                            border: 2px solid blue;
                            padding: 5px;
                            border-radius: 5px;
                        }
                    </style>
                    <progress  class="line" value="60" max="100"> 60% </progress>`
            break;

        case 5:
            value =  Math.floor(Math.random() * (300 - 250 + 1)) + 250
            text = `
                    
                    <style>
                        .hazardous{
                            border: 2px solid blue;
                            padding: 5px;
                            border-radius: 5px;
                        }
                    </style>
                    <progress  class="line" value="80" max="100"> 80% </progress>`
            break;

            
            
        }
        lines.innerHTML = text
        aqi_value.innerHTML = value

}


getUserLocation();

// --------------------BOX6-------------------
const timeEl = document.getElementById('time');
const dateEl = document.getElementById('date');
const currentWeatherItemsEl = document.getElementById('current-weather-items');
const timezone = document.getElementById('time-zone');
const countryEl = document.getElementById('country');
const weatherForecastEl = document.getElementById('weather-forecast');
const currentTempEl = document.getElementById('current-temp');


const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const API_KEY ='bac1513942cf7b11a53cb059bb7e487b';

setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>

    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
}