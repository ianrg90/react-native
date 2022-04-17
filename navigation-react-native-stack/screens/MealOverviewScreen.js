import {useLayoutEffect} from "react"
import { View, FlatList, StyleSheet,} from "react-native";
import { MEALS, CATEGORIES } from "../data/dummy-data";
//Alternative to the route prop , just as useNavigation
//import {useRoute} from "@react-navigation/native"
import MealItem from "../components/MealItem";

//route and navigation are props passed by native-stack to components registered as a screen

function MealOverviewScreen({ route, navigation }) {
  const catId = route.params.categoryId;

  const displayedMeals = MEALS.filter((meal) =>
    meal.categoryIds.includes(catId)
  );

  //Set the header title for each tile you click displaying MealOverviewScreen with the respective category title
  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(category => category.id === catId).title

    navigation.setOptions({
      title: categoryTitle
    })
  }, [catId, navigation])

  function renderMealItem(itemData) {

    const item = itemData.item

    const mealItemProps = {
        id: item.id,
        title: item.title,
        imageUrl: item.imageUrl,
        duration: item.duration,
        complexity: item.complexity,
        affordability: item.affordability,
    }
    return (
      <MealItem {...mealItemProps}/>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={displayedMeals}
        keyExtractor={(item) => item.id}
        renderItem={renderMealItem}
      />
    </View>
  );
}

export default MealOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
