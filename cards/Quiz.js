import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from '../decks/decksAction'
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

class Quiz extends Component {

    render() {
        const { deckTitle } = this.props
        return (
            <CenterView>
                <Text>Quiz on {deckTitle}</Text>
            </CenterView>
        );
    }
}

function mapStateToProps(state, { navigation }) {
    const { deckTitle } = navigation.state.params

    return {
        deckTitle
    }
}

export default connect(mapStateToProps)(Quiz)