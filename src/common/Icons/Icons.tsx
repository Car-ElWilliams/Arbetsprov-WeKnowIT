import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { icons } from '../../../assets/index';

const icon = {
    default: { width: 24, height: 24 },
    small: { width: 16, height: 16 },
    medium: { width: 28, height: 28 },
    large: { width: 35, height: 35 },
}
  
interface Props {
    size?: string | undefined,
    variant: string,
    fill?: string | undefined,
    style?: object,
    
}

const getIconSize = (size: string | undefined) => {
  switch (size) {
    case 'small':
      return icon.small;
    case 'medium':
      return icon.medium;
    case 'large':
      return icon.large;
    default:
      return icon.default;
  }
};

const Icons: React.FC<Props> = props => {
  const { variant, fill, size, style } = props;
  const iconSize = getIconSize(size);

  const IconView = icons[variant] ? icons[variant] : null;

  return IconView ? (
    <View style={style}>
      <IconView fill={fill} size={iconSize} />
    </View>
  ) : (
    <View style={styles.missingIconContainer}>
      <Text style={styles.missingIconText}>Missing icon</Text>
    </View>
  );
};

const styles = {
  missingIconContainer: {
    fontSize: 10,
    color: 'white',
    backgroundColor: 'red',
    padding: 5,
    width: 80,
    },
    
  missingIconText: {
    fontSize: 10,
    color: 'white',
    margin: 'auto',
  },
};


export default Icons;
