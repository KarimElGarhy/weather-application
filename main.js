const searchInput = document.querySelector("#searchInput");
const searchBtn = document.querySelector("#searchBtn")

const toadyTemp = document.querySelector("#toadyTemp")
const todayIcon = document.querySelector("#todayIcon")
const todayStatus = document.querySelector("#todayStatus")
const cloud =document.querySelector("#cloud")
const wind = document.querySelector("#wind")
const windDir = document.querySelector("#windDir")

const tomorrowMaxTemp = document.querySelector("#tomorrowMaxTemp")
const tomorrowMinTemp = document.querySelector("#tomorrowMinTemp")
const tomorrowStatus = document.querySelector("#tomorrowStatus")
const tomorrowIcon = document.querySelector("#tomorrowIcon")

const NtomorrowMaxTemp = document.querySelector("#NtomorrowMaxTemp")
const NtomorrowMinTemp = document.querySelector("#NtomorrowMinTemp")
const NtomorrowStatus = document.querySelector("#NtomorrowStatus")
const NtomorrowIcon = document.querySelector("#NtomorrowIcon")

const todayName = document.querySelector("#todayName")
const toadyDate = document.querySelector("#toadyDate")
const tomorrowName = document.querySelector("#tomorrowName")
const nTomorrowName = document.querySelector("#nTomorrowName")

const locationCity = document.querySelector("#locationCity")
const locationCountry = document.querySelector("#locationCountry")

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

const month = ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

var myData;

var searchLocation ;

userLocation()

async function fetchData(searchLocation){
    const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4862a588fa104c88873112313230208&q=${searchLocation}&days=3&aqi=no&alerts=no`);
    myData = await response.json();
    display()
}

searchInput.addEventListener("input",function(){
    if(searchInput != ``){
        searchLocation = searchInput.value
        fetchData(searchLocation);
    }else{
        console.log("Please Enter Valid Name")
    }
})

function display(){

    locationCity.innerHTML = myData.location.name
    locationCountry.innerHTML = myData.location.country
    toadyTemp.innerHTML = myData.current.temp_c
    todayIcon.src = myData.current.condition.icon
    todayStatus.innerHTML = myData.current.condition.text
    cloud.innerHTML = myData.current.cloud
    wind.innerHTML = myData.current.wind_kph
    windDir.innerHTML = myData.current.wind_dir


    tomorrowMaxTemp.innerHTML =  myData.forecast.forecastday[1].day.maxtemp_c
    tomorrowMinTemp.innerHTML = myData.forecast.forecastday[1].day.mintemp_c
    tomorrowStatus.innerHTML = myData.forecast.forecastday[1].day.condition.text
    tomorrowIcon.src = myData.forecast.forecastday[1].day.condition.icon

    NtomorrowMaxTemp.innerHTML =  myData.forecast.forecastday[2].day.maxtemp_c
    NtomorrowMinTemp.innerHTML = myData.forecast.forecastday[2].day.mintemp_c
    NtomorrowStatus.innerHTML = myData.forecast.forecastday[2].day.condition.text
    NtomorrowIcon.src = myData.forecast.forecastday[2].day.condition.icon

    const d = new Date("2023-08-02 20:45");
    let mon = d.getDay()-1 + month[d.getMonth()] 
    

    toadyDate.innerHTML = mon 

    let day = weekday[d.getDay()];
    
    todayName.innerHTML = day;
    day = weekday[d.getDay()+1]
    tomorrowName.innerHTML = day;
    day = weekday[d.getDay()+2]
    nTomorrowName.innerHTML = day;

}


async function userLocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
          } else {
        console.log("Geolocation is not supported by this browser.");
      }
      
      async function showPosition(position) {
        const userLocation = await fetch(`https://api-bdc.net/data/ip-geolocation?localityLanguage=en&key=bdc_c84f38f6cec94fcca534c0abc32edd3a`)

        const currentLocation = await userLocation.json()

        searchLocation = currentLocation.location.city
        fetchData(searchLocation)
}}

searchBtn.addEventListener("click",function(){
    if(searchInput != ``){
        searchLocation = searchInput.value
        fetchData(searchLocation);
    }else{
        console.log("Please Enter Valid Name")
    }
})
