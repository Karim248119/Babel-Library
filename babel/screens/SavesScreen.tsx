import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { firebase } from "../config";
import BookCard from "../components/BookCard";
import { COLORS } from "../utils/COLORS";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useMyContext } from "../context/MyContext";
import SavedBookCard from "../components/SavedBook";

const SavesScreen = () => {
  const navigation: any = useNavigation();
  const { savedBooks } = useMyContext();

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.primary, alignItems: "center" }}
    >
      <View style={{ height: 60, width: "100%", marginHorizontal: 10 }}></View>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        numColumns={1}
        contentContainerStyle={styles.contentContainer}
        data={savedBooks}
        renderItem={({ item, index }) => {
          return <SavedBookCard book={item} key={index} />;
        }}
      />
    </View>
  );
};

export default SavesScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingVertical: 25,
    marginHorizontal: "auto",
    justifyContent: "space-evenly",
    gap: 5,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  filterbtn: {
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderRadius: 5,
    flexDirection: "row",
    borderWidth: 2,
  },

  input: {
    width: "90%",
    color: COLORS.black,
  },
  searchContainer: {
    width: "100%",
    flexDirection: "row",
    padding: 10,
    justifyContent: "space-between",
    borderBottomWidth: 2,
    borderColor: COLORS.black,
  },
});
