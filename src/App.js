import { useCallback, useEffect, useReducer, useState, createContext } from 'react';
import { Provider } from 'react-redux';
import { enhancedReducer, formUpdated, initialState } from './utils/form';
import { useInterval } from 'utils/hooks';
import store from 'store';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Fellesbestemmelser, Generelt, Planhensikt, KravOmDetaljregulering, Formålsbestemmelser, Hensynsbestemmelser, Områdebestemmelser, Rekkefølgebestemmelser, JuridiskeDokumenter } from 'components/forms';
import { ActionButtons } from 'components/partials';
import { Dialog } from 'components/custom-elements';
import { get, set } from 'idb-keyval';
import { sendAsync } from 'utils/api';
import Logo from './assets/gfx/logo-dibk.svg';
import './App.scss';

const CODE_LISTS_URL = process.env.REACT_APP_CODE_LISTS_URL;
const SAVE_DOC_INTVAL_SEC = 30;

export const CodeListContext = createContext({});

const App = () => {
   const [codeLists, setCodeLists] = useState(null);
   const [state, updateState] = useReducer(enhancedReducer, initialState);
   const updateForm = useCallback(event => formUpdated(event, updateState), []);

   useEffect(() => {
      get('rpb-document')
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
   }, []);

   useInterval(async () => {
      await set('rpb-document', state);
   }, SAVE_DOC_INTVAL_SEC * 1000);

   if (!codeLists) {
      return '';
   }

   return (
      <Provider store={store}>
         <CodeListContext.Provider value={codeLists}>
            <div className='App'>
               <div className="container">
                  <header>
                     <h1>
                        <img src={Logo} alt="DiBK" />Fellestjenester PLAN |<span>Reguleringsplanbestemmelser</span>
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
                        <Tab eventKey="områdebestemmelser" title="Områdebestemmelser">
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
         </CodeListContext.Provider>

         <Dialog />
      </Provider>
   );
}

export default App;
