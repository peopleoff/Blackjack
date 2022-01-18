const numberOfshoes = 6;
const cardSuits = ["heart", "spade", "club", "diamond"];
const cardValues = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export function buildShoe() {
  const shoe = [];
  //Build shoes based on number of shoes from user
  for (let i = 0; i < numberOfshoes; i++) {
    cardSuits.forEach((suit) => {
      cardValues.forEach((value) => {
        shoe.push({
          id: `${value}${suit}`,
          suit,
          value,
        });
      });
    });
  }
  //shuffle the shoe after it's built
  shuffleArray(shoe);
  return shoe;
}

export function getHandValue(hand) {
  let value = 0;
  hand.forEach((card) => {
    switch (card.value) {
      case "A":
        //If value is greater than 21, then the value of the Ace is reduced to 1.
        if (value + 11 <= 21) {
          value += 11;
        } else {
          value += 1;
        }
        break;
      case "J":
        value += 10;
        break;
      case "Q":
        value += 10;
        break;
      case "K":
        value += 10;
        break;
      default:
        value += Number(card.value);
        break;
    }
  });
  return value;
}
