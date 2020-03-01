import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constants/Colors'

const NewPlaceScreen = props => {
    return (
    <View style={styles.screen}>
        <Text>NewPlaceScreen</Text>
    </View>)
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

NewPlaceScreen.navigationOptions = navData => {
    return {
      headerTitle: "Add new place",
    }
}

export default NewPlaceScreen