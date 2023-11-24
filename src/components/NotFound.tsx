import React from 'react';
import {View,Text,Image } from 'react-native';
import { globalstyles } from '../globalstyles/styles';
interface notFoundProps {
    header?:string,
    containerstyles ?: object;
    body?:string;
    bodystyles?:object;

}
const NotFound:React.FC <notFoundProps> = ({header="Something Went Wrong!",body="No Internet connection",containerstyles,bodystyles}) => {
  return (
    <View style={[globalstyles.columnCenter,{height:'70%'},containerstyles]}>
        <View style={globalstyles.column}>  
             <Text style={[globalstyles.center,globalstyles.headerBig,{color:'#777'}]}>{header}</Text>
          
            <View style={[{width:300, height:200, alignSelf:'center',borderRadius:8,overflow:'hidden',marginVertical:20}]}>
               <Image style={[{width:400, height:200, alignSelf:'center',borderRadius:8}]} 
               source={require('../assets/images/notfound.png')}/>
            </View>
          
          
           <View style={[globalstyles.column,{paddingHorizontal:60}]}>
                   <Text style={[bodystyles]}>{body}</Text>
           </View>
            
        </View>
    </View>
  )
}

export default NotFound