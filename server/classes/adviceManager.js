const request = require("request");

Date.prototype.getWeekNumber = function() {
  var d = new Date(
    Date.UTC(this.getFullYear(), this.getMonth(), this.getDate())
  );
  var dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
};

class adviceManager {
  constructor() {
    this.lastWeek = -1;
  }

  getAdvice(param, onDone) {
    let now = new Date();
    var result;
    if (this.lastWeek != now.getWeekNumber() && param.day == now.getUTCDay()) {
      this.lastWeek = now.getWeekNumber();
      var req = "https://api.adviceslip.com/advice";
      var result = null;
      request(req, { json: true }, (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        result = { advice: body.slip.advice };
        onDone(result);
      });
    }
  }

  getQuote(param, onDone) {
    let now = new Date();
    var result;
    if (this.lastWeek != now.getWeekNumber() && param.day == now.getUTCDay()) {
      this.lastWeek = now.getWeekNumber();
      var req =
        "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";
      var result = null;
      request(req, { json: true }, (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        result = { quote: body.quoteText, quote_author: body.quoteAuthor };
        onDone(result);
      });
    }
  }

  getFact(param, onDone) {
    let now = new Date();
    var result;
    if (this.lastWeek != now.getWeekNumber() && param.day == now.getUTCDay()) {
      this.lastWeek = now.getWeekNumber();
      var req = "http://numbersapi.com/random/" + param.type;
      var result = null;
      request(req, { json: true }, (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        result = { fact: body };
        onDone(result);
      });
    }
  }
}

module.exports = adviceManager;
