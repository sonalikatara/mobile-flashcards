import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { fetchAllDecks } from '../decks/decksAction'
import { AppLoading } from 'expo'

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
            <View>
                {decks.map((deck) => {
                    const { title, questions } = deck
                    return (
                        <Text key={title} style={{ fontSize: 20 }}>
                            {title}
                        </Text>
                    )
                })}
            </View>
        );
    }
}
function mapStateToProps(state, ownProps) {
    const decks = state.decksReducer.decks
    console.log("got all decks " + JSON.stringify(decks))
    return { decks: decks };
}

export default connect(mapStateToProps)(AllDecks)