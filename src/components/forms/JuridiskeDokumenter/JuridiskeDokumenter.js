import React from 'react';
import Button from 'react-bootstrap/Button';
import JuridiskeDokumenterForm from './JuridiskeDokumenterForm';

const initialState = {
   tittel: '',
   dokumentreferanse: '',
   sammendrag: '',
   rapportnummer: '',
   dokumentetsDato: null
};

const JuridiskeDokumenter = ({ state, onChange }) => {
   const newDokument = () => {
      const juridiskeDokumenter = state.juridiskeDokumenter.slice(0);
      juridiskeDokumenter.push({ ...initialState });
      onChange({ juridiskeDokumenter });
   };

   const deleteDokument = index => {
      const juridiskeDokumenter = state.juridiskeDokumenter.slice(0);
      juridiskeDokumenter.splice(index, 1);
      onChange({ juridiskeDokumenter });
   };

   return (
      <React.Fragment>
         {
            state.juridiskeDokumenter.map((krav, index) => {
               return (
                  <div className="form-section" key={'juridisk-dokument-' + index}>
                     <JuridiskeDokumenterForm state={krav} index={index} onChange={onChange} />

                     <div className="button-row">
                        {
                           state.juridiskeDokumenter.length !== 0 ?
                              <Button variant="danger" onClick={() => deleteDokument(index)}>
                                 Slett
                              </Button> :
                              ''
                        }
                        {
                           index === state.juridiskeDokumenter.length - 1 ?
                              <Button variant="primary" onClick={newDokument}>
                                 Legg til dokument
                              </Button> :
                              ''
                        }
                     </div>
                  </div>
               );
            })
         }
         {
            state.juridiskeDokumenter.length === 0 ?
               <Button variant="primary" onClick={newDokument}>
                  Legg til dokument
               </Button> :
               ''
         }
      </React.Fragment>
   );
}

export default JuridiskeDokumenter;
