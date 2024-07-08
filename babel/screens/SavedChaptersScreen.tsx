import { Image, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import { FlatList } from "react-native-gesture-handler";
import ChaptersCard from "../components/ChapterCard";
import { firebase } from "../config";
import { useMyContext } from "../context/MyContext";

interface chapter {
  name: string;
  img: string;
  pdf: string;
}

const SavedChaptersScreen = () => {
  const { savedChapters } = useMyContext();

  return (
    <View style={styles.root}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlist}
        style={{ flex: 1 }}
        data={savedChapters}
        renderItem={({ item, index }) => {
          return <ChaptersCard key={index} chapter={item} />;
        }}
      />
    </View>
  );
};

export default SavedChaptersScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
    flex: 1,
  },
  flatlist: {
    paddingVertical: 40,
    alignItems: "center",
  },
});
