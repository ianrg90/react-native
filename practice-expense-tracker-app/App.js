import { ExpensesContext } from "./store/expenses-contex";
import ExpensesContextProvider from "./store/expenses-contex";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import ManageExpensesScreen from "./screens/ManageExpensesScreen";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./colors/colors";
import IconButton from "./components/UI/IconButton";

const Stack = createNativeStackNavigator();
const BottonTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <>
      <BottonTabs.Navigator
        screenOptions={({ navigation }) => ({
          tabBarActiveTintColor: GlobalStyles.colors.accent500,
          headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerTintColor: "white",
          tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
          headerRight: ({ tintColor }) => (
            <IconButton
              icon="add"
              color={tintColor}
              size={30}
              onPress={() => {
                navigation.navigate("ManageExpenses");
              }}
            />
          ),
        })}
      >
        <BottonTabs.Screen
          name="Recent Expenses"
          component={RecentExpensesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="filter" color={color} size={size} />
            ),
          }}
        />
        <BottonTabs.Screen
          name="All Expenses"
          component={AllExpensesScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="calendar-outline" color={color} size={size} />
            ),
          }}
        />
      </BottonTabs.Navigator>
    </>
  );
}

export default function App() {
  return (
    <>
      <ExpensesContextProvider>
        <StatusBar style="light" />
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="Expenses Overview"
              component={ExpensesOverview}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpensesScreen}
              options={{
                title: "Manage Expenses",
                presentation: "modal",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});
