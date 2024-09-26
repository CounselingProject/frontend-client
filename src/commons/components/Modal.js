import React from 'react';
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const ModalForm = ({ children, visible, title }) => {
  return (
    visible && (
      <Modal
        isOpen={visible}
        style={customStyles}
        contentLabel={title ?? '팝업'}
      >
        {children}
      </Modal>
    )
  );
};

export default React.memo(ModalForm);
