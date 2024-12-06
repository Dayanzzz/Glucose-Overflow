
import './Modal.css';

const Modal = ({ show, onClose, onConfirm, message }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{message}</h3>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-confirm-btn">Yes, Delete</button>
          <button onClick={onClose} className="modal-cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
