import Bot from '../bot';

//get user
describe('Bot', () => {
  describe('getUsers() when user is mentioned in message', () => {
    const userId = 'U8LS2JYG0';
    const message = `Hey what is up <@${userId}>`;
    it('should get the user ids from message', () => {
      expect(Bot.getUsers(message)).toEqual([userId]);
    });
  });

  describe('checkBeerReceiverIsNotBeerGiver() when beerGiver is one of the beerReceivers', () => {
    const beerGiver = 'jprevite';
    const beerReceivers = ['jprevite', 'tscritch'];
    const expectedObject = {
      message: 'DANGER! Drunken Slacker is trying to give beer to him/herself.',
      isNotBeerGiver: false
    };
    it('should return a danger message and isNotBeerGiver should equal false', () => {
      expect(
        Bot.checkBeerReceiverIsNotBeerGiver(beerGiver, beerReceivers)
      ).toMatchObject(expectedObject);
    });
  });

  describe('getUsers() when user is not mentioned in message', () => {
    const message = `Hey what is up :beer:`;
    it('should return undefined', () => {
      expect(Bot.getUsers(message)).toEqual(undefined);
    });
  });

  describe('findUserById()', () => {});
});
