import type {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from "@react-navigation/native-stack";

export type RootStackParamList = {
  Login: undefined;
  Landing: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList>;

export interface ItemType {
  [x: string]: any;
}

export interface tabBarIconType {
  color: string;
  focused: boolean;
  size: number;
}
