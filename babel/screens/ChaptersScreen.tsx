import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import ChaptersCard from "../components/ChapterCard";
import { firebase } from "../config";

interface chapter {
  name: string;
  img: string;
  pdf: string;
}

const ChaptersScreen = () => {
  const { params: chapters }: any = useRoute();

  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        style={{ flex: 1 }}
        data={chapters}
        renderItem={({ item, index }) => {
          return <ChaptersCard key={index} chapter={item} />;
        }}
      />
    </View>
  );
};

export default ChaptersScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
  },
  flatlist: {
    paddingTop: 40,
    paddingBottom: 10,
    alignItems: "center",
  },
});
