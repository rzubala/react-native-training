import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const MealDetailScreen = props => {
    return (<View style={styles.screen}>
        <Text>The Meal detail screen!</Text>
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