const weatherData = {
    Vadodara: "15°C",
    Ahemdabad: "18°C",
    Nadiad: "20°C",
    Rajkot: "22°C",
    Surat: "24°C"
};

document.getElementById("getWeather").addEventListener("click", ()=> {
    const cityInput = document.getElementById("inputCity").value.trim();
    const city = cityInput.charAt(0).toUpperCase() + cityInput.slice(1).toLowerCase();
    const result = document.getElementById("result");

    if(weatherData[city]){
        result.innerHTML = `The temperature in ${city} is ${weatherData[city]}`;
    }
    else{
        result.innerHTML = `The temperature for ${city} is not available`;
    }
});