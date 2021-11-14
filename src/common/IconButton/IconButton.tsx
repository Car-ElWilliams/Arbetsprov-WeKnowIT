import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Icons} from '../index'

interface Props {
      onPress?: (event: any) => any,
  style?: object,
  iconSize?: string
  variant?: string,
  icon: string,
  color?: string,
}

const IconButton: React.FC<Props> = ({ onPress, style, icon, iconSize, color, variant }) => {
  return onPress ? (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          variant === 'flatten' ? {} : styles.iconButtonContainer,
          style
        ]}
      >
        <Icons variant={icon} size={iconSize} fill={color} />
      </View>
    </TouchableOpacity>
  ) : (
    <View
      style={[
        variant === 'flatten' ? {} : styles.iconButtonContainer,
        style
      ]}
    >
      <Icons variant={icon} size={iconSize} fill={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconButtonContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 38 / 2,
    width: 38,
    height: 38,
    elevation: 4
  }
});

export default IconButton;
