const axios = require('axios')
var temp_sensor = require("node-dht-sensor");
var BH1750 = require('bh1750');
const ADS1115 = require('ads1115')
const i2c = require('i2c-bus')
var rpio = require('rpio')
var light = new BH1750({});
const soil_moisture_wet = 20000
const soil_moisture_dry = 17000

const hostname = process.env['HOSTNAME']
class SensorData {
  constructor(sensor_type,data_type,index,data){
    this.sensor_type = sensor_type
    this.data_type = data_type
    this.index = index
    this.data = data
  }
}

const sensor_array = [] 

rpio.open(11, rpio.OUTPUT, rpio.HIGH);

console.log("hello")
temp_sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
      console.log(`temp: ${temperature}°C, humidity: ${humidity}%`);
      temp1 = new SensorData("temperature","digital",1,temperature)
      humidity1 = new SensorData("humidty","digital",1,temperature)
      console.log(temp1)
      sensor_array.push(temp1,humidity1)

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
  const normalized = (((value - soil_moisture_dry)/(soil_moisture_wet-soil_moisture_dry))*1024)
  console.log(normalized)
})
rpio.open(11, rpio.OUTPUT, rpio.LOW);

console.log(sensor_array)
rpio.exit()
