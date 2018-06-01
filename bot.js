import User from './db/models/user'
require('dotenv').config()
const { WebClient } = require('@slack/client')
const token = process.env.SLACK_BOT_TOKEN
const web = new WebClient(token)

function getUsers (text) {
  let userTags = text.match(/\<@U\w+>/g)
  if (userTags) {
    return userTags.map(user => {
      return user.replace(/[<@>]/g, '')
    })
  } else {
    console.error("Don't know how you got here but you must be drunk")
  }
}

function findUserById (id) {
  return web.users.list().then(res => {
    const user = res.members.find(u => u.id === id)
    if (user) {
      return ' ' + user.profile.display_name
    } else {
      return 'no user to give beer to'
    }
  })
}

function checkBeerReceiverIsNotBeerGiver (beerGiver, beerReceivers) {
  let checkBeerReceiverObject = {}
  if (beerReceivers.includes(beerGiver)) {
    checkBeerReceiverObject.message =
      'DANGER! Drunken Slacker is trying to give beer to him/herself.'
    checkBeerReceiverObject.isNotBeerGiver = false
  } else {
    checkBeerReceiverObject.message =
      'Sharing is caring. Beer given to someone else.'
    checkBeerReceiverObject.isNotBeerGiver = true
  }
  return checkBeerReceiverObject
}

async function getUserData (user, text, channel) {
  try {
    let beerGiverUserId = user
    let mentionedUsersPromise = getUsers(text)
    let beerGiverPromise = findUserById(beerGiverUserId)

    let beerReceiversPromise = mentionedUsersPromise.map(u => {
      return findUserById(u)
    })

    const [beerGiver] = await Promise.all([beerGiverPromise])
    const beerReceivers = await Promise.all(beerReceiversPromise)
    const checkBeerReceiverObject = checkBeerReceiverIsNotBeerGiver(
      beerGiver,
      beerReceivers
    )
    if (checkBeerReceiverObject.isNotBeerGiver) {
      console.log(
        `(channel:${channel})${beerGiver} gave 1 beer to the following user(s):${beerReceivers}`
      )
    } else {
      console.log(checkBeerReceiverObject.message)
      // do not do anything. user tried to give beer to him/herself.
    }
  } catch (error) {
    console.log(error)
  }
}

let Bot = {
  getUsers,
  findUserById,
  checkBeerReceiverIsNotBeerGiver,
  getUserData
}

export default Bot
