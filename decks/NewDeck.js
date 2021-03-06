import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addNewDeck } from '../decks/decksAction'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import { bgColor, textColor, inActiveColor, white, deckBgColor} from '../utils/colors'
import styled from 'styled-components/native'
import { AppLoading } from 'expo'
import {StackActions, NavigationActions } from 'react-navigation'

const CenterView = styled.View`
   flex: 1;
    align-items: stretch;
   background: ${bgColor};
   padding-top: 20px;
   justify-content: center;
`

const NewDeckView = styled.TextInput`
    border: 1px solid ${textColor};
    height: 50px;
    margin: 10px 40px;
    justify-content: center;
    align-items: stretch;
    border-radius: 5px;
    font-size: 24px;
`
const DeckLabel = styled.Text`
    color: ${textColor};
    font-size: 15px;
    margin: 0px 40px;
`
const SubmitButton = styled.TouchableOpacity`
    border: 1px solid ${inActiveColor};
    height: 50px;
    margin: 10px 80px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: ${deckBgColor};
`

const SubmitButtonLabel = styled.Text`
    color: ${white};
    font-size: 15px;
    margin: 0px 40px;
`

class NewDeck extends Component {
    state = {
        decks: this.props.decks,
        newDeckName: '',
        deckDuplicate: false
    }

    componenentWillReceiveProps(nextProps){
        if (nextProps.decks !== undefined) {
               let decks = Object.values(nextProps.decks)
               this.setState({
                           decks: decks
                       })
                   }
    }

    validateDeck(deckName) {
        this.setState({ newDeckName: deckName })
    }

    toDeckDetails = (newDeckName) => {
       /* this.props.navigation.navigate(
            'DeckDetails',
            { deckTitle: newDeckName }
        )*/
        this.setState(() => ({ newDeckName: '', deckDuplicate: false}))
       const resetNavigationAction = StackActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'DeckDetails',  params: {deckTitle: newDeckName}})
            ]
          })
        this.props.navigation.dispatch(resetNavigationAction) 
    }

    submit = () => {
        const newDeckName = this.state.newDeckName
        this.props.addNewDeck(newDeckName)

        //this.setState(() => ({ newDeckName: '' }))
        this.toDeckDetails(newDeckName)
    }

   
    render(){
        const decks = this.state.decks ? this.state.decks : []
        
        return (
            <CenterView>
                <DeckLabel>CREATE A NEW DECK</DeckLabel>
                <DeckLabel>Deck Name</DeckLabel>
                <NewDeckView value={this.state.newDeckName} onChangeText={(text) => this.validateDeck(text)} />
                <SubmitButton
                    onPress={this.submit}>
                    <SubmitButtonLabel>SUBMIT</SubmitButtonLabel>
                </SubmitButton>
            </CenterView>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addNewDeck: (deckName) => dispatch(addNewDeck(deckName))
    }
}

function mapStateToProps(state, ownProps) {
    const decks = state.decksReducer.decks
    return { decks: decks };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck)
