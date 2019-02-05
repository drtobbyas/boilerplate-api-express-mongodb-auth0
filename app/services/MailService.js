const MainService = require('./MainService');
const nodemailer = require('nodemailer');
const config = require('../../config/app');

module.exports = class MailService extends MainService {
  constructor({ from = [], to = [], cc = [], bcc = [], subject = '', bodyText = '', bodyHtml = '' }) {
    super('Mail Service');
    
    this._serviceProvider = nodemailer;
    this._mailOptions = {
      from,
      to,
      cc,
      bcc,
      subject,
      text: bodyText,
      html: bodyHtml,
    };

    this._transport = this._serviceProvider.createTransport({
      host: config.mail.host,
      port: config.mail.port,
      secure: true,
      auth: {
        user: config.mail.auth.user,
        pass: config.mail.auth.pass,
      },
    });
  }

  _getMailTransport() {
    return this._transport;
  }

  _getMailOptions() {
    return this._mailOptions;
  }

  send() {
    return this._getMailTransport().sendMail(this._getMailOptions());
  }
};
