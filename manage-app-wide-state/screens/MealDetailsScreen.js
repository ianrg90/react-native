import { StyleSheet, View, Image, Text, ScrollView } from "react-native";
import MealDetails from "../components/MealDetails";
import { useSelector, useDispatch } from "react-redux";
import { favoriteActions } from "../store/favorites-slice";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import { useLayoutEffect } from "react";
import IconButton from "../components/IconButton";

function MealDetailsScreen({ route, navigation }) {
  const mealInfo = route.params;
  const favoritesList = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  function favoriteHandler() {
    if (isMealFavorite) {
      dispatch(favoriteActions.removeFavorite({id: mealInfo.id}));
    } else {
      dispatch(favoriteActions.addFavorite({id: mealInfo.id}));
    }
  }

  const isMealFavorite = favoritesList.includes(mealInfo.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon={isMealFavorite ? "star" : "star-outline"}
          color="white"
          onPress={favoriteHandler}
        />
      ),
    });
  }, [navigation, favoriteHandler]);

  return (
    <ScrollView style={styles.container}>
      <View>
        <Image source={{ uri: mealInfo.imageUrl }} style={styles.image} />
        <Text style={styles.titleText}>{mealInfo.title}</Text>
        <MealDetails
          duration={mealInfo.duration}
          complexity={mealInfo.complexity}
          affordability={mealInfo.affordability}
          textStyle={styles.subHeaderTextStyle}
        />
      </View>

      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={mealInfo.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={mealInfo.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
  },

  image: {
    width: "100%",
    height: 300,
  },
  titleText: {
    fontFamily: "open-sans",
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    margin: 10,
  },
  subHeaderTextStyle: {
    color: "white",
  },
  listOuterContainer: {
    alignItems: "center",
  },
  listContainer: {
    maxWidth: "80%",
  },
});
