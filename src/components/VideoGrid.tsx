import React from 'react';
// import { Video, ResizeMode } from 'expo-av';
interface videoprops {
    displayvideo?:any;
    videoUri ?:String;
    onPlaybackStatusUpdate : ()=>void;
}
const VideoGrid: React.FC<videoprops> = ({
    displayvideo,
    videoUri,
    onPlaybackStatusUpdate,
  }) => {
  return (
    // <Video
    // ref={displayvideo}
    // style={{
    //   width:'100%',
    //   height:'100%'
    // }}
    // source={{
    //   uri: videoUri,
    // }}
    // useNativeControls
    // resizeMode={ResizeMode.contain}
    // isLooping
    // onPlaybackStatusUpdate={onPlaybackStatusUpdate}
    // />
    <>
    </>
  )
}


