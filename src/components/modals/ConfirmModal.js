import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useModals } from 'context/ModalsContext';

function ConfirmModal(props) {
   const { closeModal } = useModals();
   const { title, body, okText, cancelText, onConfirm, onCancel, className } = props;

   async function handleOnConfirm() {
      if (onConfirm) {
         await Promise.resolve(onConfirm());
      }

      closeModal('CONFIRM');
   }

   async function handleOnCancel() {
      if (onCancel) {
         await Promise.resolve(onCancel());
      }

      closeModal('CONFIRM');
   }

   return (
      <Modal show={true} onHide={handleOnCancel} animation={false} centered dialogClassName={className || 'default-dialog'}>
         <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            {body}
         </Modal.Body>
         <Modal.Footer>
            <Button variant="secondary" onClick={handleOnCancel}>{ cancelText || 'Avbryt' }</Button>
            <Button variant="primary" onClick={handleOnConfirm}>{ okText || 'OK' }</Button>
         </Modal.Footer>
      </Modal>
   );
}

export default ConfirmModal;