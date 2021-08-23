import React from 'react';
import Button from 'react-bootstrap/Button';
import KravOmDetaljreguleringForm from './KravOmDetaljreguleringForm';

const initialState = {
   kravTilDetaljreguleringen: {
      tekstInnhold: '',
      tekstFormat: {
         kodeverdi: 'html',
         kodebeskrivelse: 'HTML'
      }
   },
   feltnavn: [],
   bestemmelseOmrådenavn: [],
   hensynSonenavn: []
};

const KravOmDetaljregulering = ({ state, onChange }) => {
   const newKrav = () => {
      const kravOmDetaljregulering = state.kravOmDetaljregulering.slice(0);
      kravOmDetaljregulering.push({ ...initialState });
      onChange({ kravOmDetaljregulering });
   };

   const deleteKrav = index => {
      const kravOmDetaljregulering = state.kravOmDetaljregulering.slice(0);
      kravOmDetaljregulering.splice(index, 1);
      onChange({ kravOmDetaljregulering });
   };

   return (
      <React.Fragment>
         {
            state.kravOmDetaljregulering.map((krav, index) => {
               return (
                  <div className="form-section" key={'krav-' + index}>
                     <KravOmDetaljreguleringForm state={krav} index={index} onChange={onChange} />

                     <div className="button-row">
                        {
                           state.kravOmDetaljregulering.length !== 0 ?
                              <Button variant="danger" onClick={() => deleteKrav(index)}>
                                 Slett
                              </Button> :
                              ''
                        }
                        {
                           index === state.kravOmDetaljregulering.length - 1 ?
                              <Button variant="primary" onClick={newKrav}>
                                 Legg til krav
                              </Button> :
                              ''
                        }
                     </div>
                  </div>
               );
            })
         }
         {
            state.kravOmDetaljregulering.length === 0 ?
               <Button variant="primary" onClick={newKrav}>
                  Legg til krav
               </Button> :
               ''
         }
      </React.Fragment>
   );
}

export default KravOmDetaljregulering;
