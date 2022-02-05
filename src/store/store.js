import { createStore } from "vuex";
import { buildShoe, getHandValue } from "../js/cardFunctions.js";
import { getRecommendedAdvice } from "../js/basicStrategy";

function getWinner(state) {
    const obj = {
        title: "",
        message: "",
        win: false,
    };
    const dealerValue = getHandValue(state.dealerCards);
    const getPlayerValue = getHandValue(state.playerCards);
    //if dealer value is over 21 or lower then the players, the player wins
    if (getPlayerValue > dealerValue) {
        obj.title = "You Win!";
        obj.message = "You Beat the Dealer";
        obj.win = true;
    }

    if (dealerValue > 21) {
        obj.title = "You Win!";
        obj.message = "The Dealer Busted";
        obj.win = true;
    }

    if (getPlayerValue > 21) {
        obj.title = "Bust";
        obj.message = "You went over 21 and busted";
        obj.win = false;
    }

    return obj;
};

export default createStore({
    state: {
        shoe: [],
        discardPile: [],
        dealerCards: [],
        playerCards: [],
        playerSecondHand: [],
        gameState: "notStarted",
        dealerShow: false,
        playerDoubled: false,
        cutCardIndex: 0,
        numberOfWins: 0,
        numberOfLosses: 0,
        numberOfPerfectStrategy: 0,
    },
    mutations: {
        initializeGame(state, newShoe) {
            state.shoe = newShoe;
            state.discardPile = [];
            state.dealerCards = [];
            state.playerCards = [];
        },
        setDealerCard(state, card) {
            if (!card) {
                state.dealerCards = [];
            } else {
                state.dealerCards.push(card);
            }
        },
        setPlayerCard(state, card) {
            if (!card) {
                state.playerCards = [];
            } else {
                state.playerCards.push(card);
            }
        },
        discardCard(state, card) {
            state.discardPile.push(card);
        },
        removeFromShoe(state, index) {
            state.shoe.splice(index, 1);
        },
        toggleRound(state, status) {
            state.gameState = status;
        },
        setGameState(state, gameState) {
            if (gameState == 'ended') {
                const playerWon = getWinner(state).win;
                if (playerWon) {
                    state.numberOfWins++;
                } else {
                    state.numberOfLosses++;
                }
            }
            state.gameState = gameState;
        },
        setDealerShow(state, show) {
            state.dealerShow = show;
        },
        setPlayerDoubled(state, doubled) {
            state.playerDoubled = doubled;
        },
        setCutCardIndex(state, index) {
            state.cutCardIndex = index;
        },
    },
    actions: {
        //Game Actions
        initializeGame({ commit }) {
            const newShoe = buildShoe();
            //Get a random number between 75% and 100% of the shoe then subtract 8 to make sure it's at least 8 away from the end of the shoe.
            const cutCardIndex =
                Math.floor(
                    Math.random() * (newShoe.length * 0.75 - newShoe.length + 1) +
                    newShoe.length
                ) - 8;
            commit("initializeGame", buildShoe());
            commit("setCutCardIndex", cutCardIndex);
        },
        //Reset all positions to default, then start a new round
        nextRound({ commit, dispatch, state }) {
            //Check if cutcard was drawn, if so reset the game.
            if (state.cutCardIndex > state.shoe.length) {
                return dispatch("initializeGame");
            } else {
                console.log("here");
                //discard all cards in both the dealer and player hands
                state.playerCards.forEach((card) => {
                    commit("discardCard", card);
                });
                state.dealerCards.forEach((card) => {
                    commit("discardCard", card);
                });
                //Call with empty param to reset the dealer's hand
                commit("setDealerCard");
                //Call with empty param to reset the players's hand
                commit("setPlayerCard");
                //Reset all variables
                commit("setDealerShow", false);
                commit("setPlayerDoubled", false);
                commit("setGameState", "playing");
                setTimeout(() => {
                    dispatch("startRound");
                }, 500);
            }
        },
        startRound({ dispatch, commit }) {
            commit("setGameState", "playing");
            //When all the players have placed their bets, the dealer gives one card face up to each player in rotation clockwise, and then one card face up to themselves.
            // dispatch("getPlayerCard", 2);
            setTimeout(() => {
                dispatch("getPlayerCard", 1);
            }, 0);
            setTimeout(() => {
                dispatch("getDealerCard", 1);
            }, 500);
            setTimeout(() => {
                dispatch("getPlayerCard", 1);
            }, 1000);
            setTimeout(() => {
                dispatch("getDealerCard", 1);
            }, 1500);
            // dispatch("getDealerCard", 2);
        },

        setDealerShow({ commit }, show) {
            commit("setDealerShow", show);
        },
        //Card Actions
        getDealerCard({ commit, state }, numberOfCards) {
            if (state.shoe.length > 0) {
                for (let index = 0; index < numberOfCards; index++) {
                    const cardIndex = Math.floor(Math.random() * state.shoe.length);
                    const card = state.shoe[cardIndex];
                    card.dealer = true;
                    commit("setDealerCard", card);
                    commit("removeFromShoe", card);
                }
            }
        },
        getPlayerCard({ commit, state, dispatch }, numberOfCards) {
            if (state.shoe.length > 0) {
                for (let index = 0; index < numberOfCards; index++) {
                    const cardIndex = Math.floor(Math.random() * state.shoe.length);
                    const card = state.shoe[cardIndex];
                    card.dealer = false;
                    commit("setPlayerCard", card);
                    commit("removeFromShoe", card);
                }
                //If player goes above 21, end the game
                if (getHandValue(state.playerCards) > 21) {
                    setTimeout(function() {
                        commit("setGameState", "ended");
                    }, 500);
                }
            }
        },
        checkCutCard({ commit, state }) {
            console.log(state.cutCardIndex);
            console.log(state.shoe.length);
        },
        dealerHits({ dispatch, commit, state }) {
            //Keep adding new cards until the dealer has a value of 17 or higher or if they have an Ace check if it's a soft 17
            const dealerHasAce = state.dealerCards.some((card) => card.value === "A");
            while (
                getHandValue(state.dealerCards) < 17 ||
                (dealerHasAce && getHandValue(state.dealerCards) < 18)
            ) {
                dispatch("getDealerCard", 1);
            }
            //End the round
            commit("setDealerShow", true);
            setTimeout(function() {
                commit("setGameState", "ended");
            }, 500);
        },
        //Player Actions
        playerAction({ commit, state, dispatch }, action) {
            const advice = getRecommendedAdvice(state.playerCards, state.dealerCards);
            console.log(advice);
            if (advice == action) {
                console.log(
                    "Player chose the correct action, they will not be penalized"
                )
            }
            switch (action) {
                case "hit":
                    dispatch("getPlayerCard", 1);
                    break;
                case "stand":
                    dispatch("dealerHits");
                    break;
                case "double":
                    dispatch("getPlayerCard", 1);
                    commit("setPlayerDoubled", true);
                    dispatch("dealerHits");
                    break;
                default:
                    break;

            }
        },
    },
    getters: {
        getshoe(state) {
            return state.shoe;
        },
        getWinner(state) {
            return getWinner(state);
        },
        getGameState(state) {
            return state.gameState;
        },
        getDiscardPile(state) {
            return state.discardPile;
        },
        getDealerCards(state) {
            return state.dealerCards;
        },
        getPlayerCards(state) {
            return state.playerCards;
        },
        getPlayerValue(state) {
            return getHandValue(state.playerCards);
        },
        getWinPercentage(state) {
            const wins = state.numberOfWins;
            const loses = state.numberOfLosses;
            const winPercentage = (wins / (wins + loses) * 100).toFixed(0);
            if (winPercentage !== "NaN") {
                return winPercentage;
            } else {
                return 0;
            }

        },
        getPerfectStrategyPercentage(state) {
            const wins = state.numberOfWins;
            const loses = state.numberOfLosses;
            const perfectStrategy = state.numberOfPerfectStrategy;
            const perfectStrategyPercentage = (perfectStrategy / (wins + loses) * 100).toFixed(0);
            if (perfectStrategyPercentage !== "NaN") {
                return perfectStrategyPercentage;
            } else {
                return 0;
            }

        },
        getDealerValue(state) {
            if (state.dealerCards.length > 0) {
                //If the dealer is showing their cards, show the value of their hand
                if (state.dealerShow) {
                    return getHandValue(state.dealerCards);
                } else {
                    //getHandValue requires an array
                    return getHandValue(new Array(state.dealerCards[0]));
                }
            }
        },
        getDealerShowing(state) {
            return state.dealerShow;
        },
        getPlayerDoubled(state) {
            return state.playerDoubled;
        },
        getCutCard(state) {
            return state.cutCardIndex;
        },
    },
});