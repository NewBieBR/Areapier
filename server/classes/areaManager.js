var scheduler = require('node-schedule');
var news = require('./newsManager');
var schedule = require('./scheduleManager');
var mail = require('./mailManager');
var dailymotion = require('./dailymotionManager');
var weather = require('./weatherManager');
var crypto = require('./cryptoManager')
var cat = require('./catManager')
var bored = require('./boredManager')
var advice = require('./adviceManager')
var joke = require('./jokeManager')
var meal = require('./mealManager')
var intraEpitech = require('./intraEpitechManager');

class areaManager {

  // constructor (params : array of area (optional))
  // create object 'service' containing all classes of action and reaction
  // create object 'area' containing all areas
  // create object 'scheduleParams' containing params for scheduler

  constructor (params = null) {
    this.service = {}
    this.service['newsManager'] = news;
    this.service['scheduleManager'] = schedule;
    this.service['mailManager'] = mail;
    this.service['dailymotionManager'] = dailymotion;
    this.service['weatherManager'] = weather;
    this.service['cryptoManager'] = crypto;
    this.service['catManager'] = cat;
    this.service['boredManager'] = bored;
    this.service['adviceManager'] = advice;
    this.service['jokeManager'] = joke;
    this.service['mealManager'] = meal;
    this.service['intraEpitechManager'] = intraEpitech;
    this.area = {}
    this.scheduleRule = '*/1 * * * *'
    if (params) {
      params.forEach(element => {
        this.addArea(element);
      });
    }
  }

  // addArea (params : object (required))
  // create a new area from param

  addArea (param) {
    var area = {
      "action" : {
        "classe" : new this.service[param.action.classeName],
        "funcName": param.action.funcName,
        "parameters" : param.action.parameters
      },
      "reactions" : []
    };
    param.reactions.forEach(reaction => {
      area.reactions.push({
        "classe" : new this.service[reaction.classeName],
        "funcName": reaction.funcName,
        "parameters" : reaction.parameters
      })
    })
    this.area[param.id] = {"job" : scheduler.scheduleJob({ 
      start: new Date(Date.now() + 5000), 
      rule: this.scheduleRule 
    }, function (){
      area.action.classe[area.action.funcName](area.action.parameters, retVal => {
        if (retVal) {
          area.reactions.forEach(reaction => {
            reaction.parameters['actionValue'] = retVal;
            reaction.classe[reaction.funcName](reaction.parameters)
          })
        }
      });
    }), "activated" : true}
    if (param.activated == false) {
      this.stopArea(param.id)
    }
  }

  // removeArea (id : string (required))
  // remove the area associate with 'id' and stop it if necessary

  removeArea (id) {
    if (this.area[id]) {
      this.area[id].job.cancel();
      delete this.area[id]
      return true;
    }
    return false;
  }

  // startArea (id : string (required))
  // start the area associate with 'id' if is stopped

  startArea (id) {
    if (this.area[id] && this.area[id].activated == false) {
      this.area[id].job.reschedule(this.scheduleParams);
      this.area[id].activated = true;
      return true;
    }
    return false;
  }

  // stopArea (id : string (required))
  // stop the area associate with 'id' if is started

  stopArea (id) {
    if (this.area[id] && this.area[id].activated == true) {
      this.area[id].job.cancel(true);
      this.area[id].activated = false;
      return true;
    }
    return false;
  }
}

module.exports = areaManager;