import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AddCard from './components/AddCard'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, Connect } from 'react-redux'
import thunk from 'redux-thunk'
import reducer from './reducers'
import AllDecks from './decks/AllDecks'
import { fetchAllDecks } from './decks/decksAction'


export default class App extends React.Component {
  render() {
    const composeEnhancers = compose
    const store = createStore(
      reducer,
      composeEnhancers(
          applyMiddleware(thunk)
      ))

    store.dispatch(fetchAllDecks())

    return (

      <Provider store={store}>
        <View style={{flex: 1}}>
          <Text>Fash Cards Hello There !</Text>  
          <AllDecks />
        </View>
    </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
