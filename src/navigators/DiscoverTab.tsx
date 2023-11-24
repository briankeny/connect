import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Posts from '../screens/PostsScreen';
import Post from '../screens/PostScreen';
import CreatePost  from '../screens/CreatePostScreen';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import ImageViewer from '../screens/ImageViewerScreen';
import Person from '../screens/PersonScreen';
import People from '../screens/PeopleScreen';
import { Image,View } from 'react-native';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 

export function  CreateTabWrapper(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Posts" component={Posts}/>
        <Stack.Screen name="Post"  component={Post}/>
        <Stack.Screen name="Profile" component={Person}/> 
        <Stack.Screen name="Create Post"  component={CreatePost}/>
        <Stack.Screen name="Picture"  component={ImageViewer}/>
     </Stack.Navigator>
  )
}


export function  CreatePostWrapper(){
  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="create Post"  component={CreatePost}/>
     </Stack.Navigator>
  )
}
export function PeopleWrapper(){

  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen   name="People"  component={People}/>
    <Stack.Screen name="Profile" component={Person}/> 
    <Stack.Screen name="Picture"  component={ImageViewer}/>
    <Stack.Screen name="Post"  component={Post}/>
  </Stack.Navigator>
  )
}

export function DiscoverHeader(){
  const { theme} =  useSelector((state:any) => state.theme) ;
return(
  <View style={[{height:10,paddingTop:30, backgroundColor:theme.backgroundColor}]}>
       <Image
              style={[{width:40,height:40,borderRadius:20,alignSelf:'center'}]}
              source={require("../assets/images/logo.png")}
            />
  </View>
)
}

export default function DiscoverTab() {
  const { theme} =  useSelector((state:any) => state.theme) 
  return (
    <Tab.Navigator 
    screenOptions={({ route }) => ({
      tabBarStyle: {
        backgroundColor:theme.backgroundColor
      },
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
           focused ? color='orange':  color= theme.color;
        if (route.name === 'Posts Home') {
          iconName = focused ? 'newspaper' : 'newspaper-outline'; // Use your custom icon names here
          return <Ionicons name={iconName} size={size} color={color} />;
  
        } else if (route.name === 'Persons') {
          iconName = focused ? 'people' : 'people-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
  
        } else if (route.name === 'New Post') {
          iconName = focused ? 'add' : 'add-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
  
        }
        else{

        }

      },
      tabBarLabel: ''
    })     
}>
         <Tab.Screen name="Posts Home" options={{header: () => <DiscoverHeader/>}} component={CreateTabWrapper} />
        <Tab.Screen name="Persons" options={{headerShown:false}} component={PeopleWrapper} />
      
        <Tab.Screen name="New Post" options={{header: () => <DiscoverHeader/>}} component={CreatePostWrapper} />
      </Tab.Navigator>      
    )
};

