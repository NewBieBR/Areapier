

class beautifierMail {

  constructor () {
    this.footer = "\n\nThis mail is sent to you by Area 42 (contact us with area42.dev@gmail.com)"
  }

  text (param) {
    if (!param.text) {
      param['text'] = "";
    } else if ("actionValue" in param) {
      Object.keys(param.actionValue).forEach(function(key) {
        if (key !== "valueType")
          param.text = param.text.replace('$' + key, String(param.actionValue[key]));
      });
    }
    return param.text + this.footer;
  }

  newArticle (param) {
    var content = "";
    if (!("actionValue" in param) || param.actionValue.valueType !== "NewArticleResult") {
      content += 'Error : Invalid parameters. This parameter is for "New article" of the service "News".'
    } else {
      content += String(param.actionValue.totalResults) + " article(s) may interest you!";
      param.actionValue.articles.forEach(article => {
        content += "\n\n" +
          article.title +
          " by " +
          article.source.name +
          " :\n" +
          article.description +
          "\nURL : " +
          article.url;
      })
    }
    return content + this.footer;
  }

  newVideo (param) {
    var content = "";
    if (!param.actionValue || param.actionValue.valueType !== "NewVideoResult") {
      content += 'Error : Invalid parameters. This parameter is for "New video" of the service "Dailymotion".'
    } else {
      content += String(param.actionValue.totalResults) + " video(s) may interest you!";
      param.actionValue.videos.forEach(video => {
        content += "\n\n" +
          video.title +
          "\nURL : https://www.dailymotion.com/video/" + video.id;
      })
    }
    return content + this.footer;
  }
}

module.exports = new beautifierMail();