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

let Bot = {
  getUsers,
  findUserById
}

export default Bot;
