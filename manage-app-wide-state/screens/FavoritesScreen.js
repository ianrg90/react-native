import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { MEALS } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";

function FavoritesScreen() {

  const favoritesIdsList = useSelector(state => state.favoriteMeals.ids)

  const favoriteMeals = MEALS.filter((meal) => favoritesIdsList.includes(meal.id));

  
  if(favoriteMeals.length === 0){
    return (
      <View style = {styles.noFavoritesContainer}>
        <Text style = {styles.text}>You have no favorite meals yet !</Text>
      </View>
    )
  }
  

  return <MealsList displayedMeals={favoriteMeals} />;
}

export default FavoritesScreen;

const styles = StyleSheet.create({
  noFavoritesContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 20,
    color: "white"
  }
})
