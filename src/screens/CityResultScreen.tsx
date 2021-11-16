import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Spacer, Container } from '../common';

const CityResultScreen: React.FC<{ route: string }> = ({ route }) => {
  const { searchQuery, city, population } = route?.params;

  const [populationData, setPopulationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const infoText =
    'Correct population statistics \n may be lacking for this city';

  const populationDisplayCount = populationData
    ? populationData[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : 'loading population count...';
  // 100000 => 1 000 000

  useEffect(() => {
    (async () => {
      try {
        if (searchQuery) {
          setIsLoading(true);

          const fetchData = await fetch(
            `http://api.geonames.org/searchJSON?&name_equals=${searchQuery}&maxRows=${1}&featureClass=P&orderby=relevance&username=weknowit`,
          );
          const response = await fetchData.json();
          const displayData = response.geonames[0];

          response.geonames.length === 0
            ? setShowError(true)
            : setPopulationData([displayData.name, displayData.population]);

          setIsLoading(false);
        } else if (city || population) {
          setPopulationData([city, population]);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        setShowError(true);
      }
    })();
  }, [city, population, searchQuery]);

  return (
    <Container style={styles.container}>
      {showError && (
        <View>
          <Text style={styles.cityName}>{searchQuery}</Text>
          <Spacer spacing="medium" orientation="vertical" />
          <Text style={styles.errorText}>No city was found</Text>
        </View>
      )}
      {populationData && (
        <Text style={styles.cityName}>{populationData[0]}</Text>
      )}
      <Spacer spacing="extraLarge" orientation="vertical" />
      {populationData && (
        <View style={styles.populationContainer}>
          <Text style={styles.populationText}>Population</Text>
          <Spacer spacing="medium" orientation="vertical" />
          <Text style={styles.populationCountText}>
            {populationDisplayCount}
          </Text>
          {populationData[1] < 100 && (
            <>
              <Spacer spacing="large" orientation="vertical" />
              <Text>{infoText}</Text>
            </>
          )}
        </View>
      )}
      <Spacer spacing="extraLarge" orientation="vertical" />
      {isLoading && <ActivityIndicator size="large" color="black" />}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cityName: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
  },

  populationContainer: {
    flex: 0.25,
    alignItems: 'center',
    borderWidth: 2,
    width: '70%',
  },

  populationText: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontSize: 18,
    color: 'black',
    marginTop: 10,
  },

  populationCountText: {
    fontSize: 38,
    color: 'black',
  },

  errorText: {
    fontSize: 20,
  },
});

export default CityResultScreen;
