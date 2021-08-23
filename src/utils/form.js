import has from 'lodash.has';
import set from 'lodash.set';
import produce from 'immer';

export const enhancedReducer = (state, updateArg) => {
   if (updateArg.constructor === Function) {
      return { ...state, ...updateArg(state) };
   }

   if (updateArg.constructor === Object) {
      if (has(updateArg, '_path') && has(updateArg, '_value')) {
         const { _path, _value } = updateArg;

         return produce(state, draft => {
            set(draft, _path, _value);
         });
      } else {
         return { ...state, ...updateArg };
      }
   }
};

export const formUpdated = (data, updateState) => {
   if (!data.target || data.target.name === undefined || data.target.value === undefined) {
      updateState(data);
      return;
   }

   const { name, value, type } = data.target;
   const updatePath = name.split('.');

   if (type === 'checkbox') {
      updateState((prevState) => ({
         [name]: !prevState[name]
      }));

      return;
   }

   if (updatePath.length === 1) {
      const [key] = updatePath;

      updateState({
         [key]: value
      });
   } else if (updatePath.length > 1) {
      updateState({
         _path: name,
         _value: value
      });
   }
};

export const initialState = {
   nasjonalArealplanId: {
      administrativEnhet: {
         kommunenummer: ''
      },
      planidentifikasjon: ''
   },
   plantype: {
      kodeverdi: '34',
      kodebeskrivelse: ''
   },
   plannavn: '',
   lovreferanse: {
      kodeverdi: '6',
      kodebeskrivelse: ''
   },
   versjonsdato: null,
   versjonsnummer: '',
   alternativReferanse: '',
   planhensikt: {
      nummerering: '',
      overskrift: '',
      tekst: {
         tekstInnhold: '',
         tekstFormat: {
            kodeverdi: 'html',
            kodebeskrivelse: ''
         }
      },
      sorteringsrekkefølge: 1,
      versjonsdato: null,
      versjonsnummer: '',
      alternativReferanse: ''
   },
   fellesbestemmelser: [],
   kravOmDetaljregulering: [],
   formålsbestemmelser: [],
   hensynsbestemmelser: [],
   områdebestemmelser: [],
   rekkefølgebestemmelser: [],
   juridiskeDokumenter: []
};