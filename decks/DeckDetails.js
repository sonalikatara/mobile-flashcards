import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from  './decksAction' 
import { AppLoading } from 'expo'
import { bgColor, textColor, deckBgColor } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
`

const DeckView = styled.View`
   border: 1px solid ${textColor};
    height: 80px;
    margin: 10px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`
class DeckDetails extends Component {
    static navigationOptions = ({ navigation }) => {
        const { deckTitle } = navigation.state.params

        return {
            title: `${deckTitle}`
        }
    }

    state = {
        deck: this.props.deck,
        deckTitle: this.props.deckTitle
    }

    render(){
        const { deckTitle, deck } = this.props
        return(
            <CenterView>
                <Text> {deckTitle} </Text>
                <TouchableOpacity key='newCard' 
                    onPress={() => this.props.navigation.navigate(
                        'NewCard',
                        { deckTitle: deckTitle }
                    )}
                >
                    <DeckView>
                        <Text style={{ alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: textColor }} >Add Card</Text>
                    </DeckView>
                </TouchableOpacity>
                <TouchableOpacity key='quiz'
                    onPress={() => this.props.navigation.navigate(
                        'QuizView',
                        { deckTitle: deckTitle }
                    )}>
                    <DeckView>
                        <Text style={{ alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: textColor }} >Start Quiz</Text>
                    </DeckView>
                </TouchableOpacity>

            </CenterView>
        )
    }
}

function mapStateToProps (state, { navigation }) {
    const { deckTitle } = navigation.state.params
    const decks = state.decksReducer.decks

    return {
        deck: decks[deckTitle],
        deckTitle
    }
  }

export default connect(mapStateToProps)(DeckDetails)