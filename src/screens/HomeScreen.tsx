import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button } from '../common';
import { SEARCH_SCREEN } from '../navigation/constants/routes';

const HomeScreen: React.FC<{navigation: any }> = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button
        onPress={() => navigation.navigate(SEARCH_SCREEN)}
        title="Search By City"
        variant="city"
        />
      <Button
        onPress={() => navigation.navigate(SEARCH_SCREEN, {})}
        title="Search By Country"
        variant="country"
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
