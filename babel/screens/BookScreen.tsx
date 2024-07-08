import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IMGS } from "../utils/Images";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import { COLORS } from "../utils/COLORS";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useMyContext } from "../context/MyContext";
import { franc } from "franc";

const { width, height } = Dimensions.get("screen");

const BookScreen = () => {
  const { savedBooks, TogglesavedBooks } = useMyContext();
  const navigation: any = useNavigation();
  const { params: book }: any = useRoute();
  const [starsImg, setstarsImg] = useState<any>(IMGS.star);

  const bookrate = Math.round(book.rate);

  const [fontsLoaded, fontError] = useFonts({
    adwaAssalafBold: require("../assets/fonts/adwa-assalaf Bold/adwa-assalaf Bold.ttf"),
    BFantezy: require("../assets/fonts/BFantezy.ttf"),
    mcsDiwanyJaly: require("../assets/fonts/mcs-diwany-jaly-s-u.ttf"),
    KFGQPC: require("../assets/fonts/KFGQPC Uthmanic Script HAFS Regular/KFGQPC Uthman Taha Naskh Regular.ttf"),
    abo2sadam: require("../assets/fonts/abo2sadam Regular/abo2sadam Regular.ttf"),
    england: require("../assets/fonts/en/england.ttf"),
    CormorantGaramondRegular: require("../assets/fonts/en/CormorantGaramond-Regular.otf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    if (bookrate === 0) {
      setstarsImg(IMGS.star);
    } else if (bookrate === 1) {
      setstarsImg(IMGS.star1);
    } else if (bookrate === 2) {
      setstarsImg(IMGS.star2);
    } else if (bookrate === 3) {
      setstarsImg(IMGS.star3);
    } else if (bookrate === 4) {
      setstarsImg(IMGS.star4);
    } else {
      setstarsImg(IMGS.star5);
    }
  }, [book.rate]);
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

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.imgBg}>
          {/* <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <AntDesign name="arrowleft" size={30} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => TogglesavedBooks(book)}>
              <Image
                source={saved ? IMGS.heart : IMGS.hearto}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View> */}
          <View style={styles.cover}>
            <View style={{ width: "100%", height: "100%" }}>
              <Image
                source={{ uri: book.cover }}
                style={{ width: "100%", height: "100%" }}
              />
            </View>

            <Image
              source={starsImg}
              style={{ width: 20, aspectRatio: 9 / 50, marginHorizontal: 10 }}
            />
          </View>
        </View>

        <View style={styles.details}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: !isArabic() ? "row" : "row-reverse",
              alignItems: "center",
            }}
          >
            <Text style={!isArabic() ? styles.engTitle : styles.title}>
              {book.name}
            </Text>
            <Text style={{ fontWeight: "700", fontSize: 15 }}>
              {book.rate} ({book.reviewrs})
            </Text>
          </View>
          <View style={styles.info}>
            <View style={styles.box}>
              <Text style={styles.boxTxt}>Released</Text>
              <Text>{book.date}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTxt}>Pages</Text>
              <Text>{book.page}</Text>
            </View>
            <View style={styles.box}>
              <Text style={styles.boxTxt}>Chapters</Text>
              <Text>
                {book.chapters.length > 0
                  ? book.chapters?.length
                  : book.chaptersNo}
              </Text>
            </View>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={styles.readBtn} onPress={openBook}>
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "800",
                }}
              >
                Read the book
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => TogglesavedBooks(book)}
              style={styles.saveBtn}
            >
              <Image
                source={saved ? IMGS.whiteSave : IMGS.whiteSaveOutline}
                style={{ width: 28, height: 28 }}
              />
            </TouchableOpacity>
          </View>

          <Text style={!isArabic() ? styles.descriptionEn : styles.description}>
            {book.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default BookScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  imgBg: {
    height: width - 50,
    width,
    backgroundColor: COLORS.lightGray,
    borderBottomEndRadius: width / 2,
    borderBottomStartRadius: width / 2,
  },
  header: {
    width,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 30,
    marginTop: 30,
  },
  cover: {
    width: width / 1.9,
    aspectRatio: 0.7,
    alignSelf: "center",
    shadowColor: "black",
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: -30,
  },
  details: {
    paddingTop: 50,
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  title: {
    fontFamily: "BFantezy",
    fontSize: width / 15,
    width: width / 2,
    marginVertical: 10,
  },
  engTitle: {
    fontSize: width / 15,
    fontFamily: "england",
    width: width / 2,
    marginVertical: 10,
  },
  info: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
  },
  box: {
    width: width / 3 - 30,
    aspectRatio: 1.5,
    borderRadius: 3,
    borderColor: COLORS.lightGray,
    borderWidth: 2,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  boxTxt: {
    color: COLORS.gray,
    fontSize: 15,
    fontWeight: "600",
  },
  btns: {
    width: width - 70,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    gap: 10,
    marginTop: 20,
  },
  readBtn: {
    flex: 1,
    backgroundColor: "#000",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  saveBtn: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
  },
  description: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: "KFGQPC",
  },
  descriptionEn: {
    marginTop: 15,
    fontSize: 18,
    fontFamily: "CormorantGaramondRegular",
  },
});
