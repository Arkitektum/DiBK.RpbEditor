import React, { useCallback, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReactSortable } from 'react-sortablejs';
import { enhancedReducer, formUpdated } from 'utils/form';
import FellesbestemmelseForm from './FellesbestemmelseForm';
import './Fellesbestemmelser.scss';

const initialState = {
   nummerering: '',
   overskrift: '',
   tekst: {
      tekstInnhold: '',
      tekstFormat: {
         kodeverdi: 'html',
         kodebeskrivelse: 'HTML'
      }
   },
   sorteringsrekkefølge: 1,
   versjonsdato: null,
   versjonsnummer: '',
   alternativReferanse: ''
};

const Fellesbestemmelser = ({ state, onChange }) => {
   const [show, setShow] = useState(false);
   const [openedIndex, setOpenedIndex] = useState(-1);
   const [newState, updateNewState] = useReducer(enhancedReducer, initialState);
   const updateForm = useCallback(event => formUpdated(event, updateNewState), []);

   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const newBestemmelse = () => {
      updateNewState({ ...initialState });
      handleShow();
   };

   const openBestemmelse = index => {
      setOpenedIndex(index);
      updateNewState(state.fellesbestemmelser[index]);
      handleShow();
   };

   const closeBestemmelse = () => {
      setOpenedIndex(-1);
      handleClose();
   };

   const saveBestemmelse = () => {
      const fellesbestemmelser = state.fellesbestemmelser.slice(0);

      if (openedIndex === -1) {
         fellesbestemmelser.push(newState);
      } else {
         fellesbestemmelser[openedIndex] = newState;
      }

      onChange({ fellesbestemmelser });
      closeBestemmelse();
   };

   const deleteBestemmelse = () => {
      const tempIndex = openedIndex;
      closeBestemmelse();
      const fellesbestemmelser = state.fellesbestemmelser.slice(0);
      fellesbestemmelser.splice(tempIndex, 1);
      onChange({ fellesbestemmelser });
   };

   const handleListSorted = sortedList => {
      onChange({ fellesbestemmelser: sortedList });
   };

   return (
      <React.Fragment>
         <div className="section">
            {
               state.fellesbestemmelser.length ?
                  <React.Fragment>
                     <p className="tip">Sortér ved å dra og slippe bestemmelsene</p>
                     
                     <div className="bestemmelser">
                        <ReactSortable list={state.fellesbestemmelser} setList={handleListSorted}>
                           {
                              state.fellesbestemmelser.map((bestemmelse, index) => {
                                 return (
                                    <div className="bestemmelser-row" key={index} onClick={() => openBestemmelse(index)}>
                                       <div className="numbering">
                                          <strong>{bestemmelse.nummerering}</strong>
                                       </div>
                                       <div className="heading">{bestemmelse.overskrift}</div>
                                    </div>
                                 );
                              })
                           }
                        </ReactSortable>
                     </div>
                  </React.Fragment> :
                  ''
            }

            <div className="row">
               <div className="col">
                  <Button variant="primary" onClick={newBestemmelse}>
                     Legg til bestemmelse
                  </Button>
               </div>
            </div>
         </div>

         <Modal show={show} enforceFocus={false} onHide={closeBestemmelse} animation={false} backdrop="static" dialogClassName={`fellesbestemmelse-dialog ${openedIndex !== -1 ? 'edit-mode' : ''}`}>
            <Modal.Header closeButton>
               <Modal.Title>Fellesbestemmelse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <FellesbestemmelseForm state={newState} onChange={updateForm} />
            </Modal.Body>
            <Modal.Footer>
               {
                  openedIndex !== -1 ?
                     <Button variant="danger" onClick={deleteBestemmelse}>
                        Slett
                     </Button> :
                     ''
               }
               <div className="button-group">
                  <Button variant="secondary" onClick={closeBestemmelse}>
                     Avbryt
                  </Button>
                  <Button variant="primary" onClick={saveBestemmelse}>
                     Lagre
                  </Button>
               </div>
            </Modal.Footer>
         </Modal>
      </React.Fragment>
   );
}

export default Fellesbestemmelser;
