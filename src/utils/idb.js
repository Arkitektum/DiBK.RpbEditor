import store from 'store';
import { updateLastSaved } from 'store/slices/idbSlice';
import { get, set } from 'idb-keyval';
import dayjs from 'dayjs';

const IDB_KEY = 'rpb-document';

async function saveToIdb(data) {
   await set(IDB_KEY, data);
   const lastSaved = dayjs().format('DD.MM.YYYY [kl.] HH:mm:ss');   
   store.dispatch(updateLastSaved({ lastSaved }));
}

async function loadFromIdb() {
   return await get(IDB_KEY);
}

export { saveToIdb, loadFromIdb }