import { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeDrawer from "../navigators/HomeDrawer";
import LoginScreen from "../screens/LoginScreen";
import { useSelector } from "react-redux";
// import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
const Router = () => {
  const { authentication } =  useSelector((state:any) => state.auth) 
  // useEffect(()=>{
  //   SplashScreen.hide()
  // },[])
   return (
    <NavigationContainer>
      <Stack.Navigator>
       {authentication ?
           <Stack.Screen  options={{headerShown:false}} name="App" component={HomeDrawer} />
          :    
          <Stack.Screen options={{headerShown:false}}  name="Login" component={LoginScreen} />     
          }         
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
