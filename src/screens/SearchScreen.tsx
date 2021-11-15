import React, { useState } from 'react';
import { Container, IconButton, Spacer } from '../common';
import {
  StyleSheet,
  Text,
  TextInput,
  StatusBar,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { RESULT_SCREEN } from '../navigation/constants/routes';

const SearchScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  navigation: { goBack },
  route,
}) => {
  const searchParam = route?.params?.search;
  const [textValue, setTextValue] = useState<string>('');

  const handleInputChange = (e: string) => {
    setTextValue(e);
  };

  const capitalizeSearch = () => {
    const trimText = textValue.trim();

    //united states => United States
    const capitalizeWords = trimText.replace(/(^\w|\s\w)/g, (letter) => 
    letter.toUpperCase(),
    );

    return capitalizeWords
  };

  return (
    <Container style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flexGrow: 1 }}>
          <StatusBar  barStyle="dark-content"/>
   
          <Spacer spacing="extraLarge" orientation="vertical" />
          <View style={styles.searchContainer}>
            <Text style={styles.header}>
              {' '}
              SEARCH BY {'\n'}
              {searchParam === 'city' ? 'CITY' : 'COUNTRY'}
            </Text>
            <Spacer spacing="extraLarge" orientation="vertical" />
            <TextInput
              onSubmitEditing={() =>
                navigation.navigate(RESULT_SCREEN, {
                  searchQuery: capitalizeSearch(),
                  searchFilter: searchParam,
                })
              }
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
              onPress={() =>
                navigation.navigate(RESULT_SCREEN, {
                  searchQuery: capitalizeSearch(),
                  searchFilter: searchParam,
                })
              }
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
  },

  searchContainer: {
    flexGrow: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    fontSize: 34,
    color: 'black',
    textAlign: 'center',
  },

  textInput: {
    borderColor: 'black',
    borderWidth: 2,
    padding: 10,
    width: '75%',
  },
});

export default SearchScreen;
