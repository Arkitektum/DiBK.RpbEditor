import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ConfirmDialog } from 'components/custom-elements';
import { ValidationResult } from 'components/partials';
import { saveAs } from 'file-saver';
import jsonFormat from 'json-format';
import { sendAsync } from 'utils/api';
import { initialState } from 'utils/form';
import { saveToIdb } from 'utils/idb';
import dayjs from 'dayjs';

const FROM_XML_URL = process.env.REACT_APP_FROM_XML_URL;
const TO_XML_URL = process.env.REACT_APP_TO_XML_URL;
const TO_HTML_URL = process.env.REACT_APP_TO_HTML_URL;
const TO_PDF_URL = process.env.REACT_APP_TO_PDF_URL;
const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;

function ActionButtons({ state, onFormChange }) {
   const [importFiles, setImportFiles] = useState([]);
   const [validationRules, setValidationRules] = useState([]);
   const [showNewDocumentDialog, setShowNewDocumentDialog] = useState(false);
   const [showImportFileDialog, setShowImportFileDialog] = useState(false);
   const [showValidationDialog, setShowValidationDialog] = useState(false);
   const lastSaved = useSelector(state => state.idb.lastSaved);

   async function handleOnNewDocumentConfirm() {
      const initial = { ...initialState };
      onFormChange(initial);
      await saveToIdb(initial);
   }

   function handleOnImportFile(event) {
      const files = Array.from(event.target.files);
      event.target.value = '';

      if (!files.length) {
         setImportFiles([]);
         return;
      }

      setImportFiles(files);
      setShowImportFileDialog(true);
   }

   async function handleOnImportFileConfirm() {
      setShowImportFileDialog(false);
      setImportFiles([]);
      await importFromFile();
   }

   function handleOnCloseImportFileDialog() {
      setShowImportFileDialog(false);
      setImportFiles([]);
   }

   async function importFromFile() {
      switch (importFiles[0].type) {
         case 'text/xml':
         case 'application/xml':
            await importFromXml(importFiles);
            break;
         case 'application/json':
            importFromJson(importFiles);
            break;
         default:
            break;
      }
   };

   async function importFromXml(files) {
      const formData = new FormData();
      formData.append('file', files[0]);

      const data = await sendAsync(FROM_XML_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (data) {
         onFormChange(data);
         await saveToIdb(data);
      }
   }

   function importFromJson(files) {
      const fileReader = new FileReader();

      fileReader.onload = async event => {
         const data = JSON.parse(event.target.result);

         if (data) {
            onFormChange(data);
            await saveToIdb(data);
         }
      };

      fileReader.readAsText(files[0]);
   }

   async function exportToXml() {
      const xmlDoc = await sendAsync(TO_XML_URL, state, { responseType: 'blob' });
      
      if (xmlDoc) {
         saveAs(xmlDoc, `planbestemmelser-${dayjs().format('YYYYMMDDTHHmmss')}.xml`);
      }
   }

   function exportToJson() {
      const json = jsonFormat(state);

      if (json) {
         const blob = new Blob([json], { type: 'application/json; charset=utf-8' });
         saveAs(blob, `planbestemmelser-${dayjs().format('YYYYMMDDTHHmmss')}.json`);
      }
   };

   async function exportToHtml() {
      const data = await sendAsync(TO_HTML_URL, state);

      if (data) {
         const tab = window.open('about:blank');

         if (tab !== null) {
            tab.document.open();
            tab.document.write(data);
            tab.document.close();
         }
      }
   }

   async function exportToPdf() {
      const pdfDoc = await sendAsync(TO_PDF_URL, state, { responseType: 'blob' });

      if (pdfDoc) {
         saveAs(pdfDoc, `planbestemmelser-${dayjs().format('YYYYMMDDTHHmmss')}.pdf`);
      }
   };

   async function validate() {
      const result = await sendAsync(VALIDATE_URL, state);

      if (result !== null) {
         setValidationRules(result);
         setShowValidationDialog(true);
      }
   }

   function closeValidationDialog() {
      setShowValidationDialog(false);
      setValidationRules([]);
   }

   return (
      <React.Fragment>
         <div className="action-buttons">
            {
               lastSaved !== null ?
                  <span className="last-saved">Sist lagret: {lastSaved}</span> :
                  null
            }

            <Button variant="primary" onClick={() => setShowNewDocumentDialog(true)}>Nytt dokument</Button>

            <label className="import" htmlFor="upload">
               <input id="upload" type="file" accept=".xml, .json" onChange={handleOnImportFile} />
               <span>Importér</span>
            </label>

            <DropdownButton id="dropdown-basic-button" title="Eksportér" align="left">
               <Dropdown.Item onClick={exportToXml}>XML</Dropdown.Item>
               <Dropdown.Item onClick={exportToHtml}>HTML</Dropdown.Item>
               <Dropdown.Item onClick={exportToPdf}>PDF</Dropdown.Item>
               <Dropdown.Item onClick={exportToJson}>JSON</Dropdown.Item>
            </DropdownButton>

            <Button variant="primary" onClick={validate}>Validér</Button>
         </div>

         <ValidationResult show={showValidationDialog} onHide={closeValidationDialog} result={validationRules} />

         <ConfirmDialog
            show={showNewDocumentDialog}
            onConfirm={handleOnNewDocumentConfirm}
            onClose={() => setShowNewDocumentDialog(false)}
            title="Nytt dokument"
            body="Er du sikker på at du vil tømme dokumentet og starte på nytt?"
            okText="Ja, start på nytt"
         />

         <ConfirmDialog
            show={showImportFileDialog}
            onConfirm={handleOnImportFileConfirm}
            onClose={handleOnCloseImportFileDialog}
            title="Importer fil"
            body={importFiles.length ? `Er du sikker på at du vil importere filen '${importFiles[0].name}'? Alle dine endringer vil bli overskrevet.` : ''}
            okText="Ja, importer fil"
         />

      </React.Fragment>
   );
}

export default ActionButtons;