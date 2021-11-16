import React, { useState } from 'react';
import { Container, IconButton, Spacer } from '../common';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import {
  COUNTRY_RESULT_SCREEN,
  CITY_RESULT_SCREEN,
} from '../navigation/constants/routes';

const SearchScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const searchParam = route?.params?.search;
  const NAVIGATION_KEY =
    searchParam === 'city' ? CITY_RESULT_SCREEN : COUNTRY_RESULT_SCREEN;

  const backgroundImage =
    searchParam === 'city'
      ? 'https://wallpaperaccess.com/full/856.jpg'
      : 'https://wallpaperaccess.com/full/290571.jpg';

  const [textValue, setTextValue] = useState<string>('');

  const handleSearch = (search: string) => {

    //Checks empty string
    if (!search.replace(/\s/g, '').length) {
      setTextValue('Enter a ' + searchParam + ' name');
    } else {
      navigation.navigate(NAVIGATION_KEY, {
        searchQuery: capitalizeSearch(),
      });
    }
  };

  const handleInputChange = (e: string) => {
    setTextValue(e);
  };

  const capitalizeSearch = () => {
    const trimText = textValue.trim();

    //united states => United States
    const capitalizeWords = trimText.replace(/(^\w|\s\w)/g, (letter) =>
      letter.toUpperCase(),
    );

    return capitalizeWords;
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.imageBackground}
      resizeMode="cover"
    >
      <Container style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={{ flexGrow: 1 }}>
            <Spacer spacing="extraLarge" orientation="vertical" />
            <View style={styles.searchContainer}>
              <Text style={styles.header}>
                SEARCH BY {'\n'}
                {searchParam === 'city' ? 'CITY' : 'COUNTRY'}
              </Text>
              <Spacer spacing="extraLarge" orientation="vertical" />
              <TextInput
                onSubmitEditing={() => handleSearch(textValue)}
                onChangeText={handleInputChange}
                value={textValue}
                placeholder={'Enter a ' + searchParam}
                keyboardType="default"
                style={styles.textInput}
              />
              <Spacer spacing="medium" orientation="vertical" />
              <IconButton
                icon="search"
                iconSize="medium"
                onPress={() => handleSearch(textValue)}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Container>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  imageBackground: {
    width: '100%',
    height: '100%',
  },

  searchContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 34,
    color: 'white',
    textAlign: 'center',
  },

  textInput: {
    borderColor: 'orange',
    borderRadius: 5,
    borderWidth: 2,
    padding: 11,
    width: '75%',
    backgroundColor: 'white',
  },

  errorText: {
    backgroundColor: 'black',
    color: 'red',
    fontSize: 20
  }
});

export default SearchScreen;
