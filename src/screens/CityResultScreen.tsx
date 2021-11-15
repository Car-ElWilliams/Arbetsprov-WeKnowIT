import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button, Spacer, Container } from '../common';

const CityResultScreen: React.FC<{ route: string }> = ({
  route,
}) => {
  const { searchQuery, city, population } = route?.params;

  const [populationData, setPopulationData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);
  const populationDisplayCount = populationData ? populationData[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") : 'loading count'
  // 100000 => 1 000 000

  const getData = async () => {
    try {
      if (searchQuery) {
        setIsLoading(true);

        const fetchData = await fetch(
          `http://api.geonames.org/searchJSON?&q=${searchQuery}&maxRows=${1}&featureClass=P&orderby=relevance&username=weknowit`,
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
      setIsLoading(false);
      setShowError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Container style={styles.container}>
        {showError && <Text style={styles.errorText}>No city was found</Text>}
        {populationData && (
          <Text style={styles.cityName}>{populationData[0]}</Text>
        )}
        <Spacer spacing="extraLarge" orientation="vertical" />
        <View style={styles.populationContainer}>
          {populationData && (
            <>
              <Text style={styles.populationText}>Population</Text>
              <Spacer spacing="medium" orientation="vertical" />
              <Text style={styles.populationCountText}>
                {populationDisplayCount}
              </Text>
            </>
          )}
        </View>
        {isLoading && <ActivityIndicator size="large" color="" />}
      </Container>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cityName: {
    fontSize: 28,
    color: 'black',
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
