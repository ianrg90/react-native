import axios from "axios";

const API_KEY = "AIzaSyD26YnBoQLAt0P5LFZixMUixEqquN5G95I";

export const authenticate = async (email, password, mode = "") => {

  const path = mode === "signup" ? "signUp?key=" : "signInWithPassword?key="

  const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:" + path + API_KEY,
    {
      email: email,
      password: password,
      returnSecureToken: true,
    });

   const token = response.data.idToken
   return token

};


