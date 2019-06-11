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

class boredManager {
  constructor() {
    this.lastWeek = -1;
  }

  getActivity(param, onDone) {
    let now = new Date();
    var result;
    if (this.lastWeek != now.getWeekNumber() && param.day == now.getUTCDay()) {
      this.lastWeek = now.getWeekNumber();
      var req = "https://www.boredapi.com/api/activity";
      var result = null;
      request(req, { json: true }, (err, res, body) => {
        if (err) {
          console.log(err);
          return;
        }
        result = { activity: body.activity };
        onDone(result);
      });
    }
  }
}

module.exports = boredManager;
