import { FlatList } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function CategorieScreen({ navigation }) {

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("MealsOverview" , {
        //create the params obj
        categoryId: itemData.item.id,
        //title: itemData.item.title
         
      });
    }

    return (
      <CategoryGridTile
        title={itemData.item.title}
        color={itemData.item.color}
        onPress={pressHandler}
      />
    );
  }

  return (
    <FlatList
      data={CATEGORIES}
      renderItem={renderCategoryItem}
      keyExtractor={(item) => item.id}
      numColumns={2}
    />
  );
}

export default CategorieScreen;
