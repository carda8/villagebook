import {View, Text, Modal} from 'react-native';
import React from 'react';
import ImageViewer from 'react-native-image-zoom-viewer';

const ImageZoom = ({image, modal, setModal}) => {
  return (
    <Modal
      transparent
      visible={modal}
      onRequestClose={() => {
        setModal(!modal);
      }}>
      <ImageViewer imageUrls={image} />
    </Modal>
  );
};

export default ImageZoom;
