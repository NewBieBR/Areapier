var nodemailer = require('nodemailer');

class mailManager {

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'area42.dev@gmail.com',
        pass: 'friteforever'
      }
    });
    this.beautifierContent = require('./beautifierMail.js');
  }

  sendMail(param) {
    var mailOptions = {
      from: 'area42.dev@gmail.com',
      to: param.to,
      subject: param.subject,
      text: this.beautifierContent[param.contentType](param)
    };
    this.transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    }); 
  }
}

module.exports = mailManager;