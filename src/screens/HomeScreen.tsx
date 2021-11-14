import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, StatusBar, ScrollView } from 'react-native';
import { Button,  Container, Spacer } from '../common';
import { SEARCH_SCREEN } from '../navigation/constants/routes';

const wallpaperaccessURL = "https://wallpaperaccess.com/"
const images = ['/full/57198.jpg','/full/1116737.jpg', '/full/845181.jpg', '/full/1504118.jpg','/full/1504078.jpg', '/full/1269989.jpg'];

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  
  const [imageIndex, setImageIndex] = useState<number>(0)

  
  useEffect(() => {
    const changeIndex = setInterval(() => {
      imageIndex !== 5  ?  setImageIndex(imageIndex + 1) : setImageIndex(0)
    }, 4000)
  
return () => clearInterval(changeIndex)

  })

  return (
    <ImageBackground style={styles.imageBackground} resizeMode="cover" source={{ uri: wallpaperaccessURL + [images[imageIndex]] }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
            <StatusBar translucent backgroundColor="transparent"  />
      <Container style={styles.rootContainer} >
        <View style={styles.card}>
        <Text style={styles.header}>CityPop</Text>
        <Spacer spacing='small' orientation="vertical"/>
        <Text style={styles.subHeader}>How do you want to search?</Text>
        <Spacer spacing='extraLarge' orientation="vertical"/>
      <Button
        onPress={() => navigation.navigate(SEARCH_SCREEN, { search: 'city'})}
        title="Search By City"
        variant="city"
        />
        <Spacer spacing='medium' orientation="vertical"/>
      <Button
        onPress={() => navigation.navigate(SEARCH_SCREEN, {search: 'country'})}
        title="Search By Country"
          variant="country"
        />
        <Spacer spacing='tiny' orientation="vertical"/>
        </View>
        </Container>
        </ScrollView>
        </ImageBackground>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },

  imageBackground: {
    width: '100%', 
    height: '100%' 
  },
  
  rootContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  card: {
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderWidth: 1.5,
    borderColor: 'orange',
    padding: 40,
    borderRadius: 15
  },

  header: {
    fontSize: 40,
    color: 'white',
    textAlign: 'center'
  },
  
  subHeader: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  }

});

export default HomeScreen;
