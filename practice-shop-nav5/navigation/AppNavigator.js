import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

const MyStack = createStackNavigator();

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);

  return (
    <NavigationContainer>
      <MyStack.Navigator>
        <MyStack.Screen
          name="ProductsOverview"
          component={ProductsOverviewScreen}
        />
      </MyStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
