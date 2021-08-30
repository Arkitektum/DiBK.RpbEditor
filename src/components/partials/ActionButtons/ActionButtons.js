import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import { ConfirmDialog } from 'components/custom-elements';
import { ValidationResult } from 'components/partials';
import { saveAs } from 'file-saver';
import { set } from 'idb-keyval';
import { sendAsync } from 'utils/api';
import { initialState } from 'utils/form';

const FROM_XML_URL = process.env.REACT_APP_FROM_XML_URL;
const TO_XML_URL = process.env.REACT_APP_TO_XML_URL;
const TO_HTML_URL = process.env.REACT_APP_TO_HTML_URL;
const TO_PDF_URL = process.env.REACT_APP_TO_PDF_URL;
const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;

const ActionButtons = ({ state, onFormChange }) => {
   const [showNewDocumentDialog, setShowNewDocumentDialog] = useState(false);
   const [validationRules, setValidationRules] = useState([]);
   const [showValidationDialog, setShowValidationDialog] = useState(false);

   const handleOnNewDocumentConfirm = async () => {
      const initial = { ...initialState };
      onFormChange(initial);
      await set('rpb-document', initial);
   };

   const importFromXml = async event => {
      const files = Array.from(event.target.files);
      event.target.value = '';

      if (!files.length) {
         return;
      }

      const formData = new FormData();
      formData.append('file', files[0]);

      const data = await sendAsync(FROM_XML_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (data) {
         onFormChange(data);
         await set('rpb-document', data);
      }
   };

   const exportToXml = async () => {
      const xmlDoc = await sendAsync(TO_XML_URL, state, { responseType: 'blob' });

      if (xmlDoc) {
         saveAs(xmlDoc, 'planbestemmelser.xml');
      }
   };

   const exportToHtml = async () => {
      const data = await sendAsync(TO_HTML_URL, state);

      if (data) {
         const tab = window.open('about:blank');

         if (tab !== null) {
            tab.document.open();
            tab.document.write(data);
            tab.document.close();
         }
      }
   };

   const exportToPdf = async () => {
      const pdfDoc = await sendAsync(TO_PDF_URL, state, { responseType: 'blob' });

      if (pdfDoc) {
         saveAs(pdfDoc, 'planbestemmelser.pdf');
      }
   };

   const validate = async () => {
      const result = await sendAsync(VALIDATE_URL, state);

      if (result !== null) {
         setValidationRules(result);
         setShowValidationDialog(true);
      }
   };

   const closeValidationDialog = () => {
      setShowValidationDialog(false);
      setValidationRules([]);
   };

   return (
      <React.Fragment>
         <div className="action-buttons">
            <Button variant="primary" onClick={() => setShowNewDocumentDialog(true)}>Nytt dokument</Button>

            <label className="import" htmlFor="upload">
               <input id="upload" type="file" accept=".xml" onChange={importFromXml} />
               <span>Importér</span>
            </label>

            <DropdownButton id="dropdown-basic-button" title="Eksportér" align="left">
               <Dropdown.Item onClick={exportToXml}>XML</Dropdown.Item>
               <Dropdown.Item onClick={exportToHtml}>HTML</Dropdown.Item>
               <Dropdown.Item onClick={exportToPdf}>PDF</Dropdown.Item>
            </DropdownButton>

            <Button variant="primary" onClick={validate}>Validér</Button>
         </div>

         <ValidationResult show={showValidationDialog} onHide={closeValidationDialog} result={validationRules} />

         <ConfirmDialog
            show={showNewDocumentDialog}
            onHide={() => setShowNewDocumentDialog(false)}
            onConfirm={handleOnNewDocumentConfirm}
            title="Nytt dokument"
            body="Er du sikker på at du vil tømme dokumentet og starte på nytt?"
            okButton="Ja, start på nytt"
            className="new-document-dialog"
         />

      </React.Fragment>
   );
};

export default ActionButtons;