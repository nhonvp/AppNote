import {StackNavigationProp} from '@react-navigation/stack';
import { RootStackParamList } from './Router';

import {useNavigation} from '@react-navigation/native';

export type NavigationProps = StackNavigationProp<RootStackParamList>;

export function useNav() {
  const nav = useNavigation<NavigationProps>();
  return nav;
}
