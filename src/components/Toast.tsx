import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import  AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import  Entypo  from 'react-native-vector-icons/Entypo';
import  MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { globalstyles } from '../globalstyles/styles';
import { useSelector } from 'react-redux';

interface ToastProps {
  status?: string;
  color?: string;
  onPress: () => void;
  visible ?: boolean;
  modalHeader ?: string;
  modalContent ?: string;
}

const Toast: React.FC<ToastProps> = ({
  status = 'error',
  color = '#888',
  onPress,
  visible,
  modalHeader,
  modalContent,
}) => {
  const { theme, isNightMode } = useSelector((state:any) => state.theme);
  let headerStyles: { color?: string } = { color: theme.color };

  const iconSelector = () => {
    if (status) {
      if (status === 'success') {
        headerStyles = { color: 'green' };
        color = 'green';
      }
      if (status === 'error') {
        headerStyles = { color: 'red' };
        color = 'red';
      }
      if (status === 'warning') {
        headerStyles = { color: '#cc3300' };
        color = '#cc3300';
      }
      if (status === 'info') {
        headerStyles = { color: 'orange' };
        color = 'orange';
      }
    }
  };
  iconSelector();

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View
        style={[
          globalstyles.card,
          globalstyles.modalContainer,
          theme && { backgroundColor: isNightMode ? theme.cardBackground : theme.backgroundColor },
        ]}
      >
        <View style={globalstyles.column}>
          {status && status === 'success' && (
            <AntDesign style={[globalstyles.modalIcon, { left: 2, position: 'absolute' }]} name="checkcircle" size={28} color="green" />
          )}
          {status && status === 'error' && (
            <MaterialIcons style={[globalstyles.modalIcon, { left: 2, position: 'absolute' }]} name="error" size={28} color="red" />
          )}
          {status && status === 'info' && (
            <AntDesign style={[globalstyles.modalIcon, { left: 2, position: 'absolute' }]} name="warning" size={28} color="orange" />
          )}
          {status && status === 'warning' && (
            <Ionicons style={[globalstyles.modalIcon, { left: 2, position: 'absolute' }]} name="warning" size={28} color="black" />
          )}
          <View style={[globalstyles.column, { width: '75%', alignSelf: 'center' }]}>
            <Text style={[globalstyles.modalHeader, { textAlign: 'center' }, theme && { color: theme.color }, headerStyles]}>{modalHeader}</Text>
          </View>
          <TouchableOpacity style={{ right: 2, top: 15, position: 'absolute', width: 70, height: 70 }} onPress={onPress}>
            <Entypo style={[{ top: 25, position: 'absolute', alignSelf: 'flex-end' }]} name="cross" size={28} color={color} />
          </TouchableOpacity>
        </View>
        <View style={{ width: '75%', alignSelf: 'center' }}>
          <Text style={[globalstyles.modalContent, { textAlign: 'center', lineHeight: 19 }, theme && { color: theme.color }]}>{modalContent}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default Toast;
