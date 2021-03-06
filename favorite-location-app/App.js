import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Favorites from "./screens/Favorites";
import AddFavorites from "./screens/AddFavorites";
import FavoriteDetails from "./screens/FavoriteDetails";
import Map from "./screens/Map";
import IconButton from "./components/UI/IconButton";
import { Colors } from "./styles/colors";
import { init } from "./utils/database";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isDBInitialized, setIsDBInitialized] = useState(false);

  useEffect(() => {
    const initializeDB = async () => {
      await init();
      try {
        setIsDBInitialized(true);
      } catch (err) {
        console.log(err);
      }
    };

    initializeDB();
  }, []);

  if (!isDBInitialized) {
    <AppLoading />;
  }

  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: Colors.primary500 },
            contentStyle: { backgroundColor: Colors.gray700 },
            headerTintColor: Colors.gray700,
          }}
        >
          <Stack.Screen
            name="Favorites"
            component={Favorites}
            options={({ navigation }) => ({
              title: "Your Favorite Places",
              headerRight: ({ headerTintColor }) => (
                <IconButton
                  icon="add"
                  color={headerTintColor}
                  size={28}
                  onPress={() => navigation.navigate("AddFavorite")}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddFavorite"
            component={AddFavorites}
            options={{ title: "Add Your Place" }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              title: "Map Preview",
            }}
          />
          <Stack.Screen name="Details" component={FavoriteDetails} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
