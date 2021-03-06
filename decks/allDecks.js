import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, FlatList } from 'react-native'
import { fetchAllDecks } from '../decks/decksAction'
//import { DeckDetails } from '../decks/DeckDetails'
import { AppLoading } from 'expo'
import { bgColor, textColor, deckBgColor, inActiveColor, white } from '../utils/colors'
import ShowDeck from '../decks/showDeck'
import styled from 'styled-components/native'


const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
`

class AllDecks extends Component {
    state = {
        decks: this.props.decks,
        ready: false
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.decks !== undefined) {
            let decks = Object.values(nextProps.decks)
            this.setState({
                decks: decks,
                ready: true
            })
        }
    }

    render() {
        const decks = this.state.decks ? this.state.decks : []
        const { ready } = this.state

        if (ready === false) {
            return <AppLoading />
        }

        return (
            <CenterView>
                <FlatList data={decks} renderItem={({ item }) =>
                    <ShowDeck  deck={item} navigation={this.props.navigation} />
                } keyExtractor={(item, index) => index.toString()}/>
            </CenterView>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const decks = state.decksReducer.decks
   // console.log("got all decks " + JSON.stringify(decks))
    return { decks: decks };
}

export default connect(mapStateToProps)(AllDecks)