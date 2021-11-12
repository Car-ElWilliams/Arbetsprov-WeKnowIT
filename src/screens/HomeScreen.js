import React from 'react';
import { ScrollView, StyleSheet, Button } from 'react-native';
import { SEARCH_SCREEN } from '../navigation/constants/routes';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        onPress={() => navigation.navigate(SEARCH_SCREEN)}
        title="Go to search screen"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
