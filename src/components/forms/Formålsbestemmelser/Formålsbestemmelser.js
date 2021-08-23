import React, { useCallback, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReactSortable } from 'react-sortablejs';
import { enhancedReducer, formUpdated } from 'utils/form';
import FormålsbestemmelseForm from './FormålsbestemmelseForm';
import './Formålsbestemmelser.scss';

const initialState = {
   nummerering: '',
   overskrift: '',
   tekst: {
      tekstInnhold: '',
      tekstFormat: {
         kodeverdi: 'html',
         kodebeskrivelse: ''
      }
   },
   sorteringsrekkefølge: 1,
   versjonsdato: null,
   versjonsnummer: '',
   alternativReferanse: '',
   gjelderHovedformål: {
      kodeverdi: '1',
      kodebeskrivelse: ''
   },
   fellesForHovedformål: true,
   feltnavn: [],
   bestemmelseOmrådenavn: [],
   objektnavn: []
};

const Formålsbestemmelser = ({ state, onChange }) => {
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
      updateNewState(state.formålsbestemmelser[index]);
      handleShow();
   };

   const closeBestemmelse = () => {
      setOpenedIndex(-1);
      handleClose();
   };

   const saveBestemmelse = () => {
      const formålsbestemmelser = state.formålsbestemmelser.slice(0);

      if (openedIndex === -1) {
         formålsbestemmelser.push(newState);
      } else {
         formålsbestemmelser[openedIndex] = newState;
      }

      onChange({ formålsbestemmelser });
      closeBestemmelse();
   };

   const deleteBestemmelse = () => {
      const tempIndex = openedIndex;
      closeBestemmelse();
      const formålsbestemmelser = state.formålsbestemmelser.slice(0);
      formålsbestemmelser.splice(tempIndex, 1);
      onChange({ formålsbestemmelser });
   };

   const handleListSorted = sortedList => {
      onChange({ formålsbestemmelser: sortedList });
   };

   return (
      <React.Fragment>
         <div className="section">
            {
               state.formålsbestemmelser.length ?
                  <React.Fragment>
                     <p className="tip">Sortér ved å dra og slippe bestemmelsene</p>
                     
                     <div className="bestemmelser">
                        <ReactSortable list={state.formålsbestemmelser} setList={handleListSorted}>
                           {
                              state.formålsbestemmelser.map((bestemmelse, index) => {
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

         <Modal show={show} onHide={closeBestemmelse} animation={false} backdrop="static" dialogClassName={`formålsbestemmelse-dialog ${openedIndex !== -1 ? 'edit-mode' : ''}`}>
            <Modal.Header closeButton>
               <Modal.Title>Formålsbestemmelse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <FormålsbestemmelseForm state={newState} onChange={updateForm} />
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
                  <Button variant="primary" onClick={saveBestemmelse} disabled={newState.nummerering === '' || newState.overskrift === ''}>
                     Lagre
                  </Button>
               </div>
            </Modal.Footer>
         </Modal>
      </React.Fragment>
   );
}

export default Formålsbestemmelser;
