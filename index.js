const { RTMClient, WebClient } = require('@slack/client');
const token = '';

const rtm = new RTMClient(token);
rtm.start();

const web = new WebClient(token);

web.channels.list().then((res) => {
  const channels = res.channels.filter(c => c.is_member);
  console.log(channels);
  if (channels.length > 0) {
    for (let channel of channels) {
      rtm.sendMessage('Hey Joe, look at me...', channel.id).then((msg) => {
        console.log(`Message sent to channel ${channel.name} with ts: ${msg.ts}`);
      }).catch(console.error);
    }
  }
  else {
    console.log('sucks to suck');
  }
});
