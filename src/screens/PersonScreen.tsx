import React, { useEffect, useState} from "react";
import {
  SafeAreaView,
  Image,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Octicons  from "react-native-vector-icons/Octicons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSelector } from 'react-redux';
import { dateDifferenceWithUnit, searchUserPosts } from "../utils/utils";
import { globalstyles } from "../globalstyles/styles";
import Checkmark from "../components/Checkmark";
import { baseurl } from "../store/api";

interface Employee {
  profile_picture?: string|any;
  first_name: string;
  last_name: string;
  username: string;
  account_type:string;
  is_staff:boolean;
  mobile_number?: string;
  email?: string;
  bio?: string;
}

interface UserPost {
  post_id: number;
  image_0?: string;
  image_1?: string;
  image_2?: string;
  image_3?: string;
  timestamp: string; // Adjust the type according to your data structure
  owner?: Employee;
  content: string;
  images?: string[];
  video?: string;
}

const Person: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) => {
 
  const { employee }: { employee: Employee } = route.params;
  const { theme, isNightMode } = useSelector((state: any) => state.theme);
  const [profile_pic, setImage] = useState<string | null>(null);
  const [userPosts, setUserPost] = useState<UserPost[]>([]);
  const [displayPerson, setDisplay] = useState<boolean>(true);

  async function fetchData(searchTerm: string) {
    try {
      const response = await searchUserPosts(searchTerm);
      if (response !== undefined && response.ok) {
        const data: UserPost[] = await response.json();
        setUserPost(data);
      } else {
        setUserPost([]);
      }
    } catch (error) {
      setUserPost([]);
    }
  }

  useEffect(() => {
    if (employee) {
      fetchData(employee.username);
    }
  }, [employee]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY === 0) {
      setDisplay(true);
    } else {
      userPosts.length > 1 && setDisplay(false);
    }
  };

  useEffect(() => {
    if (employee) {
      if (employee.profile_picture) {
        const pic = employee.profile_picture.split('media')[1];
        setImage(`${baseurl}media/${pic}`);
      }
    }
  }, [employee]);

  function goToProfile(post: UserPost) {
    navigation.navigate('Post', { post });
  }

  function gotoimageviewr(image: string, user: Employee | undefined) {
    if (image && user) {
      navigation.navigate('Picture', { image, user });
    }
  }

  function openImageViewr(image: any, user: Employee | undefined) {
    if (image && user) {
      navigation.navigate('Picture', { image, user });
    }
  }

  return (
    <SafeAreaView
    style={[
      globalstyles.safeArea,
      theme && { backgroundColor: theme.backgroundColor },
    ]}
  >     
    {displayPerson &&  <View
        style={[{
          display: "flex",
          borderBottomColor: "green",
          borderBottomWidth: 1,
          borderRadius:8,
          backgroundColor:'#fff'
        },isNightMode && {backgroundColor:theme.postBackground}]}
      >
        <TouchableOpacity onPress={()=>gotoimageviewr(employee?.profile_picture,employee)}
          style={[globalstyles.imageContainer,{alignSelf:'center'}]}
        >
          {employee.profile_picture && ( 
            <Image source={{ uri:`${baseurl}${employee.profile_picture}` }} style={[globalstyles.avatar,{resizeMode:'cover'}]} />
          )}

          {!employee.profile_picture && (
            <Entypo
              style={{ color: "#888", alignSelf: "center" ,paddingTop:40}}
              name="user"
              size={150}
            />
          )}
        </TouchableOpacity>
        {employee &&  <View style={[{alignSelf:'center',marginTop:15}]}>
          <Text
                  style={[
                    globalstyles.headerMedium,
                    theme && { color: theme.color },
                  ]}
                >
                  {employee.first_name + " " + employee.last_name} {' '}
                  {employee.username && 
                         <Checkmark username={employee.username} is_staff={employee.is_staff} size={18} color={isNightMode?theme.color:'#888'} account={employee.account_type}/>
                  }
                </Text>

          <Text
           style={[
            globalstyles.center,
            {fontSize:14,
            color:'#888'},
          ]}
          >
            @{employee.username}
          </Text> 
          </View>}

        { employee && employee.mobile_number &&  <View
            style={[
              globalstyles.row,
              globalstyles.spaceVertical,
              globalstyles.spaceHorizontal,
         
          ]}
          >
            <MaterialIcons name="call" size={24} color="green" />
            <View style={{ paddingLeft: 20 }}> 
                <Text
                  style={[
                    globalstyles.headerSmall,
                    theme && { color: theme.color },
                  ]}
                >
                  {employee.mobile_number}
                </Text>
            </View>
          </View>
          } 
          {employee && employee.email &&   
          <View
            style={[
              globalstyles.row,
              globalstyles.spaceVertical,
              globalstyles.spaceHorizontal,
            ]}
          >
            <MaterialIcons name="email" size={24} color="orange" />
            <View style={{ paddingLeft: 20}}>
            
                <Text
                  style={[
                    globalstyles.headerSmall,
                    theme && { color: theme.color },
                  ]}
                >
                  {employee.email}
                </Text>
           
            </View>
          </View>
          }
       
         { employee && employee.bio && <View
            style={[
              globalstyles.row,
              globalstyles.spaceVertical,
              globalstyles.spaceHorizontal,
         
          ]}
          >
            <Octicons name="organization" size={24} color="green" />
            
              <View style={{ paddingLeft: 20 }}>
                <Text
                  style={[
                    globalstyles.headerSmall,
                    theme && { color: theme.color },
                  ]}
                >
                  {employee.bio}
                </Text>
              </View>
         
          </View>}

         
      </View>
    }

      <View
        style={[
          globalstyles.column, 
          globalstyles.spaceVertical,
          { marginVertical: 3 },
        ]}
      >
          <Text style={[globalstyles.card_Header,globalstyles.centeredText,
          {marginVertical:0, paddingVertical:0},
              theme &&{color:theme.color}]}>{employee && employee.first_name}{' '}Posts</Text>
          <View
            style={[
              globalstyles.line,
              { alignSelf: "center" , borderBottomColor: '#448EE4' },
            ]}
          >

          </View>

        </View>

{        userPosts && userPosts.length > 0 
      ? (
<FlatList
showsVerticalScrollIndicator={false}
data={userPosts}
onScroll={handleScroll}
keyExtractor={(item,index) => item.post_id.toString()}
renderItem={({ item,index }) => {
  
   const time =  dateDifferenceWithUnit(item.timestamp)
return (
  <View style={[globalstyles.column,globalstyles.card,{paddingVertical:5,marginVertical:0,marginHorizontal:0,paddingHorizontal:0},
   {marginVertical:1}, isNightMode &&{backgroundColor:theme.postBackground}]} key={index}>
    <TouchableOpacity onPress={() => goToProfile(item)}>
      <View style={[{alignSelf:'center',width:40,height:40, borderRadius:20}]}>
        {item.owner?.profile_picture && (
          <Image
            style={{alignSelf:'center',width:40,height:40, borderRadius:20, resizeMode:'cover'}}
            source={{ uri:`${baseurl}${item.owner?.profile_picture}`}}
          />
        )}
      </View>
      <View style={[{position:'absolute',right:50, top:5}]}>
          <Text
          style={[{fontSize:12,color:'#888', fontWeight:'600',fontFamily:'Nunito-Bold'}]}
          >{time && time}</Text>
      </View>
      <View style={[globalstyles.column,{alignSelf:'center'}]}>
               <Text
        style={[ {fontSize:15,fontWeight:'700', textAlign:'center'} ,theme&& {color:theme.color}]}
      > {item.owner?.first_name}{' '} {item.owner?.last_name} 
      </Text>
      <Text
        style={[ {fontSize:12,fontWeight:'600', textAlign:'center'} ,{color:'#888'}]}
      > @ {item.owner?.username} 
      </Text>
      </View>

      <TouchableOpacity style={[{position:'absolute', right:1, top:10}]}>
                <Entypo name="dots-three-vertical" size={17} color="#888" />
      </TouchableOpacity>

      <View style={[globalstyles.column,{alignSelf:'center',width:'98%'}]}>
          <View style={[globalstyles.columnStart,{paddingVertical:8}]}>
              <Text
          numberOfLines={3}
          ellipsizeMode='tail'
          style={[{fontSize:14,paddingTop:1,fontWeight:'400',fontFamily:'Nunito-Bold'},
          theme && {color:theme.color}]}
          > {item.content} 
          </Text>
          </View>
   
       

      </View>  
    </TouchableOpacity>
  </View>
);
}}
/>
):
<View style={[globalstyles.columnCenter, ]}>
<Text style={[globalstyles.card_Content,theme && {color:theme.color}]}>
{employee && employee.first_name } Has No Posts
</Text>
</View>
}

  </SafeAreaView>
  );
};

export default Person;
