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
import { IMGS } from "../utils/Images";
import { useNavigation } from "@react-navigation/native";
import { useMyContext } from "../context/MyContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("screen");

const SavedBookCard = ({ book }: { book: any }) => {
  const { savedBooks, TogglesavedBooks } = useMyContext();
  const navigation: any = useNavigation();
  const [currentPage, setCurrentPage] = useState(0);
  const [progressWidth, setProgressWidth] = useState(0);
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

  const openBook = () => {
    book.chapters.length > 0
      ? navigation.navigate("chapters", book.chapters)
      : navigation.navigate("pdf", {
          bookSrc: book.bookSrc,
          bookId: book.id,
        });
  };

  useEffect(() => {
    const newProgressWidth = Math.round((currentPage / book.page) * 100);
    setProgressWidth(newProgressWidth);
  }, [currentPage, book.page]);

  const updateCurrentPage = async () => {
    try {
      const page = await AsyncStorage.getItem(`lastPage_${book.id}`);

      if (page !== null) {
        setCurrentPage(parseInt(page));
      }
    } catch (error) {
      console.error("Error getting last page:", error);
    }
  };

  useEffect(() => {
    const subscription = navigation.addListener("focus", () => {
      updateCurrentPage();
    });

    return subscription;
  }, [navigation]);

  return (
    <TouchableOpacity style={styles.container} onPress={openBook}>
      <Image source={{ uri: book.cover }} style={styles.img} />

      <View style={styles.info}>
        <Text style={!isArabic() ? styles.engTitle : styles.title}>
          {book.name}
        </Text>
        {book.chapters < 2 && (
          <View
            style={{
              width: "90%",
              flexDirection: "row",
              gap: 5,
              justifyContent: "center",
            }}
          >
            <View style={styles.progressContainer}>
              <View
                style={[
                  styles.progress,
                  {
                    width: `${progressWidth}%`,
                  },
                ]}
              />
            </View>
            <Text>{progressWidth}%</Text>
          </View>
        )}
      </View>
      <View />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          TogglesavedBooks(book);
        }}
      >
        <Image
          source={saved ? IMGS.heart : IMGS.hearto}
          style={{ width: 20, height: 20 }}
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SavedBookCard;

const styles = StyleSheet.create({
  container: {
    width: width - 30,
    aspectRatio: 2.5,
    backgroundColor: COLORS.lightGray,
    margin: 10,
    padding: 10,
    borderRadius: 5,
    gap: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  img: {
    width: "25%",
    height: "100%",
    borderRadius: 5,
  },
  title: {
    fontFamily: "adwaAssalafBold",
    fontSize: width / 20,
    width: width / 2.5,
    textAlign: "center",
    marginLeft: -20,
  },
  engTitle: {
    fontSize: width / 25,
    textTransform: "capitalize",
    fontWeight: "500",
    width: width / 2.5,
    textAlign: "center",
    marginLeft: -20,
  },
  info: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  rate: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 2,
  },
  txt: {
    fontSize: 16,
    fontWeight: "800",
  },
  btn: {
    width: 40,
    height: 40,
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 10,
    top: 10,
  },
  progressContainer: {
    width: "70%",
    height: 3,
    backgroundColor: COLORS.gray,
    alignSelf: "center",
    marginHorizontal: "auto",
    borderRadius: 3,
  },
  progress: {
    height: 3,
    backgroundColor: "black",
    alignSelf: "flex-start",
    borderRadius: 3,
  },
});
