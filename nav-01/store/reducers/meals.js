import { MEALS } from '../../data/dummy-data'
import { TOGGLE_FAVOURITE, SET_FILTERS } from '../actions/meals'

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favouriteMeals: []
}

const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVOURITE:
            const existingIndex = state.favouriteMeals.findIndex(meal => meal.id === action.mealId)
            if (existingIndex >= 0) {
                const updateFavMeal = [...state.favouriteMeals]
                updateFavMeal.splice(existingIndex, 1)
                return { ...state, favouriteMeals: updateFavMeal }
            } else {
                return {
                    ...state,
                    favouriteMeals: state.favouriteMeals.concat(state.meals.find(meal => meal.id === action.mealId))
                }
            }
        case SET_FILTERS:
            const appliedFilters = action.filters
            const filteredMeals = state.meals.filter(meal => {
                if (appliedFilters.glutenFree && !meal.isGlutenFree) {
                    return false
                }
                if (appliedFilters.lactoseFree && !meal.isLactoseFree) {
                    return false
                }
                if (appliedFilters.vegeterian && !meal.isVegeterian) {
                    return false
                }
                if (appliedFilters.vegan && !meal.isVegan) {
                    return false
                }
                return true
            })
            return {...state, filteredMeals: filteredMeals}
        default:
            return state
    }
}

export default mealsReducer