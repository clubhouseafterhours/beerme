require('dotenv').config();
import Bot from './bot';
const { RTMClient } = require('@slack/client');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

rtm.start();

rtm.on('message', message => {
  let text = message.text;
  let user = message.user;
  let channel = message.channel;
  // First, check to make sure the message includes the beer emoji.
  if (!text.includes(':beer:')) {
    return;
  }

  // Skip messages that are from a bot or my own user ID
  if (
    (message.subtype && message.subtype === 'bot_message') ||
    (!message.subtype && user === rtm.activeUserId)
  ) {
    return;
  }

  // Next, check to make sure the beer was given to at least one person.
  let numberOfUsers = text.match(/\<@U\w+>/g);
  if (numberOfUsers === null) {
    console.log('No users were given a beer');
    return;
  }

  Bot.getUserData(user, text, channel);
});
