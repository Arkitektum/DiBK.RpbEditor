import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function ConfirmDialog({ show, title, body, okText, cancelText, onConfirm, onClose, className }) {
   function handleOnConfirm() {
      if (onConfirm) {
         onConfirm();
      }

      onClose();
   }

   return (
      <Modal show={show} onHide={onClose} animation={false} centered dialogClassName={className || 'default-dialog'}>
         <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div dangerouslySetInnerHTML={{__html: body}}></div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>{ cancelText || 'Avbryt' }</Button>
            <Button variant="primary" onClick={handleOnConfirm}>{ okText || 'OK' }</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default ConfirmDialog