import React, { useState } from 'react';
import { Modal as AntModal, Button } from 'antd';

export const Modal = ({ title, description, buttonText, open, onClose }) => {
  const [isModalOpen, setIsModalOpen] = useState(open);

  const showModal = () => setIsModalOpen(true);

  return (
    <>
      {/* <Button type="primary" onClick={showModal}>
        {buttonText}
      </Button> */}
      <AntModal title={title} open={isModalOpen} onOk={onClose} onCancel={onClose} okText="OK">
        <p>{description}</p>
      </AntModal>
    </>
  );
};
