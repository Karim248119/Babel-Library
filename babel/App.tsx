import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Root from "./navigation";
import PdfScreen from "./screens/PdfScreen";

export default function App() {
  return (
    <>
      <Root />
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
