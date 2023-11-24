import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, TextInput, ScrollView } from 'react-native';
import MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useSelector } from 'react-redux';
import Toast from '../components/Toast';
import {createError,
  postImageBodyConstructor,
  submitPost,
  validatePostData,
} from '../utils/utils';
import { globalstyles } from '../globalstyles/styles';

const CreatePostScreen: React.FC = () => {
  const { theme, isNightMode } = useSelector((state:any) => state.theme);
  const [isFocused, setFocus] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [openCateg, setOpenCateg] = useState(false);
  const [category, setCategory] = useState('post');
  
  const [image, setImage] = useState<any[]>([]);
  const [video, setVideo] = useState<any>(null);

  const [openModal, setOpenModal] = useState(false);
  const [modalStatus, setModalStatus] = useState('');
  const [modalHeader, setModalHeader] = useState('');
  const [modalContent, setModalContent] = useState('');
  const categories = ['post', 'news', 'announcement', 'info'];
   const handleCreatePostScreen = async () => {
    try {
      const data = validatePostData(title, content, category);
      
      const dataToSubm = postImageBodyConstructor(data,image);
      if (video) {
        dataToSubm.append(`video`, video);
      }
      
      setModalHeader('A moment Please Wait!');
      setModalContent(`Submitting ${category}...`);
      setOpenModal(true);
      const response = await submitPost(dataToSubm);

      if (response.status == 200 || response.status == 201) {
        setModalHeader('Success!');
        setModalStatus('success');
        setModalContent(`${category} was posted Successfully`);
        setOpenModal(true);
      } else {
        if (response) {
          const data = await response.data;
          if (data) {
            const error = createError(data);
            throw new Error(error);
          } else {
            throw new Error('A Network Error Occurred While Trying To Submit Data');
          }
        }
      }
    } catch (error:any) {
      setModalHeader('Error!');
      setModalStatus('error');
      setModalContent(error.message);
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (openModal) {
      const timer = setTimeout(() => {
        setOpenModal(false);
      }, 4000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [openModal]);

  useEffect(() => {
    if (openCateg) {
      const timer = setTimeout(() => {
        setOpenCateg(false);
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [openCateg]);

  return (

     <SafeAreaView style={[
      globalstyles.safeArea,
      theme && { backgroundColor: theme.backgroundColor },
    ]}>
     <ScrollView>
    
        <TouchableOpacity 
          onPress={() => setOpenCateg(!openCateg)}
            style={[{width:150,height:30,marginHorizontal:30,paddingTop:2,
            borderRadius:20},globalstyles.rowEven,{ backgroundColor:'green'},
          openCateg &&{borderColor:'#fff'}
          ]}
          >
            <Text style={[{fontSize:14,textTransform:'capitalize'
          },globalstyles.centeredText, {color:'#fff'}
          ]}>{category}</Text>
            <Entypo name="chevron-down" size={24} color={'#fff'} />
          </TouchableOpacity>

          { openCateg &&
          <View style={[{width:120,height:100,left:50,top:33,zIndex:1, position:'absolute',backgroundColor:'#fff' }
          ,isNightMode&&{backgroundColor:theme.postBackground}
          ]}>
           {categories && categories.map((item,index)=>
             <TouchableOpacity
             
             key={index} onPress={()=>{
              setOpenCateg(false);
              setCategory(item)
             }}>
              <Text style={[{fontSize:12,padding:2, fontWeight:'500',textTransform:'capitalize'}
              ,theme&&{color:theme.color},
            item == category && {color:'#448EE4'}  
            ,globalstyles.centeredText, 
                ]}>{item}</Text>
             </TouchableOpacity>
           )} 
          </View>}

    <View>
  <View style = {[globalstyles.spaceHorizontal,globalstyles.spaceVertical]}>
  <TextInput
    onFocus={() => setFocus(true)}
    onBlur={() => setFocus(false)}
    placeholderTextColor={"#888"}
    style={[
    globalstyles.inputNoBorder,{minWidth:'40%'},
    globalstyles.centeredText,
    theme && { color: theme.color },
    isFocused
        ? { borderBottomColor: "green" }
        : { borderBottomColor: "#555" },
    ]}
    placeholder="**Optional: Title"
    maxLength={50}
    value={title} 
    onChangeText={(val) => setTitle(val)}
  />
  </View>

 <View style = {[globalstyles.spaceHorizontal,globalstyles.spaceVertical]}>
  <TextInput
   onFocus={() => setFocus(true)}
   onBlur={() => setFocus(false)}
   placeholderTextColor={"#888"}
   style={[
   {width:'98%', minHeight:100,borderRadius:8,paddingVertical:0,paddingHorizontal:10 ,},
   theme && { color: theme.color, backgroundColor:'#fff'}, isNightMode && {backgroundColor:theme.cardBackground},
   isFocused && { borderBottomColor: "green"} ,content.length <=0  &&{ fontSize:24}
   ]}
   placeholder="Write your post content here ..."
   maxLength={780}
   value={content} 
   
   onChangeText={(val) => setContent(val)}
    multiline
  />
   </View>

  
    </View>
     
    <Toast
              visible={openModal}
              status={modalStatus}
              onPress={() => setOpenModal(false)}
              modalHeader={modalHeader}
              modalContent={modalContent}
            />
           
            <View style={[globalstyles.rowEven,{ marginVertical:20,
     width:'100%',paddingVertical:10},
     theme && { backgroundColor:'#fff'}, isNightMode && {backgroundColor:theme.cardBackground}]}>
      
    <TouchableOpacity onPress={handleCreatePostScreen}  style={globalstyles.columnCenter}>
    <MaterialCommunityIcons name="send" size={24} color="green" />
        <Text style={[globalstyles.card_Content,theme&&{color:theme.color}]}>Post</Text>
    </TouchableOpacity> 
   </View> 
  
         </ScrollView>
         </SafeAreaView>

   
  );
};

export default CreatePostScreen;
