require('dotenv').config();
const { RTMClient, WebClient } = require('@slack/client');
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);
const rtm = new RTMClient(token);

rtm.start();

rtm.on('message', (message) => {
  if (message.text.includes(':beer:')) {
    let beerGiverUserId = message.user;
    let numberOfBeers = message.text.match(/:beer:/g).length;
    let mentionedUsers = getUsers(message.text);
    let beerGiver = findUserById(beerGiverUserId);
    let beerReceivers = mentionedUsers.map((u) => {
      return findUserById(u)
    })
    console.log(`(channel:${message.channel}) ${beerGiver} gave ${numberOfBeers} to ${beerReceivers}!`);
  }

  // Skip messages that are from a bot or my own user ID
  if ((message.subtype && message.subtype === 'bot_message') ||
    (!message.subtype && message.user === rtm.activeUserId)) {
    return;
  }

  // Log the message
  console.log(`(channel:${message.channel}) ${message.user} says: ${message.text}`);
});


function getUsers(text) {
  let userTags = text.match(/\<@U\w+>/g);
  return userTags.map((user) => {
    return user.replace(/[<@>]/g, '');
  });
}

function findUserById(id) {
  let u;
  web.users.list()
    .then((res) => {
      const user = res.members.find(u => u.id === id);

      if (user) {
        console.log(user.profile.display_name);
      } else {
        console.log('no user to give beer to');
      }
    });
}
