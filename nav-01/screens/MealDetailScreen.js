import React from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'

const MealDetailScreen = props => {
    return (<View style={styles.screen}>
        <Text>The Meal detail screen!</Text>
        <Button title="Go back to categories" onPress={() => props.navigation.popToTop()}/>
    </View>)
};

export default MealDetailScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})