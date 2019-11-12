import HandAtPlay from './HandAtPlay';

it('intializes without crashing', () => {
  const handAtPlay = new HandAtPlay("rock");
  expect(handAtPlay.name).toBe('rock')
});

//check for winning hands
it('rock wins against scissors', () => {
  const yourHand = new HandAtPlay("rock");
  const opponentHand = new HandAtPlay("scissors");

  expect(yourHand.didWin(opponentHand)).toBe(2);
});

it('paper wins against rock', () => {
  const yourHand = new HandAtPlay("paper");
  const opponentHand = new HandAtPlay("rock");

  expect(yourHand.didWin(opponentHand)).toBe(2);
});

it('scissors wins against paper', () => {
  const yourHand = new HandAtPlay("paper");
  const opponentHand = new HandAtPlay("rock");

  expect(yourHand.didWin(opponentHand)).toBe(2);
});

//check for draw hands
it('rock draws against rock', () => {
  const yourHand = new HandAtPlay("rock");
  const opponentHand = new HandAtPlay("rock");

  expect(yourHand.didWin(opponentHand)).toBe(1);
});

it('paper draws against paper', () => {
  const yourHand = new HandAtPlay("paper");
  const opponentHand = new HandAtPlay("paper");

  expect(yourHand.didWin(opponentHand)).toBe(1);
});

it('scissors draws against scissors', () => {
  const yourHand = new HandAtPlay("scissors");
  const opponentHand = new HandAtPlay("scissors");

  expect(yourHand.didWin(opponentHand)).toBe(1);
});

//check for losing hands
it('rock loses against paper', () => {
  const yourHand = new HandAtPlay("rock");
  const opponentHand = new HandAtPlay("paper");

  expect(yourHand.didWin(opponentHand)).toBe(3);
});

it('paper loses against scissors', () => {
  const yourHand = new HandAtPlay("paper");
  const opponentHand = new HandAtPlay("scissors");

  expect(yourHand.didWin(opponentHand)).toBe(3);
});

it('scissors loses against rock', () => {
  const yourHand = new HandAtPlay("scissors");
  const opponentHand = new HandAtPlay("rock");

  expect(yourHand.didWin(opponentHand)).toBe(3);
});
