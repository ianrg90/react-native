import { createContext, useState } from "react";

export const FavoritesContext = createContext({
    ids: [],
    addFavorite: (id) => {},
    removeFavorite: (id) => {}
})


function FavoritesContextProvider({children}) {

    const [ids, setIds] = useState([])

    function addFavorite (id){
        setIds(prevState =>{
            return [...prevState, id]
        })
    }

    //Fixx
    function removeFavorite(id){
        setIds(prevState => {
            return prevState.filter(mealId => mealId !== id)
        })
    }

    const favoritesContext = {
        ids,
        addFavorite,
        removeFavorite
    }


  return (
    <FavoritesContext.Provider value={favoritesContext}>
        {children}
    </FavoritesContext.Provider>
  )
}

export default FavoritesContextProvider