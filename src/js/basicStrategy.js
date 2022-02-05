import { GetRecommendedPlayerAction } from "blackjack-strategy";


const options = {
    hitSoft17: true, // Does dealer hit soft 17
    surrender: "none", // Surrender offered - none, late, or early
    double: "any", // Double rules - none, 10or11, 9or10or11, any
    doubleRange: [0, 21], // Range of values you can double, 
    // if set supercedes double (v1.1 or higher)
    doubleAfterSplit: true, // Can double after split
    resplitAces: false, // Can you resplit aces
    offerInsurance: true, // Is insurance offered
    numberOfDecks: 6, // Number of decks in play
    maxSplitHands: 4, // Max number of hands you can have due to splits
    count: { // Structure defining the count (v1.3 or higher)
        system: null, // The count system - only "HiLo" is supported
        trueCount: null
    }, // The TrueCount (count / number of decks left)
    strategyComplexity: "simple" // easy (v1.2 or higher), simple, advanced,
        // exactComposition, bjc-supereasy (v1.4 or higher),
        // bjc-simple (v1.4 or higher), or bjc-great
        // (v1.4 or higer) - see below for details
};

function trueValue(card) {
    switch (card) {
        case "A":
            return 1;
        case "J":
        case "Q":
        case "K":
            return 10;
        default:
            return parseInt(card);
    }
}

export function getRecommendedAdvice(playerCards, dealerCard) {
    const playerValues = playerCards.map((card) => card.value);
    const dealerValue = trueValue(dealerCard[0].value);
    //Loop through each card and change values from k,q,j,a to 10,10,10,1
    playerValues.forEach(function(part, index) {
        this[index] = trueValue(part);
    }, playerValues); // use arr as this
    const advice = getRecommendedPlayerAction(playerValues, dealerValue);
    return advice
}

export function getRecommendedPlayerAction(playerCards, dealerCard) {
    const result = GetRecommendedPlayerAction(playerCards, dealerCard, 1, true, options);
    return result;
}