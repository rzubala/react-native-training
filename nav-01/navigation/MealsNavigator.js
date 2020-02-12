import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'
import { Platform } from 'react-native'

import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailsScreen from '../screens/MealDetailScreen'

import Colors from '../constants/Colors'

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen,
        navigationOptions: {
            headerTitle: 'Meal Categories'
        }
    },
    CategoryMeals: {
        screen: CategoryMealsScreen,
    },
    MealDetails: MealDetailsScreen
}, {    
    initialRouteName: 'Categories',
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
    }
})

export default createAppContainer(MealsNavigator)