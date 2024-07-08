import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { FlatList } from "react-native";
import QuotesCard from "../components/QuotesCard";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLORS } from "../utils/COLORS";

const IntialQuotes = [
  {
    id: 10,
    quote:
      "ان اعظم طريقة يمكنك ان تحطم بها مبادئ اي جيل .. سواء الدينية او الاجتماعية .. ليس بنقض هذه المبادئ او تغييرها .. ولكن بتحريفها عن مواضعها ووضع تفسيرات لها لم يقصدها واضعوها ",
  },
  {
    id: 20,
    quote:
      ' نحن من نادي أول مرة وقال " حرية .. إخاء .. مساواة " كلمات كلما رددها الناس كلما فشلوا أكثر وتقيدت حريتهم أكثر . ',
  },
];

const QuotesScreen = () => {
  const [quotes, setQuotes] = useState(IntialQuotes);
  const [input, setInput] = useState("");
  useEffect(() => {
    getSavedQuotes();
  }, []);
  useEffect(() => {
    savequote(), [quotes];
  });
  const AddQuote = () => {
    if (input == "") {
      Alert.alert("Invalid ", "Please enter your quote first");
    } else {
      const newQuote = {
        id: Math.random() * 100,
        quote: input,
      };
      setQuotes([...quotes, newQuote]);
      setInput("");
    }
  };

  const deleteQuote = (quoteId: number) => {
    const filteredQuotes = quotes.filter((item) => item.id !== quoteId);
    Alert.alert("", "Delete quote?", [
      {
        text: "Yes",
        onPress: () => setQuotes(filteredQuotes),
      },
      {
        text: "No",
      },
    ]);
  };

  const savequote = async () => {
    try {
      await AsyncStorage.setItem("quote", JSON.stringify(quotes));
    } catch (error) {}
  };

  const getSavedQuotes = async () => {
    try {
      let value = await AsyncStorage.getItem("quote");

      if (value !== null) {
        setQuotes(JSON.parse(value));
      }
    } catch (error) {}
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.primary, alignItems: "center" }}
    >
      <View style={styles.txtContainer}>
        <TextInput
          multiline
          style={styles.textInput}
          placeholder="دون اقتباساتك المفضلة"
          placeholderTextColor={COLORS.gray}
          value={input}
          onChangeText={(text) => setInput(text)}
        />
        <TouchableOpacity style={styles.addbtn} onPress={AddQuote}>
          <Ionicons name="add" size={30} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.quotesContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 200 }}
          data={quotes}
          renderItem={({ item }) => (
            <QuotesCard quote={item} deleteQuote={deleteQuote} />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  txtContainer: {
    flexDirection: "row",
    marginTop: 70,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    borderBottomWidth: 2,
    borderColor: COLORS.black,
    paddingBottom: 10,
    width: "90%",
  },
  textInput: {
    width: "85%",
    height: 100,
    padding: 20,
    color: COLORS.black,
  },
  addbtn: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: COLORS.black,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: COLORS.black,
    shadowOffset: { width: 6, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 2,
  },
  quotesContainer: {
    padding: 20,
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    margin: "auto",
  },
});

export default QuotesScreen;
