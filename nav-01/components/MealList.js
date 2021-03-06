import React from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import MealItem from './MealItem'

const MealList = props => {

    const favouriteMeals = useSelector(state => state.meals.favouriteMeals)

    const renderMealItem = itemData => {
        return <MealItem
            title={itemData.item.title}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            image={itemData.item.imageUrl}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetail', params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFav: favouriteMeals.some(meal => meal.id === itemData.item.id)
                    }
                })
            }} />
    }

    return (
        <View style={styles.list}>
            <FlatList style={{ width: '100%' }}
                data={props.listData}
                renderItem={renderMealItem}
                keyExtractor={(item, index) => item.id} />
        </View>
    )
}

const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15
    }
})

export default MealList