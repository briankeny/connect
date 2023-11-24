import React, { useEffect, useState } from "react";
import {Image,View,Text,TextInput,TouchableWithoutFeedback,TouchableOpacity,Keyboard} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";  
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalstyles } from "../globalstyles/styles";
import {removeSpace,validateLoginInput,handleLogin} from "../utils/utils";
import { save } from "../store/storage";
import { useDispatch, useSelector } from "react-redux"
import { login } from "../store/authSlice";
import { useAppDispatch } from "../store/store";

const LoginScreen : React.FC =()=> {
  const dispatch = useAppDispatch()
  const { theme, isNightMode } = useSelector((state:any) => state.theme)
  const [onFocus, setFocus] = useState(false)
  const [showPass, setShowPass] = useState(true)
  const [focus, setFocused] = useState(false)
  const [username, setusername] = useState("")
  const [password, setPassword] = useState("")
  const [logins, setLogins] = useState(false)
 
  const [usernameError, setusernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [LoginError, setLoginError] = useState("")

  const handleTextChange = (text:any) => {
    setusername(text)
  }

  useEffect(() => {
    username && removeSpace(username).length < 3
      ? setusernameError("Incorrect Username Or Password")
      : setusernameError("")
    password && removeSpace(password).length < 8
      ? setPasswordError("Please Check Password Length")
      : setPasswordError("")
  }, [username, password])

  

  async function handleEmployeeLogin() {
    const validated = validateLoginInput(username, password)
    setLoginError("")
    if (validated)
      try {
        const response = await handleLogin(validated)
        if (response.status == 201 || response.status == 200) {
          const token = await response.data
          await save ('accessToken',token.access) 
          await save ('refreshToken',token.refresh) 
          await save("persistlogin",true)
          logins && await save("logins",validated)
          await (login())
        } 
   
      } catch (error:any) {
        setLoginError(error.message)
      }
    else {
      setLoginError("Please fill all fields correctly")
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={[
          { flex: 1 },
          theme && { backgroundColor: theme.backgroundColor },
        ]}
      >
        <View
          style={[
            globalstyles.card,
            globalstyles.formContainer,
            theme && { backgroundColor: theme.backgroundColor },
          ]}
        >
          <View style={[globalstyles.logoContainer, { alignSelf: "center" }]}>
            <Image
              style={globalstyles.logo}
              source={require("../../../../assets/images/logo.png")}
            />
          </View>


          <View style={[globalstyles.row,
              globalstyles.inputBorder,
              theme && { color: theme.color },
              onFocus ? { borderColor: "darkslateblue" } : { borderColor: "#555" },
            {alignSelf:'center'}]}>
          <AntDesign name="user"
           style={[{position:'absolute',top:10, left:15}]}
          size={20} color={'darkslateblue'} />    
          <TextInput
            value={username}
            maxLength={15}
            placeholderTextColor={isNightMode ? theme.color : "#777"}
            style={[{marginLeft:50,textAlign:'center',width:'70%'},
              theme&&{color:theme.color}
            ]}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            onChangeText={(val) =>{handleTextChange(val)}}
            placeholder="Username"
          />  
          </View>

        
          <Text style={[globalstyles.error, globalstyles.centeredText]}>
            {usernameError}
          </Text>

          <View style={[globalstyles.row,
              globalstyles.inputBorder,
              theme && { color: theme.color },
              focus ? { borderColor: "darkslateblue" } : { borderColor: "#555" },
            {alignSelf:'center'}]}>

              <Ionicons name="key-outline" 
           style={[{position:'absolute',top:10, left:15}]}
          size={20} color={'darkslateblue'} />    
        
          <TextInput
            value={password}
            maxLength={18}
            secureTextEntry = {showPass}
            placeholderTextColor={isNightMode ? theme.color : "#777"}
            style={[{marginLeft:50,width:'67%',textAlign:'center'},theme&&{color:theme.color}
            ]}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChangeText={(val) =>{ setPassword(val)}}
            placeholder="Password"
          />  
          <TouchableOpacity onPress={()=> setShowPass(!showPass)} style={[{position:'absolute', right:10}]}>
          <MaterialIcons name={showPass? "visibility" : "visibility-off"} style={[{top:10}]}  size={24} color={theme && theme.color} />
            </TouchableOpacity>
          </View>

          <View style={[globalstyles.spaceVertical, { alignSelf: "center" }]}>
            <Text style={[globalstyles.error, globalstyles.centeredText]}>
              {passwordError}
            </Text>
          </View>

          <View style={[globalstyles.rowEven, { alignSelf: "center" }]}>
            <TouchableOpacity
              style={globalstyles.spaceVertical}
              onPress={ ()=>{setLogins(!logins)}}
            >
              {logins ? (
                <MaterialCommunityIcons
                  name="checkbox-outline"
                  size={24}
                  color="darkslateblue"
                />
              ) : (
                <MaterialCommunityIcons
                  name="checkbox-blank-outline"
                  size={24}
                  color={theme.color}
                />
              )}
            </TouchableOpacity>
            <Text
              style={[
               
                { marginTop: 10, paddingHorizontal: 40 },
                theme && { color: theme.color },
              ]}
            >
              Remember Credentials
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleEmployeeLogin}
            style={[
              {
                backgroundColor: "darkslateblue",
                paddingBottom: 7,
                width: 280,
                alignSelf: "center",
              },
              globalstyles.spaceVertical,
            ]}
          >
            <Text style={globalstyles.buttonText}>Login</Text>
          </TouchableOpacity>

          <View style={globalstyles.spaceVertical}>
            <Text style={[globalstyles.error, { textAlign: "center" }]}>
              {LoginError}
            </Text>
          </View>

      
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
export default LoginScreen
