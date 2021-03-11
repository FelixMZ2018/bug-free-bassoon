axios = require('axios')
var temp_sensor = require("node-dht-sensor");



console.log("hello")

temp_sensor.read(11, 4, function(err, temperature, humidity) {
  console.log(err)
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    }
  });
  