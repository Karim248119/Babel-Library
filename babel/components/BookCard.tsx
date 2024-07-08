import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../utils/COLORS";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { AntDesign } from "@expo/vector-icons";
import { IMGS } from "../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import { useMyContext } from "../context/MyContext";

const { width, height } = Dimensions.get("screen");

const BookCard = ({ book }: { book: any }) => {
  const { savedBooks, TogglesavedBooks } = useMyContext();
  const navigation: any = useNavigation();

  const [fontsLoaded, fontError] = useFonts({
    adwaAssalafBold: require("../assets/fonts/adwa-assalaf Bold/adwa-assalaf Bold.ttf"),
    mcsDiwanyJaly: require("../assets/fonts/mcs-diwany-jaly-s-u.ttf"),
  });

  const isBookSaved = (idToCheck: any) => {
    return !!savedBooks.find((book: any) => book.id === idToCheck);
  };
  const saved = isBookSaved(book.id);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  const isArabic = () => {
    const arabicRegex =
      /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
    return arabicRegex.test(book.name);
  };
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("book", book);
      }}
    >
      <Image source={{ uri: book.cover }} style={styles.img} />

      <Text style={!isArabic() ? styles.engTitle : styles.title}>
        {book.name.length > 14 ? book.name.slice(0, 14) + "..." : book.name}
      </Text>

      <View style={styles.info}>
        <View style={styles.rate}>
          <AntDesign name="star" size={18} color="black" />
          <Text style={styles.txt}>{book.rate}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => {
            TogglesavedBooks(book);
          }}
        >
          <Image
            source={saved ? IMGS.whiteSave : IMGS.whiteSaveOutline}
            style={{ width: 20, height: 20 }}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;

const styles = StyleSheet.create({
  container: {
    width: width / 2 - 30,
    aspectRatio: 0.535,
    backgroundColor: COLORS.lightGray,
    margin: 10,
    padding: 15,
    borderRadius: 5,
    gap: 2,
  },
  img: {
    width: "100%",
    height: "73%",
    alignSelf: "center",
    borderRadius: 5,
  },
  title: {
    fontFamily: "adwaAssalafBold",
    fontSize: width / 20,
    lineHeight: width / 10,
  },
  engTitle: {
    fontSize: width / 25,
    lineHeight: width / 10,
    fontWeight: "600",
  },
  info: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
  rate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
    marginTop: -5,
  },
  txt: {
    fontSize: 16,
    fontWeight: "800",
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -5,
  },
});
