import React, { useState } from 'react';
import Modal from './Modal';

const ImageWithModal = ({ src, alt = '', style = {} }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <img src={src} alt={alt} style={style} onClick={openModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <img src={src} alt={alt} style={{ maxWidth: '90%', maxHeight: '90%' }} />
      </Modal>
    </>
  );
};

export default ImageWithModal;
