import React from 'react';
import Modal from '@mui/material/Modal';

const CommonModal = ({ children, modalIsOpen, handleOpenModal, className,isBackground }) => {
    return (
        <Modal
            open={modalIsOpen}
            onClose={!isBackground ? () => handleOpenModal() : ''}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className={className}
        >
            {children}
        </Modal>
    )
}
export default CommonModal