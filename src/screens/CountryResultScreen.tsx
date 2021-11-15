import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Button, Spacer } from '../common';
import { CITY_RESULT_SCREEN } from '../navigation/constants/routes';

const CountryResultScreen: React.FC<{ navigation: any; route: string }> = ({
  navigation,
  route,
}) => {
  const { searchQuery, searchFilter } = route?.params;

  const currentView = searchFilter
  const [data, setData] = useState<any>([]);
  const [dataChunk, setDataChunk] = useState<number>(5);
  const [buttonTitle, setButtonTitle] = useState<string>('Load more data');
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  const getData = async () => {
    try {
      setIsLoading(true);

      if (currentView === 'country') {
        const fetchData = await fetch(
          `http://api.geonames.org/searchJSON?&q=${searchQuery}&maxRows=${dataChunk}&featureCode=PPL&featureCode=PPLC&featureCode=PPLA&orderby=population&username=weknowit`,
        );
        const response = await fetchData.json();
        const filteredResponse = response.geonames.filter(
          (value: any) => value.countryName === searchQuery,
        );

        response.geonames.length === 0
          ? setShowError(true)
          : setData(filteredResponse);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, [dataChunk]);

  const headerContent: React.FC = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.header}>
          {searchQuery}
        </Text>
        <Spacer spacing="medium" orientation="vertical" />
        {showError && <Text>No {currentView} was found</Text>}
        {currentView === 'population' && (
          <View>
            <Text>{data[0]?.population}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <FlatList
      data={data ?? []}
      ListHeaderComponent={headerContent}
      ListFooterComponent={
        <View>
          {isLoading && data.length < 1 && <ActivityIndicator size="large" color="black" />}
          {data.length > 1 && (
            <Button
              title={buttonTitle}
              onPress={() => setDataChunk(dataChunk + 10)}
              variant="country"
              size="small"
              disabled={disableButton}
              style={styles.button}
              loading={isLoading}
            />
          )}
          <Spacer spacing="medium" orientation="vertical" />
        </View>
      }
      renderItem={({ item }: any) => (
        <View style={styles.citiesContainer}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate(CITY_RESULT_SCREEN, { city: item.name, population: item.population })}
            style={{ alignSelf: 'center' }}
          >
            <Text style={styles.cityName}>{item?.name} </Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    padding: 40
  },

  header: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black'
  },

  container: {
    flex: 1,
  },

  citiesContainer: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    marginBottom: 20,
    marginHorizontal: 20,
  },

  cityName: {
    fontSize: 20,
    color: 'black'
  },

  button: {
    alignSelf: 'center', marginVertical: 20, shadowColor: "#000000",
    elevation: 1,
    zIndex: 1,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1
    }
  }
});

export default CountryResultScreen;
