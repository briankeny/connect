import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import { logoutUser } from "../utils/utils";
import { logout } from "../store/authSlice";
import { globalstyles } from "../globalstyles/styles";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export function MyDrawer(props:any) {
    const { theme, isNightMode } =  useSelector((state:any)=>state.theme);
    
    const {userData}= useSelector((state:any)=>state.auth);
    const dispatch = useDispatch()  
    const changeMode = async () => {
       dispatch(toggleTheme());
    }
  
    const handleLogout  = async ()=>{
      await logoutUser && await dispatch(logout())
    }
  
    return (
      <View style={[isNightMode &&{backgroundColor:theme.backgroundColor},
        {paddingVertical:40, height:'100%'}
      ]} >
        <View
              style={[{width:100,height:100, borderRadius:50,overflow:'hidden',marginHorizontal:10}]}
            >
              { userData && userData?.profile_picture && (userData?.profile_picture  != null || userData.profile_picture == undefined) && (
                <Image source={{ uri: userData.profile_picture }} style={[{width:100,height:100, borderRadius:50},
                  {resizeMode:'cover'}]} />
              )}
  
              {!(userData?.profile_picture) && (
                <Entypo
                  style={{ color: "#888", alignSelf: "center" ,paddingTop:40}}
                  name="user"
                  size={50}
                />
              )}
        </View>
  
        <TouchableOpacity style={[globalstyles.row,{paddingLeft:16,paddingVertical:16,marginTop:40}]} onPress={()=>props.navigation.navigate('My Profile')}>
        <MaterialIcons name="person" size={30} color={theme&&theme.color} />
        <View style={[{ paddingHorizontal: 16 }]}>
        
          <Text style={[{color:theme.color, fontSize:20, fontWeight:'800'}
        ]}>My Profile</Text>
        </View>
      </TouchableOpacity>
  
        <TouchableOpacity style={[globalstyles.row,{paddingLeft:16,paddingVertical:16,marginTop:40}]} onPress={()=>props.navigation.navigate('Edit Profile')}>
        <MaterialIcons name="edit" size={30} color={theme&& theme.color}/>
        <View style={[{ paddingHorizontal: 16 }]}>
          <Text style={[{color:theme.color, fontSize:20, fontWeight:'800'}
        ]}>Edit Profile</Text>
        </View>
      </TouchableOpacity>
  
  
      <TouchableOpacity onPress={handleLogout} style={[globalstyles.button,{position:'absolute',bottom:150,borderColor:'red', borderWidth:1,backgroundColor:isNightMode?theme.backgroundColor:'#fff'}]}>
          <Text style={[globalstyles.buttonText,{color:'red'}]}>Logout</Text>
      </TouchableOpacity>
  
      <View  style={[ globalstyles.row,
                      {
                        bottom:50,
                        marginLeft:20,
                        position: "absolute",
                      },
                      
                    ]}>
              <TouchableOpacity
                    onPress={changeMode}
                   
                  >
                    {isNightMode ? (
                      <MaterialIcons
                        name="nightlight-round"
                        size={40}
                        color="green"
                      />
                    ) : (
                      <Entypo
                        name="light-down"
                        style={[{alignSelf:'center', color:'green'}]}
                        size={42}
                      />
                    )}
            </TouchableOpacity>
                    
                    <Text style={[
                      {color:theme.color, fontSize:17,padding:10, fontWeight:'500'}
                    ]}>
                    {isNightMode ? "Nightmode" : "Day Mode"}
                    </Text>
            </View>
  
      </View>
    );
  }
  