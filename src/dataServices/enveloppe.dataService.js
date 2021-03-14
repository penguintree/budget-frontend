import backend from './backend';

export default {
   getAll,
   post,
   delete: $delete
};

async function getAll(){
   const url = '/enveloppes';
   const enveloppes = await backend.get(url);
   return enveloppes;
}

async function post(model) {
   const url = '/enveloppes';
   const created = await backend.post(url, model);
   return created;
}

async function $delete(idEnveloppe) {
   const url = `/enveloppes/${idEnveloppe}`;
   await backend.delete(url);
}