
/* =====================================
   STATIC WEATHER DATA
===================================== */

// Temperature in degrees Celsius
const temperature = 30;

// Wind speed in kilometers per hour
const windSpeed = 12;


/* =====================================
   WIND CHILL FUNCTION
===================================== */

function calculateWindChill(temp, speed) {
    return 13.12 + (0.6215 * temp) - (11.37 * Math.pow(speed, 0.16)) + (0.3965 * temp * Math.pow(speed, 0.16));
}


/* =====================================
   WIND CHILL CONDITIONS
===================================== */

// Default value when calculation is not possible
let windChill = "N/A";

// Only calculate when both conditions are satisfied
if (temperature <= 10 && windSpeed > 4.8) {
    windChill = calculateWindChill(
        temperature,
        windSpeed
    ).toFixed(1) + " °C";
}


/* =====================================
   DISPLAY WEATHER DATA
===================================== */    

document.querySelector("#temperature").textContent = temperature;

document.querySelector("#wind-speed").textContent = windSpeed;

document.querySelector("#wind-chill").textContent = windChill;


/* =====================================
   FOOTER INFORMATION
===================================== */

// Display the current year
document.querySelector("#current-year").textContent =
    new Date().getFullYear();

// Display the document's last modified date
document.querySelector("#last-modified").textContent =
    document.lastModified;
