import React, { Component } from 'react'
import {View, Text, TouchableOpacity } from 'react-native'
import { bgColor, textColor, inActiveColor, white, deckBgColor} from '../utils/colors'

import styled from 'styled-components/native'

const DeckView = styled.View`
   border: 1px solid ${inActiveColor};
    height: 80px;
    margin: 20px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`
const CardLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`

const DeckLabel = styled.Text`
    color: ${textColor};
    font-size: 20px;
    font-weight: bold;
    margin: 0px 40px;
`

class ShowDeck extends Component {

    render() {
        const { title, questions } = typeof this.props.deck !== undefined ? this.props.deck : { title: '', questions: [] }

        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate(
                    'DeckDetails',
                    { deckTitle: title }
                )}
            >
                <DeckView>
                    <DeckLabel>{title}</DeckLabel>
                    <CardLabel>{questions.length} cards</CardLabel>
                </DeckView>
            </TouchableOpacity>
        )
    }
}


export default ShowDeck