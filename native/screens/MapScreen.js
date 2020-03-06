import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = props => {
  const [selectedLocation, setSelectedLocation] = useState();

  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  const selectLocationHandler = event => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude
    });
  };

  let markerCoordinates;
  if (selectedLocation) {
    markerCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng
    };
  }

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markerCoordinates && (
        <Marker title="Picked location" coordinate={markerCoordinates}></Marker>
      )}
    </MapView>
  );
};

MapScreen.navigationOptions = navData => {
  const saveFn = navData.navigation.getParam("saveLocation");
  return {
    headerRight: () => {
      return (
        <TouchableOpacity style={styles.headerButton} onPress={saveFn}>
          <Text style={styles.headerButtonText}>Save</Text>
        </TouchableOpacity>
      );
    }
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  headerButton: {
    marginHorizontal: 20
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary
  }
});

export default MapScreen;
