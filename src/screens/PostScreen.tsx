import React from 'react';
import {ScrollView, SafeAreaView, Text, View, Image, Dimensions } from 'react-native';
import { globalstyles } from '../globalstyles/styles';
import { useSelector } from 'react-redux';
import { baseurl } from '../store/api';
import Checkmark from '../components/Checkmark';

interface PostProps {
      post_id:number;
      owner: {
          profile_picture: string;
          first_name: string;
          last_name: string;
          username: string;
          account_type?: string;
        };
        images?: string[];
        content: string;
        video?: string;
};

const PostScreen: React.FC<{ navigation: any, route: any }> = ({ navigation, route })  => {
  const { post }:{post:PostProps} = route.params;
  const { theme, isNightMode } = useSelector((state:any) => state.theme);


  return (
    <SafeAreaView style={[globalstyles.safeArea, theme && { backgroundColor: theme.backgroundColor }]}>
      <ScrollView>
        <View style={[{ paddingVertical: 20, backgroundColor: '#fff' }, isNightMode && { backgroundColor: theme.postBackground }]}>
          <View style={[globalstyles.column]}>
            <View style={[{ alignSelf: 'center', width: 40, height: 40, borderRadius: 20 }]}>
              {post?.owner?.profile_picture && (
                <Image
                  style={{ alignSelf: 'center', width: 40, height: 40, borderRadius: 20, resizeMode: 'cover' }}
                  source={{ uri: `${baseurl}${post?.owner?.profile_picture}` }}
                />
              )}
            </View>
            <View style={[globalstyles.column, { alignSelf: 'center' }]}>
              <Text style={[{ fontSize: 15, fontWeight: '700', textAlign: 'center' }, theme && { color: theme.color }]}>
                {post.owner?.first_name} {post.owner?.last_name}{' '}
                {post?.owner?.username && <Checkmark username={post?.owner?.username} account={post?.owner?.account_type} />}
              </Text>
              <Text style={[{ fontSize: 12, fontWeight: '600', textAlign: 'center' }, { color: '#888' }]}>@ {post.owner?.username}</Text>
            </View>
          </View>

          <View style={[globalstyles.column, { alignSelf: 'center', width: '98%' }]}>
            <View style={[{ paddingVertical: 8, alignSelf: 'center' }]}>
              <Text ellipsizeMode="tail" style={[{ fontSize: 18, paddingTop: 1, fontWeight: '400', fontFamily: 'Poppins-Medium' }, theme && { color: theme.color }]}>
                {post.content}
              </Text>
            </View>
   
   
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostScreen;
