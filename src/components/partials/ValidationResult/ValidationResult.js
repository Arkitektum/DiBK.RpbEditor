import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './ValidationResult.scss';

const ValidationResult = ({ show, onHide, result }) => {
   return (
      <Modal show={show} onHide={onHide} animation={false} centered dialogClassName="validation-dialog">
         <Modal.Header closeButton>
            <Modal.Title>Valideringsresultat</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <div>
               {
                  result.length ?
                     result.map((rule, index) => {
                        return (
                           <div className="rule" key={'rule-' + index}>
                              <div className="info">
                                 <div className="status">
                                    <span className={`label label-${rule.status.toLowerCase()}`}>{rule.status}</span>
                                 </div>
                                 <div className="name">
                                    <div>
                                       <span>{rule.name}</span>
                                       {rule.documentation ? <a className="documentation" href={rule.documentation} target="_blank" rel="noreferrer">(Dokumentasjon)</a> : ''}
                                    </div>
                                    {rule.description ? <span className="description">{rule.description}</span> : ''}
                                 </div>
                                 <div className="id">{rule.id}</div>
                              </div>
                              <ul className="messages">
                                 {rule.messages.map((message, idx) => <li key={`message-${index}-${idx}`}>{message.message}</li>)}
                              </ul>
                           </div>
                        );
                     }) :
                     <span>Planbestemmelsene ble validert OK!</span>
               }
            </div>
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={onHide}>Lukk</Button>
         </Modal.Footer>
      </Modal>
   );
};

export default ValidationResult;