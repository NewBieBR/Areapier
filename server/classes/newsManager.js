const request = require('request');

class newsManager {

  constructor() {
    this.lastVerif = new Date().toISOString().replace(/.[0-9][0-9][0-9]Z$/, 'Z')
    this.key = '06f6cf12a0d94c1da694baceb82d4a70'
  }

  newArticle(param, onDone) {
    let url = 'https://newsapi.org/v2/everything?q=' + 
      param.subject + 
      '&from=' + 
      this.lastVerif + 
      '&sortBy=publishedAt&apiKey=' + 
      this.key;
    this.lastVerif = new Date().toISOString().replace(/.[0-9][0-9][0-9]Z$/, 'Z');
    request(url, { json: true }, (err, res, body) => {
      if (err) {
        console.log(err);
        return;
      }
      if (body.status === "ok") {
        onDone({
          valueType: "NewArticleResult",
          totalResults: body.totalResults,
          articles: body.articles
        });
      }
    });
  }
}

module.exports = newsManager;