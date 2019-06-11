class scheduleManager {

  constructor () {
    this.lastTime = -1;
    this.month = -1;
  }

  daily(param, onDone) {
    let now = new Date();
    if (this.lastTime != now.getUTCDay() && param.hour == now.getHours()) {
      this.lastTime = now.getUTCDay();
      onDone({
        valueType: "scheduleResult",
        Date: now
      });
    }
  }

  weekly(param, onDone) {
    let now = new Date();
    if ((this.lastTime != now.getUTCDate() || 
          (this.lastTime == now.getUTCDate() && this.month != now.getUTCMonth))
        && param.day == now.getUTCDay()  
        && param.hour == now.getHours()) {
      this.lastTime = now.getUTCDate();
      this.month = now.getUTCMonth();
      onDone({
        valueType: "scheduleResult",
        Date: now
      });
    }
  }

  monthly(param, onDone) {
    let now = new Date();
    if (this.lastTime != now.getUTCMonth() && param.date == now.getUTCDate() && param.hour == now.getHours()) {
      this.lastTime = now.getUTCMonth();
      onDone ({
        valueType: "scheduleResult",
        Date: now
      });
    }
  }

}

module.exports = scheduleManager;