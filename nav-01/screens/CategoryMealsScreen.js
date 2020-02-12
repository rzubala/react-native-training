import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

import { CATEGORIES } from '../data/dummy-data'

const CategoryMealsScreen = props => {
    const catId = props.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)
    return (<View style={styles.screen}>
        <Text>The category meals screen!</Text>
        <Text>{selectedCategory.title}</Text>
        <Button title="Go to Meals details screen!" onPress={() => props.navigation.navigate({ routeName: "MealDetails" })} />
        <Button title="Go back" onPress={() => props.navigation.pop()} />
    </View>)
};

CategoryMealsScreen.navigationOptions = (navigationData) => {
    const catId = navigationData.navigation.getParam('categoryId')
    const selectedCategory = CATEGORIES.find(cat => cat.id === catId)

    return {
        headerTitle: selectedCategory.title
    }
}

export default CategoryMealsScreen

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})