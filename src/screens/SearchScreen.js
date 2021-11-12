import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

const SearchScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SearchScreen;
