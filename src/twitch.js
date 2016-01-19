/**
 * twitch.js part freeCodeCamp TwitchTV Zipline project
 *
 * @license LICENSE.md  MIT
 * @author Joseph Morse <tamed.lionheart@gmail.com>
 * @version 0.1.0
 */

/* global $ */
var Twitch = function () {
  this.url = 'https://api.twitch.tv/kraken/streams';
  this.type = 'GET';
  this.crossDomain = true;
  this.data = '';
  this.headers = {
    'Accept': 'application/vnd.twitchtv.v3+json'
  };
};

Twitch.prototype.error = function (e, message) {
  $('body').appendTo('<p styles="color:fa0a0a;background-color:#cacaca;">' + message + '</p>');
};

module.exports = Twitch;
