import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmDialog = ({ title, body, show, okButton, cancelButton, onHide, onConfirm, className }) => {
   const handleOnConfirm = () => {
      if (onConfirm) {
         onConfirm();
      }

      onHide();
   };   

   return (
      <Modal show={show} onHide={onHide} animation={false} centered dialogClassName={className}>
         <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div dangerouslySetInnerHTML={{__html: body}}></div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>{ cancelButton || 'Avbryt' }</Button>
            <Button variant="primary" onClick={handleOnConfirm}>{ okButton || 'OK' }</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ConfirmDialog