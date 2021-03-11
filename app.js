axios = require('axios')
var temp_sensor = require("node-dht-sensor");
var BH1750 = require('bh1750');
const ADS1115 = require('ads1115')
const i2c = require('i2c-bus')

var light = new BH1750({});



const sensors = [] 


console.log("hello")

temp_sensor.read(11, 4, function(err, temperature, humidity) {
  console.log(err)
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
    }
  });
  

  light.readLight(function(err, value){
    if (err) {
        console.log("light error: " + err);
        throw err;
    } else {
        console.log("light value is: ", value, "lx");
    }
});

 i2c.openPromisified(1).then(async (bus) => {
  const ads1115 = await ADS1115(bus)
  // ads1115.gain = 1
  let value = await ads1115.measure('0+GND')
  console.log(value)
})