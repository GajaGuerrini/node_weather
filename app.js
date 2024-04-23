
const request = require('request');  
var API_KEY = 'f49987c57837bfc5957ad0c5b66d1283';  
  
const forecast = function (latitude, longitude) {  
  
var url = `http://api.openweathermap.org/data/2.5/weather?` 
            +`lat=${latitude}&lon=${longitude}&appid=${API_KEY}` 
  
    request({ url: url, json: true }, function (error, response) {  
        if (error) {  
            console.log('Unable to connect to Forecast API');  
        }  
          else {  
            console.log('It is currently '
                + response.body.main?.temp
                + ' degrees out.'
            );  
  
            // console.log('The high today is '
            //     + response.body.main.temp_max  
            //     + ' with a low of '
            //     + response.body.main.temp_min 
            // );  
  
            // console.log('Humidity today is '
            //     + response.body.main.humidity 
            // );  
        }  
    })  
}  
  
var latitude = 22.7196; // Indore latitude  
var longitude = 75.8577; // Indore longitude  
  

const My_city = 'Indore'

async function forecast_city(city) {

var url = 'https://api.openweathermap.org/data/2.5/weather?' + `q=${city}&appid=${API_KEY}` 
  
    request({ url: url, json: true }, function (error, response) {  
        if (error) {  
            console.log('Unable to connect to Forecast API');  
        }  
          else {  
            // console.log(response)
            const weatherData = response.body.main?.temp

            console.log(typeof(response.body.main?.temp))

            console.log('It is currently city name '
                + response.body.main?.temp
                + ' degrees out.'
            ); 
            return weatherData
        }  
    })   

}

forecast_city(My_city)



const express = require("express");

const app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/weather", async (req, res) => {
  const city = req.query.city;
  try {
    const weatherData = await forecast_city(city);
    res.render("index", {weatherData: weatherData});
  } catch (error) {
    res.status(500).send("Error fetching weather data.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Weather app is running on port ${PORT}`);
});

