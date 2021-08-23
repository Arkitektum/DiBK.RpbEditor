import React from 'react';
import Form from 'react-bootstrap/Form';
import { Tags, TextEditor } from 'components/custom-elements';

const KravOmDetaljreguleringForm = ({ state, index, onChange }) => {
   return (
      <React.Fragment>
         <div className="row">
            <div className="col">
               <Form.Group>
                  <Form.Label>Tekst</Form.Label>
                  <TextEditor name={`kravOmDetaljregulering[${index}].kravTilDetaljreguleringen.tekstInnhold`} value={state.kravTilDetaljreguleringen.tekstInnhold || ''} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col">
               <Form.Group>
                  <Form.Label>Feltnavn</Form.Label>
                  <Tags name={`kravOmDetaljregulering[${index}].feltnavn`} value={state.feltnavn} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col">
               <Form.Group>
                  <Form.Label>Bestemmelseområdenavn</Form.Label>
                  <Tags name={`kravOmDetaljregulering[${index}].bestemmelseOmrådenavn`} value={state.bestemmelseOmrådenavn} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col">
               <Form.Group>
                  <Form.Label>Hensynssonenavn</Form.Label>
                  <Tags name={`kravOmDetaljregulering[${index}].hensynSonenavn`} value={state.hensynSonenavn} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
      </React.Fragment>
   );
}

export default KravOmDetaljreguleringForm;
