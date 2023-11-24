import React from 'react';
import { FlatList, SafeAreaView, Text,ScrollView, View,RefreshControl,Image,TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import fetchPosts from '../hooks/fetchPosts';
import { globalstyles } from '../globalstyles/styles';
import  {useSelector} from 'react-redux'
import NotFound from '../components/NotFound';
import Loading from '../components/Loading';
import { baseurl } from '../store/api';
import Checkmark from '../components/Checkmark';
import { dateDifferenceWithUnit } from '../utils/utils';

interface postsProps {
    navigation:any
}



const PostsScreen:React.FC <postsProps> = ({navigation}) => {
  const  {postsList, isLoading,error} = fetchPosts();
  const {theme, isNightMode} = useSelector((state:any)=>state.theme);
  const [refreshing, setRefreshing] = React.useState(false);
  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      navigation.replace("Posts");
    }, 4000);
  }, [navigation]);

  function goTowner(employee:{}){
    navigation.navigate("Profile", {employee}); 
  }

  function goToProfile(post:{}){
    navigation.navigate('Post',{post})
  }
  function gotoimageviewr(image:any,user:any){
    navigation.navigate('Picture',{image,user})
  }
  
  
  return (
<SafeAreaView   style={[
          globalstyles.safeArea,
          theme && { backgroundColor: theme.backgroundColor },
        ]}>

{isLoading ? (
          <Loading
            containerstyles={[
              theme && { backgroundColor: theme.backgroundColor },
            ]}
          />
        ) :
       postsList && postsList.length > 0
        ? (
<FlatList
refreshControl={
  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}
showsVerticalScrollIndicator={false}
data={postsList}
keyExtractor={(item,index) => item?.post_id?.toString()}
renderItem={({ item,index }) => {
     
    const time =  dateDifferenceWithUnit(item.timestamp) 
    return (
    <View style={[globalstyles.column,{paddingVertical:5,
     paddingHorizontal:5, backgroundColor:'#fff',
      marginVertical:1}, isNightMode &&{backgroundColor:theme.postBackground}]} key={index}>
      <TouchableOpacity onPress={() => goToProfile(item)}>
        <View style={[{alignSelf:'center',width:40,height:40, borderRadius:20}]}>
          {item.owner?.profile_picture && (item.owner?.profile_picture != null || item.owner?.profile_picture != undefined) &&(
            <TouchableOpacity onPress={()=>gotoimageviewr(item.owner?.profile_picture, item.owner)}>
            <Image
              style={{alignSelf:'center',width:40,height:40, borderRadius:20, resizeMode:'cover'}}
              source={{ uri:`${baseurl}${item?.owner?.profile_picture}`}}
            />
            </TouchableOpacity>
          )}
        </View>
        <View style={[{position:'absolute',right:50, top:5}]}>
            <Text
            style={[{fontSize:12,color:'#888', fontWeight:'600',fontFamily:'Nunito-Bold'}]}
            >{time && time}</Text>
        </View>
        <TouchableOpacity  onPress={() => goTowner(item.owner)}  style={[globalstyles.column,{alignSelf:'center'}]}>
               <View style={[globalstyles.row]}>
               <Text
          style={[ {fontSize:15,fontWeight:'700',marginBottom:4, textAlign:'center'} ,theme&& {color:theme.color}]}
        > {item.owner?.first_name}{' '} {item.owner?.last_name}{'  '}
          
        </Text>
        {item.owner?.username && 
              <Checkmark username={item.owner?.username} account={item.owner?.account_type}/>
            }
               </View>

              
        <Text
          style={[ {fontSize:12,fontWeight:'600', textAlign:'center'} ,{color:'#888'}]}
        > @ {item.owner?.username} 
        </Text>
        </TouchableOpacity>

        <TouchableOpacity style={[{position:'absolute', right:1, top:10}]}>
                  <Entypo name="dots-three-vertical" size={17} color="#888" />
        </TouchableOpacity>

        <View style={[globalstyles.column,{alignSelf:'center',width:'98%'}]}>
            <View style={[{paddingVertical:8}]}>
                <Text
           
            numberOfLines={3}
            ellipsizeMode='tail'
            style={[{fontSize:14,paddingTop:1,fontWeight:'400',fontFamily:'Nunito-Bold'},
            theme && {color:theme.color}]}
            > {item.content} 
            </Text>
            </View>
            {item.images && item.images.length >0 && 
                   
                    <View style={[
                    {marginVertical:1,marginHorizontal:2, width:'100%'},
                    item?.images?.length > 1 &&
                     {display:'flex', flexDirection:'row',
                   
                   justifyContent:'space-evenly'},

                     item.images.length >= 3 &&  {  flexWrap:'wrap'}
                   
                  ]}
                    >

                {item.images.map((image,index)=>
                      <TouchableOpacity key={index} style={[ {marginVertical:2,marginHorizontal:1,borderRadius:2,
            
                        overflow:'hidden'},
                (item.images.length <= 2) && { width:'59%'},
                        item.images.length <= 4 && { width:'48%'}
                      
                      ]} onPress={()=>gotoimageviewr(image,item.owner)}>
                           <Image
                            style={[
                            item.images.length <= 1 && {alignSelf:'center',
                            width:'100%', borderRadius:0,
                            resizeMode:'contain', aspectRatio: 2/ 3},
                             item.images.length <= 2 && { width:'100%',
                            aspectRatio:2/3, resizeMode:'contain'},
                            item.images.length <= 3 && { minWidth:'48%',aspectRatio:3/3},
                            item.images.length <= 4 && { minWidth:'48%', aspectRatio: 4/ 3}
                        ]}
                    source={{ uri:`${baseurl}/media/post_images/${image}`}}
                    />
                      </TouchableOpacity>
                )}

                   
                    </View>
            }
   

        </View>        
      </TouchableOpacity>
    </View>
  );
}}
/>
):
error ? (
<ScrollView  refreshControl={
  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}>
<NotFound
  body={`${error} '\n' Pull down Screen To Refresh`}
  containerstyles={[{marginTop:40},
    theme && { backgroundColor: theme.backgroundColor },
  ]}
  bodystyles={[globalstyles.headerMedium, globalstyles.error]}
/>
</ScrollView>
) :
<ScrollView  refreshControl={
  <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
}>
<View style={[globalstyles.columnCenter, {height:'100%',paddingVertical:250}]}>
<Text style={[globalstyles.card_Header,theme && {color:theme.color}]}>
  No Posts Found
</Text>
<View style={[{marginTop:40}]}>
<Text style={[globalstyles.textSmall,theme && {color:theme.color}]}>
  Pull screen down to refresh
</Text>
</View>
</View>
</ScrollView>
}
</SafeAreaView>  
)
}

export default PostsScreen;












