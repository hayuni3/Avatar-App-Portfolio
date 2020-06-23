import * as Google from "expo-google-app-auth";

const ANDROID_CLIENT_ID =
  "269635213408-la181sskg8u5ui9v3rs7lmoa6vd48gv1.apps.googleusercontent.com";
 
export const signInWithGoogle = async () => {
try {
  const result = await Google.logInAsync({
    androidClientId: ANDROID_CLIENT_ID,
    scopes: ["profile", "email"]
  });

  console.log(result);

  if (result.type === "success") {
    //console.log("successfully loggedin", result.user);
    console.log('innn');
    //this.props.navigation.navigate("Home");
    //this.getPermissionAsync();
    return result.user;
  } else {
    return { cancelled: true };
  }
} catch (e) {
  console.log('LoginScreen.js.js 30 | Error with login', e);
  return { error: true };
}
};