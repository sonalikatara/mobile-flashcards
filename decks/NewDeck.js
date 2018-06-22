import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native'
import { bgColor, textColor } from '../utils/colors'
import styled from 'styled-components/native'
import { AppLoading } from 'expo'

class NewDeck extends Component {
    render(){
        return (
            <View>
                <Text>
                    Add new Card
                </Text>
            </View>
        )
    }
}

export default NewDeck
