import { StatusBar } from "expo-status-bar";
import { StyleSheet, Button } from "react-native";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CategorieScreen from "./screens/CategorieScreen";
import MealOverviewScreen from "./screens/MealOverviewScreen";
import MealDetailsScreen from "./screens/MealDetailsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isFontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans.ttf"),
  });

  if (!isFontsLoaded) {
    return <AppLoading />;
  }

  //By passing the screen options to the navigator those styles will be applied as default to all screens.
  //If you want individual styles for each screen add them to the options object in the Stack.Screen
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: "#351401" },
            headerTintColor: "white",
            contentStyle: { backgroundColor: "#3f2f25" },
          }}
        >
          <Stack.Screen
            name="MealsCategories"
            component={CategorieScreen}
            options={{ title: "Categories" }}
          />
          <Stack.Screen
            name="MealsOverview"
            component={MealOverviewScreen}
            //{
            // This approach will work, but check the MealOverview screen to see a better method
            //options={({ route, navigation }) => {
            //  return {title: route.params.title}
            //}}
            //}
          />
          <Stack.Screen
            name="MealDetailsScreen"
            component={MealDetailsScreen}
          //One way to add components to the header ... however if you need it to interact with the screen this won't work
           // options={{
           //   headerRight: () => {
           //     return <Button title="Tap me!" />;
           //   },
           // }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
