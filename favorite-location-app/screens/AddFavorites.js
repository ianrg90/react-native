import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../utils/database";

function AddFavorites({ navigation }) {
  async function createFavoritePlaceHandler(placeData) {
    await insertPlace(placeData);
    navigation.navigate("Favorites");
  }

  return <PlaceForm onCreateHandler={createFavoritePlaceHandler} />;
}

export default AddFavorites;
