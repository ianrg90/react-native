import PlaceForm from "../components/Places/PlaceForm";

function AddFavorites({ navigation }) {
  function createFavoritePlaceHandler(placeData) {
    navigation.navigate("Favorites", { place: placeData });
  }

  return <PlaceForm onCreateHandler={createFavoritePlaceHandler} />;
}

export default AddFavorites;
