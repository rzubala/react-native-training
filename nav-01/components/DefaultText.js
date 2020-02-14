import React from 'react'
import { Text, StyleSheet } from 'react-native'

const DefaultText = props => <Text {...props} style={{...props.style, ...styles.text}}>{props.children}</Text>

const styles = StyleSheet.create({
    text: {
        fontFamily: 'open-sans'
    }
})

export default DefaultText