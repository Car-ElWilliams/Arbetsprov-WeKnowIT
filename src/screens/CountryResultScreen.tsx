import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar
} from 'react-native';
import { Button, Spacer } from '../common';
import { CITY_RESULT_SCREEN } from '../navigation/constants/routes';
import countries from 'i18n-iso-countries';
import * as engLang from 'i18n-iso-countries/langs/en.json';

countries.registerLocale(engLang);

const CountryResultScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const { searchQuery } = route?.params;
  const countryToAlpha2Code = countries.getAlpha2Code(searchQuery, 'en');

  const [data, setData] = useState<any>([]);
  const [dataChunk, setDataChunk] = useState<number>(5);
  const [buttonTitle, setButtonTitle] = useState<string>('Load more data');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const fetchData = await fetch(
          `http://api.geonames.org/searchJSON?&country=${countryToAlpha2Code}&maxRows=${dataChunk}&orderby=population&featureCode=ADM2&featureCode=PPLC&featureCode=PPL&featureCode=PPLA&featureClass=P&username=weknowit`,
        );

        const response = await fetchData.json();

        response.geonames.length === 0
          ? setShowError(true)
          : setData(response.geonames);

        if (response.geonames === data) {
          setButtonTitle('No more data to load');
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setShowError(true);
        setIsLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataChunk]);

  const headerContent: React.FC = () => {
    return (
      <View style={styles.headerContainer}>
        <StatusBar barStyle="dark-content" />
        <Text style={styles.header}>{searchQuery}</Text>
        <Spacer spacing="large" orientation="vertical" />
        {showError && (
          <Text style={styles.errorText}>No country was found</Text>
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
          {isLoading && data.length < 1 && (
            <ActivityIndicator size="large" color="black" />
          )}
          {data.length > 1 && (
            <Button
              title={buttonTitle}
              onPress={() => setDataChunk(dataChunk + 10)}
              variant="country"
              size="small"
              style={styles.button}
              loading={isLoading}
            />
          )}
          <Spacer spacing="medium" orientation="vertical" />
        </View>
      }
      renderItem={({ item }: any) => (
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() =>
            navigation.navigate(CITY_RESULT_SCREEN, {
              city: item.name,
              population: item.population,
            })
          }
        >
          <View style={styles.citiesContainer}>
            <Text style={styles.cityName}>{item?.name} </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    padding: 40,
  },

  header: {
    fontSize: 30,
    textAlign: 'center',
    color: 'black',
  },

  errorText: {
    fontSize: 16,
    textAlign: 'center',
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
    color: 'black',
    alignSelf: 'center',
  },

  button: {
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#000000',
    elevation: 1,
    zIndex: 1,
    shadowOpacity: 0.8,
    shadowRadius: 3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});

export default CountryResultScreen;
