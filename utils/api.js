import { AsyncStorage } from 'react-native'
//import getDefaultFlashCardsInfo from './helper'
const FLASHCARDS_STORAGE_KEY = 'FlashCards:Me'


export function getDefaultFlashCardsInfo() {
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
      return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
        .then(formatResults)
        .catch(error => {
            console.log("error fetching : " + error)
            return error
          })
    }

function formatResults(results) {
       console.log("results : " + results)
       return results === null
           ? getDefaultFlashCardsInfo()
            : JSON.parse(results)
}

export function submitEntry ({ entry, key }) {
  return AsyncStorage.mergeItem(FLASHCARDS_STORAGE_KEY, JSON.stringify({
    [key]: entry
  }))
}

export function removeEntry (key) {
  return AsyncStorage.getItem(FLASHCARDS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
     data[key] = undefined
    delete data[key]
     AsyncStorage.setItem(FLASHCARDS_STORAGE_KEY, JSON.stringify(data))
    })
} 