import Form from 'react-bootstrap/Form';
import { SelectDropdown } from 'components/custom-elements';
import { useContext } from 'react';
import { CodeListContext } from 'App';

const GenereltForm = ({ state, onChange }) => {
   const { lovreferanser, plantyper } = useContext(CodeListContext);

   const handleSelect = ({ name, value, label }) => {
      const data = {};
      data[name] = { kodeverdi: value, kodebeskrivelse: label };
      onChange(data);
   };

   return (
      <div className="section">
         <div className="row">
            <div className="col-6">
               <Form.Group>
                  <Form.Label>Plannavn</Form.Label>
                  <Form.Control type="text" name="plannavn" value={state.plannavn} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col-3">
               <Form.Group>
                  <Form.Label>Plantype</Form.Label>
                  <SelectDropdown name="plantype" className="selectDropdown" options={plantyper} value={state.plantype.kodeverdi} onSelect={handleSelect} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col-3">
               <Form.Group>
                  <Form.Label>Kommunenummer</Form.Label>
                  <Form.Control type="text" name="nasjonalArealplanId.administrativEnhet.kommunenummer" value={state.nasjonalArealplanId.administrativEnhet.kommunenummer} onChange={onChange} />
               </Form.Group>
            </div>
            <div className="col-3">
               <Form.Group>
                  <Form.Label>Planidentifikasjon</Form.Label>
                  <Form.Control type="text" name="nasjonalArealplanId.planidentifikasjon" value={state.nasjonalArealplanId.planidentifikasjon} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col-3">
               <Form.Group>
                  <Form.Label>Lovreferanse</Form.Label>
                  <SelectDropdown name="lovreferanse" className="selectDropdown" options={lovreferanser} value={state.lovreferanse.kodeverdi} onSelect={handleSelect} />
               </Form.Group>
            </div>
         </div>
         {
            /*<div className="row">
               <div className="col-3">
                  <Form.Group>
                     <Form.Label>Versjonsdato</Form.Label>
                     <Calendar name="versjonsdato" value={state.versjonsdato} onChange={onChange} />
                  </Form.Group>
               </div>
               <div className="col-3">
                  <Form.Group>
                     <Form.Label>Versjonsnummer</Form.Label>
                     <Form.Control type="text" name="versjonsnummer" value={state.versjonsnummer || ''} onChange={onChange} />
                  </Form.Group>
               </div>
            </div>
            <div className="row">
               <div className="col-6">
                  <Form.Group>
                     <Form.Label>Alternativ referanse</Form.Label>
                     <Form.Control type="text" name="alternativReferanse" value={state.alternativReferanse || ''} onChange={onChange} />
                  </Form.Group>
               </div>
            </div>*/
         }
      </div>
   );
}

export default GenereltForm;
