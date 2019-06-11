const request = require('request');

class newsManager {

  constructor() {
    this.lastVerif = Math.round(new Date().getTime() / 1000);
  }

  async newVideo (param, onDone) {
    let url = 'https://api.dailymotion.com/videos?sort=recent&search=' + 
      param.subject + 
      '&created_after=' + 
      this.lastVerif;
    this.lastVerif = Math.round(new Date().getTime() / 1000);
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if (!("error" in body) && body.total > 0) {
        return onDone({
          valueType: "NewVideoResult",
          totalResults: body.total > body.limit? body.limit : body.total,
          videos: body.list
        });
      }
    });
  }
}

module.exports = newsManager;