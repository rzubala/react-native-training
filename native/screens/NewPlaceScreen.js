import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  Button,
  TextInput,
  StyleSheet
} from "react-native";

import ImagePicker from "../components/ImageSelector";
import * as placeActions from "../store/actions/places";
import Colors from "../constants/Colors";

import LocationPicker from "../components/LocationPicker";

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState("");
  const [image, setImage] = useState();

  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(placeActions.addPlace(titleValue, image));
    props.navigation.goBack();
  };

  const imageTakenHandler = imagePath => {
    setImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={titleValue}
          onChangeText={titleChangeHandler}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} />
        <Button
          title="Save Place"
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    margin: 30
  },
  label: {
    fontSize: 18,
    marginBottom: 15
  },
  textInput: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2
  }
});

NewPlaceScreen.navigationOptions = navData => {
  return {
    headerTitle: "Add new place"
  };
};

export default NewPlaceScreen;
