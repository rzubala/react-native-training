import React, {useEffect} from "react";
import { View, Text, StyleSheet, Platform, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../components/HeaderButton";
import PlaceItem from "../components/PlaceItem";
import * as placesActions from '../store/actions/places'

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(placesActions.loadPlaces())
  }, [dispatch])

  return (
    <FlatList
      data={places}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <PlaceItem
          onSelect={() => {
            props.navigation.navigate("PlaceDetail", {
              placeTitle: itemData.item.title,
              placeId: itemData.item.id
            });
          }}
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: "All places",
    headerRight: () => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Add place"
            iconName={Platform.OS === "android" ? "md-add" : "ios-add"}
            onPress={() => {
              navData.navigation.navigate("NewPlace");
            }}
          />
        </HeaderButtons>
      );
    }
  };
};

export default PlacesListScreen;
