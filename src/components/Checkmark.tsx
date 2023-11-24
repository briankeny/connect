import React from 'react';
import MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { View } from 'react-native';

interface CheckmarkProps {
  username?: string;
  is_staff?: boolean;
  account?: string;
  size?: number;
  color?: string;
  checkStyles?: { [key: string]: any };
}

const Checkmark: React.FC<CheckmarkProps> = ({
    username="",
    is_staff,
    account="personal",
    size=24,
    color="#222",
    checkStyles})=> {
    const tier1 = ["monzero"];
    const tier2 = ["ian","faith","sambu","fei","faith","fiath"];
    const tier3 = ["debby","mithibe","rose"];
    const tier4 = ["zoovier"];
    const tier5 = ["benson","brian","fred"];
    return (
      <View
        style={checkStyles}
      >{is_staff &&
     <MaterialIcons name="verified"
       style={[
        tier1.includes(username?.toLowerCase().trim()) && {color:color} ,
        tier2.includes(username?.toLowerCase().trim()) && {color:'orange'},
        tier3.includes(username?.toLowerCase().trim()) && {color:'orange'},
        tier4.includes(username?.toLowerCase().trim()) && {color:'green'},
        tier5.includes(username?.toLowerCase().trim()) && {color:'skyblue'},
        account?.toLowerCase().trim() == "organization" && {color:color} 
       ]}
     color={color} 
     size={size} />
     }     
      </View>
    );
  };
  
  export default Checkmark;