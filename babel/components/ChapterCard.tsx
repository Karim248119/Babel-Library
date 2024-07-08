import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { COLORS } from "../utils/COLORS";
import { Feather } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { IMGS } from "../utils/Images";
import { useMyContext } from "../context/MyContext";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("screen");

const ChaptersCard = ({ chapter }: { chapter: any }) => {
  const { savedChapters, TogglesavedChapters } = useMyContext();

  const isChapterSaved = (idToCheck: any) => {
    return !!savedChapters.find((chapter: any) => chapter.name === idToCheck);
  };
  const saved = isChapterSaved(chapter.name);

  const [fontsLoaded, fontError] = useFonts({
    adwaAssalafBold: require("../assets/fonts/adwa-assalaf Bold/adwa-assalaf Bold.ttf"),
    BFantezy: require("../assets/fonts/BFantezy.ttf"),
    mcsDiwanyJaly: require("../assets/fonts/mcs-diwany-jaly-s-u.ttf"),
    KFGQPC: require("../assets/fonts/KFGQPC Uthmanic Script HAFS Regular/KFGQPC Uthmanic Script HAFS Regular.otf"),
    abo2sadam: require("../assets/fonts/abo2sadam Regular/abo2sadam Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const navigation: any = useNavigation();

  const isArabic = () => {
    // Regular expression to match Arabic characters
    const arabicRegex =
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

    // Test if the text contains Arabic characters
    return arabicRegex.test(chapter.name);
  };
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => {
        navigation.navigate("pdf", {
          bookSrc: chapter.src,
          bookId: chapter.name,
        });
      }}
    >
      <Image source={{ uri: chapter.img }} style={styles.img}></Image>

      <Text style={isArabic() ? styles.txt : styles.en}>{chapter.name}</Text>
      <TouchableOpacity onPress={() => TogglesavedChapters(chapter)}>
        <Image
          source={!saved ? IMGS.saveOutline : IMGS.save}
          style={{ width: width / 12, height: width / 12 }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default ChaptersCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    margin: 8,
    borderRadius: 5,
    shadowColor: "black",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
    elevation: 4,
    width: width - 40,
    height: width / 3,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  img: {
    width: width / 3 - 20,
    aspectRatio: 1,
    borderRadius: 3,
  },
  txt: {
    fontFamily: "adwaAssalafBold",
    fontSize: width / 25,
    width: width / 2.5,
    textAlign: "center",
  },
  en: {
    fontSize: width / 30,
    textTransform: "capitalize",
    fontWeight: "500",
    width: width / 2.5,
    textAlign: "center",
  },
});
