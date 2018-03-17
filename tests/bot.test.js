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

  describe('getUsers() when user is not mentioned in message', () => {
    const message = `Hey what is up :beer:`;
    it('should return undefined', () => {
      expect(Bot.getUsers(message)).toEqual(undefined);
    });
  });

  describe('findUserById()', () => {

  });
});
