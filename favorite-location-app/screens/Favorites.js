import { useEffect, useState } from "react"
import { useIsFocused } from "@react-navigation/native"
import PlacesList from "../components/Places/PlacesList"

function Favorites({route}) {
  const [loadedPlaces, setLoadedPlaces] = useState([])
  const isFocused = useIsFocused()

  //If item is alreay in list it wont be added in case user navigates back to this screen without adding a new favorite location
  const placeIsAlreadyInList = route.params ? loadedPlaces.some(item => item.id === route.params.place.id) : false

  useEffect(() => {

    if(isFocused && route.params && !placeIsAlreadyInList){
      setLoadedPlaces(prevPlaces => [...prevPlaces, route.params.place])
    }
  }, [isFocused, route])

  return (
    <PlacesList places={loadedPlaces} />
  )
}

export default Favorites