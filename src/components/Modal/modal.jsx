import React, { useState } from 'react';
import './modal.css';

const Modal = ({ children, isOpen, handleCloseModal }) => {

    return (
        <div>

            {isOpen && (
                <div className="modal-overlay">
                    <div className="modal">
                        {children}
                        <button onClick={() => handleCloseModal('confirm')} className='apply-button'>Apply</button>
                        <button onClick={() => handleCloseModal('cancel')} className='clear-button'>Clear</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Modal;
