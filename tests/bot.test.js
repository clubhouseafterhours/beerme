import Bot from '../bot'

describe('Bot', () => {
  describe('getUsers() when user is mentioned in message', () => {
    const userId = 'U8LS2JYG0'
    const message = `Hey what is up <@${userId}>`
    it('should get the user ids from message', () => {
      expect(Bot.getUsers(message)).toEqual([userId])
    })
  })

  describe('checkBeerReceiverIsNotBeerGiver() when beerGiver is one of the beerReceivers', () => {
    const beerGiver = 'jprevite'
    const beerReceivers = ['jprevite', 'tscritch']
    const expectedObject = {
      message: 'DANGER! Drunken Slacker is trying to give beer to him/herself.',
      isNotBeerGiver: false
    }
    it('should return a danger message and isNotBeerGiver should equal false', () => {
      expect(
        Bot.checkBeerReceiverIsNotBeerGiver(beerGiver, beerReceivers)
      ).toMatchObject(expectedObject)
    })
  })

  describe('getUsers() when user is not mentioned in message', () => {
    const message = `Hey what is up :beer:`
    it('should return undefined', () => {
      expect(Bot.getUsers(message)).toEqual(undefined)
    })
  })

  describe('findUserById()', () => {})
})

// write tests for index.js
// Test Ideas:
// 1. check to make sure mesage is not undefined (which happens if you only post a link like of a gif).
// 2 check to make there is a user.
