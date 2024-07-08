import { StyleSheet, Text, View } from "react-native";
import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../utils/COLORS";
import { useFonts } from "expo-font";
const QuotesCard = ({
  quote,
  deleteQuote,
}: {
  quote: any;
  deleteQuote: (quoteId: number) => void;
}) => {
  const [fontsLoaded, fontError] = useFonts({
    KFGQPC: require("../assets/fonts/KFGQPC Uthmanic Script HAFS Regular/KFGQPC Uthmanic Script HAFS Regular.otf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text
        style={{ width: "100%", color: COLORS.black, fontFamily: "KFGQPC" }}
      >
        {quote.quote}
      </Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => deleteQuote(quote?.id)}
      >
        <Feather name="x" size={16} color={COLORS.black} />
      </TouchableOpacity>
    </View>
  );
};

export default QuotesCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightGray,
    margin: 10,
    marginVertical: 20,
    padding: 20,
    borderRadius: 5,
    width: "90%",
    color: COLORS.black,
    position: "relative",
  },
  btn: {
    width: 25,
    height: 25,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: COLORS.gray,
    top: -10,
    right: -10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 2,
  },
});
