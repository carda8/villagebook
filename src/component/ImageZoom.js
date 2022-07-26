import {View, Text, Modal} from 'react-native';
import React from 'react';

const ImageZoom = ({image, modal, setModal}) => {
  return (
    <Modal
      transparent
      visible={modal}
      onRequestClose={() => {
        setModal(!modal);
      }}>
      <ImageViewer imageUrls={[{url: image}]} />
    </Modal>
  );
};

export default ImageZoom;
