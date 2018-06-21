import * as API from '../utils/api'
import { RECEIVE_DECKS, ADD_DECK } from '../actions'
   
export function receiveDecks (decks) {
  return {
    type: RECEIVE_DECKS,
    decks,
  }
}

export const fetchAllDecks = () => dispatch => (
       API.fetchAllDecks().then((decks) => dispatch(receiveDecks(decks)))
    );

export function addDeck (deck) {
  return {
    type: ADD_DECK,
    deck,
  }
}