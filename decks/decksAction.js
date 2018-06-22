import * as API from '../utils/api'
import { RECEIVE_DECKS, ADD_DECK } from '../actions'
   
export const receiveDecks = (decks) =>(
   {
      type: RECEIVE_DECKS,
      decks
  }
) 

export const fetchAllDecks = () => dispatch => (
       API.fetchAllDecks().then((decks) => dispatch(receiveDecks(decks)))
    );

export const addDeck = decks => ({ //get back new set of decks
      type: ADD_DECK,
      decks
  })