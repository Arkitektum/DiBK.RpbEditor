import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useApi } from 'hooks';
import { useModals } from 'context/ModalsContext';
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { ValidationResult } from 'components/partials';
import { saveAs } from 'file-saver';
import jsonFormat from 'json-format';
import { initialState } from 'utils/form';
import { saveToIdb } from 'utils/idb';
import dayjs from 'dayjs';

const FROM_XML_URL = process.env.REACT_APP_FROM_XML_URL;
const TO_XML_URL = process.env.REACT_APP_TO_XML_URL;
const TO_HTML_URL = process.env.REACT_APP_TO_HTML_URL;
const TO_PDF_URL = process.env.REACT_APP_TO_PDF_URL;
const VALIDATE_URL = process.env.REACT_APP_VALIDATE_URL;

function ActionButtons({ state, onFormChange }) {
   const [validationRules, setValidationRules] = useState([]);
   const [showValidationDialog, setShowValidationDialog] = useState(false);
   const { openModal } = useModals();
   const lastSaved = useSelector(state => state.idb.lastSaved);
   const sendAsync = useApi();

   function handleNewDocumentClick() {
      openModal('CONFIRM', {
         title: 'Nytt dokument',
         body: 'Er du sikker på at du vil tømme dokumentet og starte på nytt?',
         okText: 'Ja, start på nytt',
         onConfirm: async () => {
            const initial = { ...initialState };
            onFormChange(initial);
            await saveToIdb(initial);
         }
      });
   }

   function handleFileUpload(event) {
      const files = Array.from(event.target.files);
      event.target.value = '';

      if (!files.length) {
         return;
      }

      openModal('CONFIRM', {
         title: 'Importer fil',
         body: `Er du sikker på at du vil importere filen '${files[0].name}'? Alle dine endringer vil bli overskrevet.`,
         okText: 'Ja, importer fil',
         onConfirm: async () => {
            await importFromFile(files[0]);
         }
      });
   }

   async function importFromFile(file) {
      switch (file.type) {
         case 'text/xml':
         case 'application/xml':
            await importFromXml(file);
            break;
         case 'application/json':
            importFromJson(file);
            break;
         default:
            break;
      }
   };

   async function importFromXml(file) {
      const formData = new FormData();
      formData.append('file', file);

      const data = await sendAsync(FROM_XML_URL, formData, { headers: { 'Content-Type': 'multipart/form-data' } });

      if (data) {
         onFormChange(data);
         await saveToIdb(data);
      }
   }

   function importFromJson(file) {
      const fileReader = new FileReader();

      fileReader.onload = async event => {
         const data = JSON.parse(event.target.result);

         if (data) {
            onFormChange(data);
            await saveToIdb(data);
         }
      };

      fileReader.readAsText(file);
   }

   async function exportToXml() {
      const xmlDoc = await sendAsync(TO_XML_URL, state, { responseType: 'blob' });
      
      if (xmlDoc) {
         saveAs(xmlDoc, `planbestemmelser-${dayjs().format('YYYYMMDDTHHmmss')}.xml`);
      }
   }

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
   
   function exportToJson() {
      const json = jsonFormat(state);

      if (json) {
         const blob = new Blob([json], { type: 'application/json; charset=utf-8' });
         saveAs(blob, `planbestemmelser-${dayjs().format('YYYYMMDDTHHmmss')}.json`);
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

            <Button variant="primary" onClick={handleNewDocumentClick}>Nytt dokument</Button>

            <label className="import" htmlFor="upload">
               <input id="upload" type="file" accept=".xml, .json" onChange={handleFileUpload} />
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
      </React.Fragment>
   );
}

export default ActionButtons;