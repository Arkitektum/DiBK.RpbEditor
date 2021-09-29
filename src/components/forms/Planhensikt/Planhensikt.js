import Form from 'react-bootstrap/Form';
import { TextEditor } from 'components/custom-elements';

const Planhensikt = ({ state, onChange }) => {
   return (
      <div className="section">
         <div className="row">
            <div className="col-2">
               <Form.Group>
                  <Form.Label>Nummerering</Form.Label>
                  <Form.Control type="text" name="planhensikt.nummerering" value={state.planhensikt.nummerering || ''} onChange={onChange} />
               </Form.Group>
            </div>
            <div className="col-10">
               <Form.Group>
                  <Form.Label>Overskrift</Form.Label>
                  <Form.Control type="text" name="planhensikt.overskrift" value={state.planhensikt.overskrift || ''} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col">
               <Form.Group>
                  <Form.Label>Tekst</Form.Label>
                  <TextEditor name="planhensikt.tekst.tekstInnhold" value={state.planhensikt.tekst.tekstInnhold || ''} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         {
            /*<div className="row">
               <div className="col-3">
                  <Form.Group>
                     <Form.Label>Versjonsdato</Form.Label>
                     <Calendar name="planhensikt.versjonsdato" value={state.planhensikt.versjonsdato} onChange={onChange} />
                  </Form.Group>
               </div>
               <div className="col-3">
                  <Form.Group>
                     <Form.Label>Versjonsnummer</Form.Label>
                     <Form.Control type="text" name="planhensikt.versjonsnummer" value={state.planhensikt.versjonsnummer || ''} onChange={onChange} />
                  </Form.Group>
               </div>
            </div>
            <div className="row">
               <div className="col-6">
                  <Form.Group>
                     <Form.Label>Alternativ referanse</Form.Label>
                     <Form.Control type="text" name="planhensikt.alternativReferanse" value={state.planhensikt.alternativReferanse || ''} onChange={onChange} />
                  </Form.Group>
               </div>
            </div>*/
         }
      </div>
   );
}

export default Planhensikt;
