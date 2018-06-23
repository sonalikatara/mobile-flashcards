import {RECEIVE_DECKS, ADD_DECK, ADD_CARD} from '../actions'

function decksReducer (state = { decks:[]}, action) {
   const { decks } = action
   let newState = {}

    switch (action.type) {
      
      case RECEIVE_DECKS :
       newState = {
                ...state,
                "decks": decks
            }  
            return newState

      case ADD_DECK :
      debugger
        updatedDecks = decks    
        return {
          ...state,
         "decks": updatedDecks,
        } 

       case ADD_CARD :
        updatedDecks = decks
        newState = {
            ...state,
            "decks": updatedDecks
        }
        return newState

      default :
        return state
    }
  }
  
  export default decksReducer