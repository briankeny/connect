import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { MyDrawer } from "../components/MyDrawer";
import DiscoverTab from "./DiscoverTab";
const Drawer = createDrawerNavigator();
const HomeDrawer:React.FC =()=>{
    return (
    
        <Drawer.Navigator
        drawerContent={(props:any) => <MyDrawer {...props} />}
        >
           <Drawer.Screen
            name="Discover"
            component={DiscoverTab}
            options={{
              headerShown: false,
            }}
          />
  
        </Drawer.Navigator>
    
    );
  };
  
  export default HomeDrawer