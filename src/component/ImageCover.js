import {View, Text} from 'react-native';
import React from 'react';

const ImageCover = ({style}) => {
  return (
    <View
      style={[
        {
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 100,
        },
        style,
      ]}
    />
  );
};

export default ImageCover;
