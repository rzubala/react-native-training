import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const CategoryMealsScreen = props => {
    return (<View style={styles.screen}>
        <Text>The category meals screen!</Text>
        <Button title="Go to Meals details screen!" onPress={() => props.navigation.navigate({routeName: "MealDetails"})} />
        <Button title="Go back" onPress={() => props.navigation.pop()}/>
    </View>)
};

export default CategoryMealsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})