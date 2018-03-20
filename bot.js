require('dotenv').config();
const { WebClient } = require('@slack/client');
const token = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(token);

function getUsers(text) {
  let userTags = text.match(/\<@U\w+>/g);
  if (userTags) {
    return userTags.map((user) => {
      return user.replace(/[<@>]/g, '');
    });
  }
  else {
    console.error('Don\'t know how you got here you must be drunk');
  }
}

function findUserById(id) {
  let u;
  return web.users.list()
    .then((res) => {
      const user = res.members.find(u => u.id === id);
      if (user) {
        return user.profile.display_name;
      } else {
        return 'no user to give beer to';
      }
    });
}

async function getUserData(user, text, channel) {
  try {
    let beerGiverUserId = user;
    let numberOfBeers = (text.match(/:beer:/g).length > 1 ? text.match(/:beer:/g).length + ' beers' : text.match(/:beer:/g).length + ' beer');

    let mentionedUsersPromise = getUsers(text);
    let beerGiverPromise = findUserById(beerGiverUserId);
    
    let beerReceiversPromise = mentionedUsersPromise.map((u) => {
      return findUserById(u)
    });

    const [mentionedUsers, beerGiver] = await Promise.all([mentionedUsersPromise, beerGiverPromise]);
    const beerReceivers = await Promise.all(beerReceiversPromise);
    console.log(`(channel:${channel}) ${beerGiver} gave ${numberOfBeers} to ${beerReceivers}!`);
  } catch (error) {
    console.log(error);
  }
}

let Bot = {
  getUsers,
  findUserById,
  getUserData
}

export default Bot;
