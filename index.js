axios = require('axios')
var temp_sensor = require("node-dht-sensor");



console.log("hello")

sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    }
  });
  