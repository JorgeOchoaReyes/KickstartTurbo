import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { TRPCProvider } from "./utils/trpc";

import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider } from "native-base";
import { HomeScreen } from "./screens/home";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import type {
  Props,
  RootStackParamList,
  tabBarIconType,
} from "./types/navigation";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

function Home({ navigation, route }: Props) {
  return <HomeScreen navigation={navigation} route={route} />;
}

export const App = () => {
  return (
    <TRPCProvider>
      <NavigationContainer>
        <NativeBaseProvider>
          <SafeAreaProvider>
            <Tab.Navigator>
              <Tab.Screen
                options={({ navigation }: any) => ({
                  headerShown: false,
                  tabBarIcon: ({ focused, color, size }: tabBarIconType) => {
                    return (
                      <Ionicons
                        name={"home"}
                        size={size}
                        color={focused ? "#F1A637" : color}
                      />
                    );
                  },
                })}
                name="Home"
                component={HomeScreen}
              />
            </Tab.Navigator>
            <StatusBar />
          </SafeAreaProvider>
        </NativeBaseProvider>
      </NavigationContainer>
    </TRPCProvider>
  );
};
