import {configureStore} from "@reduxjs/toolkit"
import favoritesSlice from "./favorites-slice"

export const store = configureStore({
    reducer: {favoriteMeals: favoritesSlice}
})

