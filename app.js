setInterval(setTimeValue, 1000);
//selectors
const description = document.querySelector('.description');
const icon = document.getElementById('iconWeather');
const tempValue = document.querySelector('.temperature');
const errorMess = document.querySelector('.errorMess');
const tempUnit = document.querySelector('.tempUnit');
const locationValue = document.querySelector('.location');
const timeValue = document.querySelector('.directTime');

//data
const key = "82005d27a116c2880c8f0fcb866998a0";

const weather = {
    temperature: {
        unit : "celsius"
    }
}


//event listeners
tempValue.addEventListener("click", changeTempUnit)

function changeTempUnit(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "celsius"){
        let fahrenheit = Math.floor((weather.temperature.value * 9/5) + 32);
        tempValue.innerHTML = `${fahrenheit}°<span class="tempUnit"> C</span>`;
        weather.temperature.unit = "fahrenheit";

    } else if(weather.temperature.unit == "fahrenheit"){
        let kelvin = weather.temperature.value + 273;
        tempValue.innerHTML = `${kelvin}<span class="tempUnit"> K</span>`;
        weather.temperature.unit = "kelvin"

    } else {
        tempValue.innerHTML = `${weather.temperature.value}°<span class="tempUnit">C</span>`;
        weather.temperature.unit = "celsius"
    }

}
//localization stuff
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPos, ()=>{errorMess.style.display = "block"});
}else{
    errorMess.style.display = "block";
}





function setPos(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

function getWeather(latitude, longitude){
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = Math.floor(data.main.temp - 273);
            weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

function displayWeather(){
    icon.src = `icons/${weather.iconId}.png`;
    tempValue.innerHTML = `${weather.temperature.value} °<span class="tempUnit"> C</span>`;
    description.innerHTML = `<p> ${weather.description} </p>`;
    locationValue.innerHTML = `<p> ${weather.city} , ${weather.country} </p>`;
}









//functions
function setTimeValue(){
    const timeData = new Date();
    let seconds = timeData.getSeconds();
    let minutes = timeData.getMinutes();
    let hours = timeData.getHours();
    if(seconds<10){
        seconds = '0' + seconds
    }
    if(minutes<10 ){
        minutes = '0' + minutes
    }
    if(hours<10 ){
        hours = '0' + hours
    }

    
    timeValue.innerHTML = `${hours}:${minutes}:${seconds} `;
    
    
}



