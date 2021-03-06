import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TextInput } from 'react-native'
import {addNewCard } from '../decks/decksAction'
import { AppLoading } from 'expo'
import { bgColor, textColor, inActiveColor,white,deckBgColor } from '../utils/colors'
import styled from 'styled-components/native'

const CenterView = styled.View`
    flex: 1;
    align-items: stretch;
    background: ${bgColor};
    padding-top: 20px;
`

const NewCardTextInput = styled.TextInput`
   border: 1px solid ${textColor};
    height: 80px;
    margin: 10px 40px;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 24px;
`

const CardLabel = styled.Text`
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

class NewCard extends Component {
    state = {
        question : '',
        answer : '',
        deckTitle : this.props.deckTitle
    }

    static navigationOptions = ({navigation}) => {
        return {
            title: 'Add New Card'
        }
    }

    submitAddNewCard =() => {
        const deckTitle = this.state.deckTitle

        const newCard = {
            question: this.state.question,
            answer: this.state.answer
        }

        this.props.addNewCard(deckTitle, newCard)
        this.setState(() => ({ question: '',  answer: ''}))
        this.props.navigation.goBack();
    }

    render(){
         const { deckTitle } = this.props
        return (
            <CenterView>
               <CardLabel>Enter Question</CardLabel>
               <NewCardTextInput onChangeText={(text) => this.setState({ question: text })}  />
               <CardLabel>Your Answer</CardLabel> 
               <NewCardTextInput onChangeText={(text) => this.setState({ answer: text })} />
               <SubmitButton
                    onPress={this.submitAddNewCard}>
                    <SubmitButtonLabel>SUBMIT</SubmitButtonLabel>
                </SubmitButton>
            </CenterView>
        );
    }
}

function mapDispatchToProps(dispatch){
    return{
        addNewCard: (deckName, card) => dispatch(addNewCard(deckName, card))
    }
}

function mapStateToProps (state, { navigation }) {
    const { deckTitle } = navigation.state.params 
    return {
        deckTitle
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(NewCard)