import React from 'react';
import Form from 'react-bootstrap/Form';
import { Calendar, TextEditor } from 'components/custom-elements';

const JuridiskeDokumenterForm = ({ state, index, onChange }) => {
   return (
      <React.Fragment>
         <div className="row">
            <div className="col-6">
               <Form.Group>
                  <Form.Label>Tittel</Form.Label>
                  <Form.Control type="text" name={`juridiskeDokumenter[${index}].tittel`} value={state.tittel || ''} onChange={onChange} />
               </Form.Group>
            </div>
         </div>         
         <div className="row">
            <div className="col-6">
               <Form.Group>
                  <Form.Label>Dokumentreferanse</Form.Label>
                  <Form.Control type="text" name={`juridiskeDokumenter[${index}].dokumentreferanse`} value={state.dokumentreferanse || ''} onChange={onChange} />
               </Form.Group>
            </div>
         </div> 
         <div className="row">
            <div className="col">
               <Form.Group>
                  <Form.Label>Sammendrag</Form.Label>
                  <TextEditor name={`juridiskeDokumenter[${index}].sammendrag`} value={state.sammendrag || ''} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col-3">
               <Form.Group>
                  <Form.Label>Rapportnummer</Form.Label>
                  <Form.Control type="text" name={`juridiskeDokumenter[${index}].rapportnummer`} value={state.rapportnummer} onChange={onChange} />
               </Form.Group>
            </div>
         </div>
         <div className="row">
            <div className="col-3">
               <Form.Group>
                  <Form.Label>Dokumentets dato</Form.Label>
                  <Calendar name={`juridiskeDokumenter[${index}].dokumentetsDato`} value={state.dokumentetsDato} onChange={onChange} />
               </Form.Group>
            </div>
         </div>         
      </React.Fragment>
   );
}

export default JuridiskeDokumenterForm;
