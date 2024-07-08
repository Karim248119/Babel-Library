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

type filte = {
  id: number;
  minpage: number;
  maxpage: number;
  range: string;
};

const pagefilter: filte[] = [
  {
    id: 1,
    minpage: 1,
    maxpage: 10000,
    range: "Show All ",
  },
  {
    id: 1.5,
    minpage: 1,
    maxpage: 100,
    range: "1 - 100",
  },
  {
    id: 2,
    minpage: 100,
    maxpage: 200,
    range: "100 - 200",
  },
  {
    id: 3,
    minpage: 200,
    maxpage: 300,
    range: "200 - 300",
  },
  {
    id: 4,
    minpage: 300,
    maxpage: 400,
    range: "300 - 400",
  },
  {
    id: 5,
    minpage: 400,
    maxpage: 500,
    range: "400 - 500",
  },
  {
    id: 6,
    minpage: 500,
    maxpage: 999999,
    range: "Above 500",
  },
];

const HomeScreen = () => {
  const [input, setInput] = useState("");
  const [activated, setActivated] = useState(false);
  const { books } = useMyContext();
  const [filteredData, setFilteredData] = useState<any[]>(books);

  const navigation: any = useNavigation();

  useEffect(() => {
    // Filter the data based on the search input
    const filteredBooks = books.filter((book: any) =>
      book.name.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredData(filteredBooks);
  }, [input, books]);

  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.primary, alignItems: "center" }}
    >
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={24} color={COLORS.black} />
          <TextInput
            placeholder="ابحث عن كتاب"
            placeholderTextColor={COLORS.gray}
            style={styles.input}
            value={input}
            onChangeText={(text) => setInput(text)}
          />
        </View>
      </View>
      <View style={{ height: 60, width: "100%", marginHorizontal: 10 }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ height: 60, width: "100%" }}
          contentContainerStyle={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          {pagefilter.map((btn: any, index) => {
            let isActive = btn.id === activated;

            return (
              <View key={index}>
                <TouchableOpacity
                  style={[
                    {
                      backgroundColor: isActive ? COLORS.black : COLORS.primary,
                      borderColor: isActive ? COLORS.black : COLORS.lightGray,
                    },
                    styles.filterbtn,
                  ]}
                  onPress={() => {
                    setActivated(btn.id),
                      setFilteredData(
                        books.filter(
                          (e: any) =>
                            e.page < btn.maxpage && e.page > btn.minpage
                        )
                      );
                  }}
                >
                  <Text
                    style={{
                      color: isActive ? COLORS.primary : COLORS.black,
                      marginHorizontal: 2,
                      fontWeight: "800",
                    }}
                  >
                    {btn.range}
                  </Text>
                  {btn.maxpage < 9000 ? (
                    <Ionicons
                      name="reader-outline"
                      size={24}
                      color={isActive ? COLORS.primary : COLORS.black}
                    />
                  ) : null}
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.contentContainer}
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <BookCard book={item} />}
      />
    </View>
  );
};

export default HomeScreen;

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
