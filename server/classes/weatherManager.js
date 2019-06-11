const request = require('request');

class weatherManager {

  constructor () {
    this.lastTime = -1;
    this.key = '27baa636069cd8689661da16bc744076'
  }

  currentWeather (param, onDone) {
    let now = new Date();
    if (this.lastTime == now.getUTCDay() || param.hour != now.getHours()) { return }
    this.lastTime = now.getUTCDay();
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' +
      param.city +
      '&units=imperial&appid=' +
      this.key;
    var result = null;
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if (body.cod == 200) {
        res = body.weather[0].main;
        result = {
          weather: res
        };
      } else {
        console.log(body.cod);
      }
      onDone(result);
    });
  }

  rainWeather (param, onDone) {
    let now = new Date();
    if (this.lastTime == now.getUTCDay() || param.hour != now.getHours()) { return }
    this.lastTime = now.getUTCDay();
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    tomorrow = tomorrow.toISOString().slice(0, 10) + ' 09:00:00'
    let url = 'https://api.openweathermap.org/data/2.5/forecast?q=' +
      param.city +
      '&units=imperial&appid=' +
      this.key;
    var result = null;
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if (body.cod == 200) {
        body.list.forEach(function(weatherData){
          if (weatherData.dt_txt == tomorrow){
            if (weatherData.weather[0].main == "Rain"){
              result = {
                rain: true
              };
            }
          }
        });
      } else {
        console.log(body.cod);
      }
      onDone(result);
    });
  }
}

module.exports = weatherManager;