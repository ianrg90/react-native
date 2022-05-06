import { useState, useContext } from "react";
import { Alert } from "react-native";
import { authenticate } from "../utils/auth";
import LoadingOverlay from "../components/ui/LoadingOverlay";
import AuthContent from "../components/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";

function LoginScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsLoading(true);
    try {
      const authToken = await authenticate(email, password);
      authCtx.authenticate(authToken);
    } catch (err) {
      Alert.alert(
        "Invalid credentials",
        "Check if you typed the correct email and password!"
      );
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Login user..." />;
  }
  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
