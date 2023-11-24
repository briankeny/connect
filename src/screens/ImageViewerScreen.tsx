import React from 'react';
import { Text, View, Image, StyleSheet, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import AntDesign  from 'react-native-vector-icons/AntDesign';
import { globalstyles } from '../globalstyles/styles';
import { baseurl } from '../store/api';
import { useSelector } from 'react-redux';

interface viewerProps {
  image:string;
  user:{
  first_name: string,
  last_name: string,
  username: string,
  profile_picture: string
};
}

const ImageViewerScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route }) =>{
  const { image, user}:viewerProps = route.params;
  const { theme, isNightMode } = useSelector((state:any) => state.theme);

  function goBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={[globalstyles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <View style={[globalstyles.columnStart, { marginBottom: 10 }]}>
        <View style={[globalstyles.row]}>
          <View style={[{ alignSelf: 'center', width: 40, height: 40, borderRadius: 20 }]}>
            {user && user.profile_picture && (
              <Image
                style={{ alignSelf: 'center', width: 40, height: 40, borderRadius: 20, resizeMode: 'cover' }}
                source={{ uri: `${baseurl}${user.profile_picture}` }}
              />
            )}
          </View>

          <View style={[globalstyles.column, { alignSelf: 'center', marginHorizontal: 20 }]}>
            <Text style={[{ fontSize: 15, fontWeight: '700', textAlign: 'center' }, isNightMode && { color: theme.color }]}>
              {user && user.first_name} {user && user.last_name}
            </Text>
            <Text style={[{ fontSize: 12, fontWeight: '600' }, { color: '#888' }]}>@ {user && user.username}</Text>
          </View>
        </View>
        <TouchableOpacity style={[{ position: 'absolute', right: 20 }]} onPress={goBack}>
          <AntDesign name="close" size={24} color={theme && theme.color} />
        </TouchableOpacity>
      </View>
      <View style={[{ height: Dimensions.get('window').height - 50, width: '100%' }]}>
        <Image source={{ uri: `${baseurl}/media/post_images/${image}` }} style={styles.image} resizeMode="contain" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
  },
  image: {
    height: '100%',
    width: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 10,
  },
});

export default ImageViewerScreen;
