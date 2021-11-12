import { HomeScreen, SearchScreen, ResultScreen } from '../../../screens';
import { HOME_SCREEN, SEARCH_SCREEN, RESULT_SCREEN } from '../routes';

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
    name: RESULT_SCREEN,
    component: ResultScreen,
  },
];
