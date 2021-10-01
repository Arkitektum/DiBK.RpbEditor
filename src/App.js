import React, { useCallback, useEffect, useReducer, useState, createContext } from 'react';
import { useSelector } from 'react-redux';
import { Spinner, Tab, Tabs } from 'react-bootstrap';
import { ModalsProvider } from 'context/ModalsContext';
import { enhancedReducer, formUpdated, initialState } from './utils/form';
import { useApi, useInterval } from 'hooks';
import { Fellesbestemmelser, Generelt, Planhensikt, KravOmDetaljregulering, Formålsbestemmelser, Hensynsbestemmelser, Områdebestemmelser, Rekkefølgebestemmelser, JuridiskeDokumenter } from 'components/forms';
import { ActionButtons } from 'components/partials';
import modals from 'components/modals/modals';
import { saveToIdb, loadFromIdb } from 'utils/idb';
import Logo from './assets/gfx/logo-dibk.svg';
import './App.scss';

const CODE_LISTS_URL = process.env.REACT_APP_CODE_LISTS_URL;
const SAVE_DOC_INTVAL_SEC = 15;

export const CodeListContext = createContext({});

const App = () => {
   const [codeLists, setCodeLists] = useState(null);
   const [state, updateState] = useReducer(enhancedReducer, initialState);
   const updateForm = useCallback(event => formUpdated(event, updateState), []);
   const sendAsync = useApi();
   const apiLoading = useSelector(state => state.api.loading);

   useEffect(() => {
      loadFromIdb()
         .then(doc => {
            if (doc) {
               updateForm(doc);
            }
         });
   }, [updateForm]);

   useEffect(() => {
      sendAsync(CODE_LISTS_URL, null, { method: 'GET' })
         .then(data => {
            setCodeLists(data);
         });
         
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   useInterval(async () => {
      await saveToIdb(state);
   }, SAVE_DOC_INTVAL_SEC * 1000);

   return (
      <ModalsProvider initialModals={modals}>
         {
            codeLists !== null ?
               <CodeListContext.Provider value={codeLists}>
                  <div className='App'>
                     <div className="container">
                        <header>
                           <h1>
                              <img src={Logo} alt="DiBK" />Fellestjenester PLAN |<span>Reguleringsplanbestemmelser</span>
                              {
                                 apiLoading ?
                                    <Spinner animation="border" /> :
                                    ''
                              }
                           </h1>
                        </header>

                        <ActionButtons state={state} onFormChange={updateForm} />

                        <div className="app-container">
                           <Tabs defaultActiveKey="generelt" id="tabs" transition={false}>
                              <Tab eventKey="generelt" title="Generelt">
                                 <Generelt state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="planhensikt" title="Planens hensikt">
                                 <Planhensikt state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="fellesbestemmelser" title="Fellesbestemmelser">
                                 <Fellesbestemmelser state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="krav-om-detaljregulering" title="Krav om detaljregulering">
                                 <KravOmDetaljregulering state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="formålsbestemmelser" title="Formålsbestemmelser">
                                 <Formålsbestemmelser state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="hensynsbestemmelser" title="Hensynsbestemmelser">
                                 <Hensynsbestemmelser state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="bestemmelseområder" title="Bestemmelseområder">
                                 <Områdebestemmelser state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="rekkefølgebestemmelser" title="Rekkefølgebestemmelser">
                                 <Rekkefølgebestemmelser state={state} onChange={updateForm} />
                              </Tab>
                              <Tab eventKey="juridiskeDokumenter" title="Juridiske dokumenter">
                                 <JuridiskeDokumenter state={state} onChange={updateForm} />
                              </Tab>
                           </Tabs>
                        </div>
                     </div>
                  </div>
               </CodeListContext.Provider> :
               null
         }         
      </ModalsProvider>
   );
}

export default App;
