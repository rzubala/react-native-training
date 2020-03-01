import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const PlaceDetailScreen = props => {
    return (
    <View style={styles.screen}>
    <Text>PlacesDetailScreen</Text>
    </View>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default PlaceDetailScreen