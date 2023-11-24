import React, { useEffect, useState } from "react";
import {
  Text,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
  View,
  Image
} from "react-native";
import  Entypo  from "react-native-vector-icons/Entypo";
import Loading from "../components/Loading";
import NotFound from "../components/NotFound";
import { searchPersons,createError } from "../utils/utils";
import SearchBox from "../components/SearchBox";
import { globalstyles } from "../globalstyles/styles";
import { baseurl } from "../store/api";
import Checkmark from "../components/Checkmark";
import { useSelector, useDispatch } from "react-redux";

interface Employee {
  first_name: string;
  last_name: string;
  username: string;
  is_staff: boolean;
  account_type: string;
  profile_picture: string | null;
  department_name: string;
}

const PeopleScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [searchTerm, setSearchTerm] = useState<string>("username");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [fetchingError, setFetchingError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<Employee[]>([]);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [searching, setSearching] = useState<boolean>(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isFocused, setFocus] = useState<boolean>(false);
  const { theme, isNightMode } = useSelector(
    (state: any) => state.theme
  );

  const dispatch = useDispatch();

  async function getSomeEmployees(
    searchTerm: string = "account_type",
    search: string = "personal"
  ) {
    try {
      const response = await searchPersons(searchTerm, search);
      if (response !== undefined && response.ok) {
        const data: Employee[] = await response.json();
        setEmployees(data);
      } else {
        if (response && response !== undefined) {
          const data: any = await response.json();
          if (data) {
            const error = createError(data);
            throw new Error(error);
          } else {
            throw new Error(
              "A Network Error Occurred While Trying To Submit Data"
            );
          }
        }
      }
    } catch (error:any) {
      setFetchingError(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getThisPerson(
    searchTerm: string = "account_type",
    search: string = "personal"
  ) {
    try {
      const response = await searchPersons(searchTerm, search);
      if (response !== undefined && response.ok) {
        const data: Employee[] = await response.json();
        setSearchData(data);
      } else {
        if (response && response !== undefined) {
          const data: any = await response.json();
          if (data) {
            const error = createError(data);
            throw new Error(error);
          } else {
            throw new Error(
              "A Network Error Occurred While Trying To Submit Data"
            );
          }
        }
      }
    } catch (error:any) {
      setFetchingError(error.message);
    } finally {
      setSearching(false);
    }
  }

  useEffect(() => {
    if (searching) {
      getThisPerson(searchTerm, searchQuery);
    }
  }, [searching]);

  useEffect(() => {
    if (isLoading) {
      getSomeEmployees();
    }
  }, [isLoading]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      navigation.replace("People");
    }, 2000);
  }, [navigation]);

  useEffect(() => {
    employees && setSearchData(employees);
  }, [employees]);

  const handleSearch = () => {
    setSearching(true);
  };

  useEffect(() => {
    if (searchQuery === "" && employees) {
      setSearchData(employees);
    }
  }, [searchQuery, employees]);

  function goToProfile(employee: Employee) {
    navigation.navigate("Profile", { employee });
  }

  return (
   
    <SafeAreaView
    style={[
      globalstyles.safeArea,
      theme && { backgroundColor: theme.backgroundColor },
    ]}
  >
    <View style={[globalstyles.column,{marginTop:40, marginBottom:10}]}>
  <SearchBox
    
    searchContainerStyles={[    {
      width: "80%",
      height: 40,
      backgroundColor: "rgba(0,0,0,0.1)",
      alignSelf: "center",
      borderRadius: 30,
      paddingHorizontal: 20,
    },
    theme && {color:theme.color}, isNightMode &&{backgroundColor:"rgba(0,0,0,0.5)",}]}
    query={searchQuery}
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    placeholder="Search here..."
    placeholderTextColor={"#999"}
    onChangeText={(val:string) => {
      setSearchQuery(val);
    }}
    onPress={handleSearch}
  />
</View>

{isLoading ? (
      <Loading
        containerstyles={[
          theme && { backgroundColor: theme.backgroundColor },
        ]}
     
      />
    ) :
   searchData && searchData.length > 0  ?
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
        data={searchData}
        keyExtractor={(item) => item.username?.toString()}
        renderItem={({ item }) => {
          return (
            <View
              style={[globalstyles.column,globalstyles.card, {marginVertical:2}, isNightMode &&{backgroundColor:theme.postBackground}]}
              key={item.username?.toString()}
            >
              <TouchableOpacity style={[globalstyles.row]}
                onPress={() => goToProfile(item)}
              >
                <View
                  style={[{alignSelf:'center',width:100,height:100, borderRadius:50}]}
                >
                  {item.profile_picture && (
                    <Image
                      style={{alignSelf:'center',width:100,height:100, borderRadius:50,resizeMode:'cover'}}
                      source={{ uri: `${baseurl}${item.profile_picture}` }}
                    />
                  )}
                  
                  {!item.profile_picture && (
                    <Entypo style={{color:'#888',alignSelf:'center'}}  name="user" size={50}/>
                  )}
                </View>

                <View style={[globalstyles.column,{width:'70%',paddingHorizontal:20,overflow:'hidden'}]}>
                <View style={[globalstyles.row]}>
                <Text numberOfLines={2} style={[{fontSize:14, fontWeight:'500'},
                {marginBottom:10} , theme && { color: theme.color }]}>
                  {item.first_name + " " + item.last_name}{'  '}
                </Text>
                {item.username && 
          <Checkmark username={item.username} is_staff={item.is_staff} checkStyles={[{marginTop:5}]} color={isNightMode?theme.color:'#888'} account={item.account_type}/>
        }


                </View>
              
          
                <Text
              
                  style={[
                  {fontSize:11,
                  color:'#448EE4'}]}
                > @ {item.username} 
                </Text>
                    <Text style={[{fontSize:14, fontWeight:'500'},{marginVertical:10} , theme && { color: theme.color }]}>
                      {item.department_name}
                    </Text>
                 </View>
               
              </TouchableOpacity>
            </View>
            
          );
        }}
      />
      : fetchingError ? (
      <ScrollView  refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <NotFound
          body={`${fetchingError} '\n' Pull down Screen To Refresh`}
          containerstyles={[ {marginVertical:90},
            theme && { backgroundColor: theme.backgroundColor },
          ]}
          bodystyles={[globalstyles.headerMedium, globalstyles.error]}
        />
        </ScrollView>
      ) :
      <View style={[globalstyles.columnCenter,{height:'70%'}]}>
          <Text style={[globalstyles.card_Content, theme&&{color:theme.color}]}>
              No Persons Found Matching Query
          </Text>
      </View>
    }
  </SafeAreaView>
  );
};

export default PeopleScreen;
