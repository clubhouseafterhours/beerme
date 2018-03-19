require('dotenv').config();
import Bot from './bot';
const { RTMClient } = require('@slack/client');
const token = process.env.SLACK_BOT_TOKEN;
const rtm = new RTMClient(token);

rtm.start();

rtm.on('message', (message) => {
  // First, check to make sure the message includes the beer emoji.
  if (!message.text.includes(':beer:')) {
    return;
  }
  // Next, check to make sure the beer was given to at least one person.
  let numberOfUsers = message.text.match(/\<@U\w+>/g).length;
  if (numberOfUsers === 0) {
    console.log('no users were given a beer');
    return;
  }
  let beerGiverUserId = message.user;
  let numberOfBeers = (message.text.match(/:beer:/g).length > 1 ? message.text.match(/:beer:/g).length + ' beers' : message.text.match(/:beer:/g).length + ' beer' );
  let mentionedUsers = Bot.getUsers(message.text);
  let beerGiver = Bot.findUserById(beerGiverUserId);
  let beerReceivers = mentionedUsers.map((u) => {
    return Bot.findUserById(u)
  })
  console.log(`(channel:${message.channel}) ${beerGiver} gave ${numberOfBeers} to ${beerReceivers}!`);

  // Skip messages that are from a bot or my own user ID
  if ((message.subtype && message.subtype === 'bot_message') ||
    (!message.subtype && message.user === rtm.activeUserId)) {
    return;
  }

  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});
