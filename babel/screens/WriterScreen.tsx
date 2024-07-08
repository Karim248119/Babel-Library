import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  ScrollView,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../utils/COLORS";
const WriterScreen = () => {
  const fURL = "https://www.facebook.com/ahmadoctor/?locale=ar_AR";
  const tURL = "https://twitter.com/ahmadoctor?lang=ar";
  const iURL = "https://www.instagram.com/ahmadoctor/?hl=ar";
  const openLink = (URL: string) => {
    Linking.openURL(URL)
      .then((supported) => {
        if (!supported) {
          return;
        } else {
          return Linking.openURL(URL);
        }
      })
      .catch((err) => console.error("An error occurred", err));
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          source={{
            uri: "https://pbs.twimg.com/media/EQccLj0XsAECj_G.jpg",
          }}
          style={styles.imgContainer}
        ></Image>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: COLORS.black }}>
          أحمد خالد مصطفى
        </Text>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={() => openLink(fURL)}>
            <Entypo name="facebook" size={30} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(tURL)}>
            <Entypo name="twitter" size={30} color={COLORS.black} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => openLink(iURL)}>
            <Entypo name="instagram" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.textContainer}>
        <ScrollView
          contentContainerStyle={{ padding: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{
              fontSize: 15,
              lineHeight: 25,
              letterSpacing: 1.5,
              color: COLORS.black,
            }}
          >
            هو كاتب وصيدلي مصري من مواليد 22 يناير 1984 بالمدينة المنورة . يعيش
            في المدينة المنورة ودرس في كليه الصيدلة جامعة القاهرة، اشتهر بروايته
            البارزه أنتيخريستوس التي تتحدث عن شخصيات ذكرت في الديانات ... نجح
            أحمد خالد مصطفى في إحداث جدلاً بروايته أنتيخريستوس لما عرفه عنه
            بدخوله منطقة الخط الأحمر للتراث الديني
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 9,
    backgroundColor: COLORS.lightGray,
  },
  infoContainer: {
    flex: 4,
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
  },
  textContainer: {
    flex: 5,
  },
  imgContainer: {
    backgroundColor: COLORS.lightGray,
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: COLORS.black,
  },
  iconsContainer: {
    width: "40%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default WriterScreen;
