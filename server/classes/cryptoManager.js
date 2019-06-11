const request = require("request");

Date.prototype.getWeekNumber = function(){
  var d = new Date(Date.UTC(this.getFullYear(), this.getMonth(), this.getDate()));
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
};

class cryptoManager {
  constructor() {
    this.lastWeek = -1;
  }

  cryptoPrice(param, onDone) {
    let now = new Date();
    if (this.lastWeek != now.getWeekNumber() && param.day == now.getUTCDay()) {
      this.lastWeek = now.getWeekNumber();
      var req = "https://api.coinmarketcap.com/v2/ticker/?convert=EUR";
      var result = null;
      request(req, { json: true }, (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        var crypto;
        var data = body.data;
        for (var i in data) {
          if (data[i].symbol == param.crypto) {
            crypto = data[i];
            break;
          }
        }
        if (!crypto) return;
        result = {
          crypto_name: crypto.name,
          crypto_price: crypto.quotes["EUR"].price
        };
        onDone(result)
      });
    }
  }
}

module.exports = cryptoManager;
