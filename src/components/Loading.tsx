import React from 'react';
import { View, ActivityIndicator} from 'react-native';
import { globalstyles } from '../globalstyles/styles';

interface LoadingProps {
  containerstyles?: object;
}

const Loading: React.FC<LoadingProps> = ({ containerstyles = {} }) => {
  return (
    <View style={[globalstyles.columnCenter, { height: '70%' }, containerstyles]}>
      <ActivityIndicator size="large" color="darkslateblue" />
    </View>
  );
};

export default Loading;
