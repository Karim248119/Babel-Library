import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS } from "./utils/COLORS";
import HomeScreen from "./screens/HomeScreen";
import SavesScreen from "./screens/SavesScreen";
import { IMGS } from "./utils/Images";
import WriterScreen from "./screens/WriterScreen";
import QouteScreen from "./screens/QouteScreen";
import BookScreen from "./screens/BookScreen";
import ChaptersScreen from "./screens/ChaptersScreen";
import SavedChaptersScreen from "./screens/SavedChaptersScreen";
import { Ionicons } from "@expo/vector-icons";
import { MyContextProvider } from "./context/MyContext";
import PdfScreen from "./screens/PdfScreen";

const { width, height } = Dimensions.get("screen");

type Tabs = {
  Home: undefined;
  Saves: undefined;
  SavedChapters: undefined;
  Quotes: undefined;
  writer: undefined;
};
type stacks = {
  bottom: undefined;
  book: undefined;
  chapters: undefined;
  pdf: undefined;
};

const Tab = createBottomTabNavigator<Tabs>();
const Stack = createStackNavigator<stacks>();

function BottomNav() {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardOpen(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardOpen(false);
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  const navigatorPosition = {
    bottom: isKeyboardOpen ? -height / 2 : 0,
    height: isKeyboardOpen ? 0 : 50,
  };
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.bar, navigatorPosition],
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.lightGray,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <>
              <Image
                source={IMGS.bottom}
                style={{
                  width,
                  position: "absolute",
                  bottom: -20,
                  left: 0,
                  transform: [{ translateX: -0.1 }],
                }}
              />

              {/* <View
                style={{
                  backgroundColor: "white",
                  height: 2000,
                  width: 2000,
                  borderRadius: 1000,
                  position: "absolute",
                  bottom: -1910,
                  left: width / 2 - 1000,
                }}
              /> */}
              <Image
                source={focused ? IMGS.home : IMGS.homeOutline}
                style={{ width: size, height: size, marginBottom: 20 }}
              />
            </>
          ),
        }}
      />

      <Tab.Screen
        name="Saves"
        component={SavesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMGS.heart : IMGS.hearto}
              style={{ width: size, height: size, marginBottom: 20 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="SavedChapters"
        component={SavedChaptersScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMGS.save : IMGS.saveOutline}
              style={{ width: size, height: size, marginBottom: 20 }}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Quotes"
        component={QouteScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? IMGS.quotes : IMGS.quotesOutline}
              style={{ width: size, height: size, marginBottom: 20 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bar: {
    borderColor: "transparent",
    elevation: 0,
  },
});

export default function Root() {
  return (
    <NavigationContainer>
      <MyContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="bottom" component={BottomNav} />
          <Stack.Screen name="book" component={BookScreen} />
          <Stack.Screen name="chapters" component={ChaptersScreen} />
          <Stack.Screen name="pdf" component={PdfScreen} />
        </Stack.Navigator>
      </MyContextProvider>
    </NavigationContainer>
  );
}
