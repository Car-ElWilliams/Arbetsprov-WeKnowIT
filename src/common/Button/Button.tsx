import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  GestureResponderEvent,
} from 'react-native';

interface Props {
  title: string,
  onPress?: (event: GestureResponderEvent) => any,
  style?: object,
  disabled?: boolean,
  variant: string,
  loading?: boolean,
  size?: string,
  keys?: string
}

const Button: React.FC<Props> = ({
  title,
  onPress,
  style,
  disabled,
  variant,
  loading,
  size,
  keys,
  ...props
}) => {
  const getViewStyle = () => {
    switch (variant) {
      case 'city':
        return styles.primaryButton;
      case 'country':
        return styles.secondaryButton;
    }
  };

    const getTextStyle = () => {
    switch (variant) {
      case 'city':
        return styles.primaryButtonTitle;
      case 'country':
        return styles.secondaryButtonTitle;
    }
  };


  const getSize = () => {
    switch (size) {
      case 'small':
        return styles.sizeSmall;
      case 'medium':
        return styles.sizeMedium;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={disabled ? 1 : 0.7}
      onPress={onPress}
      disabled={loading ?? disabled}
      key={keys}
      {...props}
    >
      <View
        style={[
          styles.defaultStyle,
          getViewStyle(),
          getSize(),
          disabled || loading ? styles.disabledButton : {},
          style,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="black" />
        ) : (
          <Text
              style={[
              getTextStyle(),
              style?.color ? { color: style.color } : {},
              disabled ? styles.disabledButtonText : {},
            ]}
          >
            {title}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  defaultStyle: {
    borderRadius: 25,
    justifyConent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  
  primaryButton: {
    backgroundColor: 'orange',
  },
  
  secondaryButton: {
    backgroundColor: 'white',
  },
  
  primaryButtonTitle: {
    color: 'white',
  },
  
  secondaryButtonTitle: {
    color: 'black',
  },

  disabledButton: {
    backgroundColor: 'grey',
  },

  disabledButtonText: {
    color: 'black',
  },

  sizeSmall: {
    width: '33%',
  },

  sizeMedium: {
    width: '66%',
  },
});

export default Button;
