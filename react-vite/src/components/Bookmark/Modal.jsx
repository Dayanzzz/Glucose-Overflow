import React from 'react';
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-buttons-deletenote">
        <button className="modal-btn confirm-del-notebtn" onClick={onConfirm}>
            Yes,Delete
          </button>
          <button className="modal-btn cancel-de-note-btn" onClick={onClose}>
            Cancel
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default Modal;
