import React, { useState } from "react";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import DrawerNavigator from "./src/navigators/DrawerNavigator";
import GlobalState from "./src/context/GlobalState";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};

const fetchFonts = () => {
  return Font.loadAsync({
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Black": require("./assets/fonts/Roboto-Black.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "HindSiliguri-SemiBold": require("./assets/fonts/HindSiliguri-SemiBold.ttf"),
    "HindSiliguri-Regular": require("./assets/fonts/HindSiliguri-Regular.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  //keep the splash screen displaying until fonts are loaded
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
        onError={() => {
          alert("could not load resources.");
        }}
      />
    );
  }
  return (
    <GlobalState>
      <NavigationContainer theme={theme}>
        <DrawerNavigator />
      </NavigationContainer>
    </GlobalState>
  );
}
