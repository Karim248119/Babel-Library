import AsyncStorage from "@react-native-async-storage/async-storage";
import { firebase } from "../config";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the shape of your context
interface MyContextType {
  books: any;
  savedBooks: any;
  savedChapters: any;
  TogglesavedBooks: (book: any) => void;
  TogglesavedChapters: (chapter: any) => void;
}

// Create a context with initial values
const MyContext = createContext<MyContextType>({
  books: [],
  savedBooks: [],
  savedChapters: [],
  TogglesavedBooks: () => {},
  TogglesavedChapters: () => {},
});

// Custom hook to use the context
export const useMyContext = () => useContext(MyContext);

// Provider component to wrap your app with
interface MyContextProviderProps {
  children: ReactNode;
}

export const MyContextProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [books, setBooks] = useState<any[]>([]);
  const [savedBooks, setsavedBooks] = useState<any[]>([]);
  const [savedChapters, setsavedChapters] = useState<any>([]);
  const fetchBooks = async () => {
    try {
      const snapshot = await firebase.firestore().collection("Books").get();
      const Data: any = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(Data);
    } catch (error) {
      console.error("Error fetching books: ", error);
    }
  };

  useEffect(() => {
    getSavedsavedBooks(), getSavedsavedChapters();
  }, []);
  useEffect(() => {
    savesavedBooks(), [savedBooks];
  });
  useEffect(() => {
    savesavedCahpters(), [savedChapters];
  });

  const getSavedsavedBooks = async () => {
    try {
      let value = await AsyncStorage.getItem("savedBooks");
      if (value !== null) {
        setsavedBooks(JSON.parse(value));
      }
    } catch (error) {}
  };

  const getSavedsavedChapters = async () => {
    try {
      let value = await AsyncStorage.getItem("savedChapters");
      if (value !== null) {
        setsavedChapters(JSON.parse(value));
      }
    } catch (error) {}
  };

  const TogglesavedBooks = (book: any) => {
    if (savedBooks.find((item) => item.id == book.id)) {
      setsavedBooks(savedBooks.filter((item) => item.id !== book.id));
    } else {
      setsavedBooks([...savedBooks, book]);
    }
  };

  const savesavedBooks = async () => {
    try {
      await AsyncStorage.setItem("savedBooks", JSON.stringify(savedBooks));
    } catch (error) {}
  };

  const TogglesavedChapters = (chapter: any) => {
    if (savedChapters.find((item: any) => item.name == chapter.name)) {
      setsavedChapters(
        savedChapters.filter((item: any) => item.name !== chapter.name)
      );
    } else {
      setsavedChapters([...savedChapters, chapter]);
    }
  };

  const savesavedCahpters = async () => {
    try {
      await AsyncStorage.setItem(
        "savedChapters",
        JSON.stringify(savedChapters)
      );
    } catch (error) {}
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <MyContext.Provider
      value={{
        books,
        savedBooks,
        savedChapters,
        TogglesavedBooks,
        TogglesavedChapters,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
