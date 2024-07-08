import { StatusBar, StyleSheet, View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import Pdf from "react-native-pdf";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PdfScreen = () => {
  const {
    params: { bookSrc, bookId },
  }: any = useRoute();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [tabed, setTabed] = useState(false);
  const PdfResource = {
    uri: bookSrc,
    cache: true,
  };

  const saveLastPage = async (page: number) => {
    try {
      await AsyncStorage.setItem(`lastPage_${bookId}`, page.toString());
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  const getLastPage = async () => {
    try {
      const page = await AsyncStorage.getItem(`lastPage_${bookId}`);
      if (page !== null) {
        setCurrentPage(parseInt(page));
      }
    } catch (error) {
      console.error("Error getting last page:", error);
    }
  };

  const onPageChanged = (page: number) => {
    saveLastPage(page);
    setPageNum(page);
  };

  const onLoadComplete = (numberOfPages: number) => {
    setTotalPages(numberOfPages);
  };

  useEffect(() => {
    getLastPage();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <Pdf
        trustAllCerts={false}
        source={PdfResource}
        style={styles.pdf}
        onPageChanged={onPageChanged}
        onLoadComplete={onLoadComplete}
        page={currentPage}
        onPageSingleTap={() => {
          setTabed(!tabed);
        }}
      />
      <Text
        style={[styles.pageIndicator, { display: tabed ? "flex" : "none" }]}
      >
        {pageNum} / {totalPages}
      </Text>
    </View>
  );
};

export default PdfScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  pdf: {
    flex: 1,
    alignSelf: "stretch",
  },
  pageIndicator: {
    position: "absolute",
    bottom: 10,
    right: 10,
    padding: 10,
    borderRadius: 20,
    textAlign: "center",
    color: "#000",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 2,
  },
});
