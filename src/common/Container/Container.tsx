import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

interface Props {
    children: React.ReactChild | React.ReactChild[],
    style?: object
}

const Container: React.FC<Props>= ({ children, style }) => {
  return (
    <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
    paddingBottom: 20,
  },
});

export default Container;
