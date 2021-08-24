import React, { useCallback, useReducer, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ReactSortable } from 'react-sortablejs';
import { enhancedReducer, formUpdated } from 'utils/form';
import HensynsbestemmelseForm from './HensynsbestemmelseForm';
import './Hensynsbestemmelser.scss';

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
   hensynskategori: {
      kodeverdi: '5',
      kodebeskrivelse: ''
   },
   hensynSonenavn: []
};

const Hensynsbestemmelser = ({ state, onChange }) => {
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
      updateNewState(state.hensynsbestemmelser[index]);
      handleShow();
   };

   const closeBestemmelse = () => {
      setOpenedIndex(-1);
      handleClose();
   };

   const saveBestemmelse = () => {
      const hensynsbestemmelser = state.hensynsbestemmelser.slice(0);

      if (openedIndex === -1) {
         hensynsbestemmelser.push(newState);
      } else {
         hensynsbestemmelser[openedIndex] = newState;
      }

      onChange({ hensynsbestemmelser });
      closeBestemmelse();
   };

   const deleteBestemmelse = () => {
      const tempIndex = openedIndex;
      closeBestemmelse();
      const hensynsbestemmelser = state.hensynsbestemmelser.slice(0);
      hensynsbestemmelser.splice(tempIndex, 1);
      onChange({ hensynsbestemmelser });
   };

   const handleListSorted = sortedList => {
      onChange({ hensynsbestemmelser: sortedList });
   };

   return (
      <React.Fragment>
         <div className="section">
            {
               state.hensynsbestemmelser.length ?
                  <React.Fragment>
                     <p className="tip">Sortér ved å dra og slippe bestemmelsene</p>
                     
                     <div className="bestemmelser">
                        <ReactSortable list={state.hensynsbestemmelser} setList={handleListSorted}>
                           {
                              state.hensynsbestemmelser.map((bestemmelse, index) => {
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

         <Modal show={show} onHide={closeBestemmelse} animation={false} backdrop="static" dialogClassName={`hensynsbestemmelse-dialog ${openedIndex !== -1 ? 'edit-mode' : ''}`}>
            <Modal.Header closeButton>
               <Modal.Title>Hensynsbestemmelse</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               <HensynsbestemmelseForm state={newState} onChange={updateForm} />
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

export default Hensynsbestemmelser;
