import {useLayoutEffect} from "react"
import { MEALS, CATEGORIES } from "../data/dummy-data";
import MealsList from "../components/MealsList/MealsList";
//Alternative to the route prop , just as useNavigation
//import {useRoute} from "@react-navigation/native"

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

  return (
    <MealsList displayedMeals={displayedMeals}/>
  )
}

export default MealOverviewScreen;


