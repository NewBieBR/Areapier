const request = require('request');
const moment = require('moment');

class intraEpitechManager {

  constructor() {
    this.regex = /^(?:https\:\/\/intra\.epitech\.eu\/auth\-)/;
    this.lastMessageDate = "";
    this.lastRecentMissed = -1;
  }

  newMessage(param, onDone) {
    if (!("autologinLink" in param) || param.autologinLink.search(this.regex) != 0) { return onDone(null); }
    let url = param.autologinLink + "/user/notification/message?format=json";
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if (body.length > 0) {
        if (this.lastMessageDate === "") {
          this.lastMessageDate = body[0].date;
          return;
        }
        if (this.lastMessageDate !== body[0].date) {
          var data = {
            contentType: "IEnewMessagesResult",
            nbMessages: 0,
            messages: []
          };
          for (var i = 0; i < body.length; i++) {
            if (this.lastMessageDate === body[i].date) { break; }
            else {
              data.nbMessages++;
              data.messages.push(body[i]);
            }
          }
          this.lastMessageDate = body[0].date;
          return onDone(data);
        }
      }
    });
  }

  newMissed(param, onDone) {
    if (!("autologinLink" in param) || param.autologinLink.search(this.regex) != 0) { return onDone(null); }
    let url = param.autologinLink + "/user/notification/missed?format=json";
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if (this.lastRecentMissed == -1 || this.lastRecentMissed >= body.recents.length) {
        this.lastRecentMissed = body.recents.length;
        return;
      } else {
        var data = {
          contentType: "IEnewMissedResult",
          nbMissed: 0,
          missed: []
        };
        var i = 0;
        for (this.lastRecentMissed; this.lastRecentMissed < body.recents.length; this.lastRecentMissed++) {
          data.nbMissed++;
          data.missed.push(body.recents[i]);
          i++;
        }
        return onDone(data);
      }
    });
  }

  endProject(param, onDone) {
    if (!("autologinLink" in param) || param.autologinLink.search(this.regex) != 0) { return onDone(null); }
    let url = param.autologinLink + "/?format=json";
    var date = moment().add(param.timeValue, param.timeKey).format('DD/MM/YYYY, HH:mm');
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      var data = {
        contentType: "IEprojectResult",
        nbProject: 0,
        projects: []
      };
      body.board.projets.forEach(projet => {
        if (projet.timeline_end === date) {
          data.nbProject++;
          data.projects.push(projet);
        }
      });
      if (data.nbProject == 0) { return; } else { return onDone(data); }
    });
  }
}

module.exports = intraEpitechManager;