import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import { init } from './helpers/db'

init().then(() => {
  console.log('Initialized db')
})
.catch((err) => {
  console.log('Initializing db error')
  console.log(err)
})

import PlacesNavigator from "./navigation/PlacesNavigator";
import placesReducer from "./store/reducers/places";

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
