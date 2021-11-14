import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Button, IconButton } from '../common';
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
      <IconButton icon="search" onPress={() => null}/>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default HomeScreen;
