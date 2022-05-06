import { useState, useContext } from "react";
import { Alert } from "react-native";
import AuthContent from "../components/Auth/AuthContent";
import { authenticate } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import { AuthContext } from "../store/auth-context";

function SignupScreen({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsLoading(true);

    try {
      const authToken = await authenticate(email, password, "signup");
      authCtx.authenticate(authToken);
    } catch (err) {
      Alert.alert("Error", "Something went wrong when trying to register user");
      setIsLoading(false);
    }
    
  }

  if (isLoading) {
    return <LoadingOverlay message="Creating user" />;
  }

  return <AuthContent onAuthenticate={signupHandler} />;
}

export default SignupScreen;
