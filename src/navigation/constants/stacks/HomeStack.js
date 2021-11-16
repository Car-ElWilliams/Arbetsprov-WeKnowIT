import {
  HomeScreen,
  SearchScreen,
  CountryResultScreen,
  CityResultScreen,
} from '../../../screens';
import {
  HOME_SCREEN,
  SEARCH_SCREEN,
  COUNTRY_RESULT_SCREEN,
  CITY_RESULT_SCREEN,
} from '../routes';

export const HomeStack = [
  {
    name: HOME_SCREEN,
    component: HomeScreen,
  },
  {
    name: SEARCH_SCREEN,
    component: SearchScreen,
  },
  {
    name: COUNTRY_RESULT_SCREEN,
    component: CountryResultScreen,
  },
  {
    name: CITY_RESULT_SCREEN,
    component: CityResultScreen,
  },
];
