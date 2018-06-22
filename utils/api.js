import { AsyncStorage } from 'react-native'
//import getDefaultFlashCardsInfo from './helper'
const FLASHCARDS_STORAGE_KEY = 'FlashCards:Me'

function getDefaultFlashCardsInfo() {
  console.log("getDefaultFlashCardsInfo")
  const info = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
  return info
}

export function fetchAllDecks () {
      console.log("fetchAllDecks")
      return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(formatResults)
        .catch(error => {
            console.log("error fetching : " + error)
            return error
          })
    }
    

 function formatResults(results) {
       console.log(" format results : " + results)
       //return results === null ? getDefaultFlashCardsInfo() : JSON.parse(results)
       return getDefaultFlashCardsInfo()

}
/*
export function addNewDeck(deckName) {
  try {
    let decks = await fetchAllDecks()
    decks[deckName] = { title: deckName, questions: [] }
    await AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(decks));
    return decks;
  }
  catch (error) {
    console.log("error new deck : " + error)
  }

  return null
}
*/
export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
     data[key] = undefined
    delete data[key]
     AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
} 