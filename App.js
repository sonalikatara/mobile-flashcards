import React from 'react'
import { StyleSheet, Text, View, Platform, StatusBar} from 'react-native'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, Connect } from 'react-redux'
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation'
import thunk from 'redux-thunk'

import reducer from './reducers'
import AddCard from './components/AddCard'
import AllDecks from './decks/AllDecks'
import NewDeck from './decks/NewDeck'
import DeckDetails from './decks/DeckDetails'
import NewCard from './cards/NewCard'
import Quiz from './cards/Quiz'
import { fetchAllDecks } from './decks/decksAction'
import { bgColor, textColor, inActiveColor, deckBgColor } from './utils/colors'

import { Constants } from 'expo'
import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons'

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function FlashCardsStatusBar ({backgroundColor, ...props}) {
      return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
          <StatusBar translucent backgroundColor={backgroundColor} {...props} />
        </View>
      )
}

export default class App extends React.Component {
render() {
  const composeEnhancers = compose
  const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(thunk)
    ))

  store.dispatch(fetchAllDecks())


  const Tabs = createBottomTabNavigator(
    {
    Home: {
      screen: AllDecks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Foundation name='clipboard-notes' size={30} color={tintColor} />
      },
    },
    AddDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'Add Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      },
    }
  }, 
  {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: textColor,
      inactiveTintColor:inActiveColor,
      style: {
        height: 56,
        backgroundColor: bgColor,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
  )

  const Stack = createStackNavigator({
    Home: {
      screen: Tabs,
    },
    DeckDetails: {
      screen: DeckDetails,
      navigationOptions: {
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: deckBgColor,
        }
      }
    },
    NewCard: {
      screen: NewCard,
      navigationOptions: {
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: deckBgColor,
        }
      }
    },
    QuizView: {
      screen: Quiz,
      navigationOptions: {
        headerTintColor: textColor,
        headerStyle: {
          backgroundColor: deckBgColor,
        }
      }
    }
  })

    return (

      <Provider store={store}>
        <View style={{flex: 1}}>
          <FlashCardsStatusBar backgroundColor={textColor} tintColor={textColor} barStyle="light-content" />
          <Stack />
        </View>
    </Provider>
    )
  }
}






