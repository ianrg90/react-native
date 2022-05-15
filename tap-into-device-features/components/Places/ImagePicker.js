import { useState } from "react";
import { View, Button, Alert, Image, Text, StyleSheet } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";
import { Colors } from "../../styles/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
  //This is neccessay for IOS
  //Android will work only with the lauchCameraAsync
  const [cameraPermissionInfo, requestPermissions] = useCameraPermissions();
  const [pickedImage, setPickedImage] = useState();

  async function verifyPermissions() {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermissions();

      //return a boolean depending on users choice of allowing or denying
      return response.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission denied",
        "You need to grant camera permission to use this app"
      );

      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    setPickedImage(image.uri);
  }

  return (
    <View>
      <View style={styles.imagePreview}>
        {!pickedImage && <Text style={styles.text}>No image taken yet</Text>}
        {pickedImage && (
          <Image style={styles.image} source={{ uri: pickedImage }} />
        )}
      </View>
      <OutlinedButton
        icon="camera"
        
        onPress={takeImageHandler}
      >
        Take photo
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 6,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  text: {},
});
