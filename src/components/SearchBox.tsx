import React from 'react';
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { TextInput, TouchableOpacity, View,ViewStyle } from 'react-native';
import { useSelector } from 'react-redux';
import { globalstyles } from '../globalstyles/styles';

interface SearchBoxProps {
  query?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  searchContainerStyles?: object;
  placeholderTextColor?: string;
  placeholder?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  query = '',
  onChangeText,
  onPress,
  onFocus,
  onBlur,
  searchContainerStyles = {},
  placeholderTextColor = '#888',
  placeholder = 'Search Here...',
}) => {
  const { theme, isNightMode } = useSelector((state:any) => state.theme);

  return (
    <View style={[globalstyles.rowEven]}>
      <TextInput
        style={searchContainerStyles}
        value={query}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
        onPress={onPress}
        style={[{ width: 30, height: 40, paddingTop: 5 }]}
      >
        <Ionicons name="md-search-sharp" size={24} color={theme && theme.color} />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBox;
