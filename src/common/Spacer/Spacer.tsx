import React from 'react';
import { View } from 'react-native';
import { SPACING } from '../../constants/'

interface Props {
    orientation?: string,
    spacing: string | number
}

const Spacer: React.FC<Props>= ({ orientation, spacing }) => {
  return (
    <View
      style={{
        [orientation === 'vertical' ? 'height' : 'width']:
          typeof spacing === 'string' ? SPACING[spacing] : spacing,
      }}
    />
  );
};

export default Spacer;
