import backend from './backend';

export default {
   get,
   post,
   put,
   delete: $delete
}

async function get(idEnveloppe){
   const url = `/enveloppes/${idEnveloppe}/categories`;
   const categories = await backend.get(url);

   return categories;
}

async function post(idEnveloppe, model) {
   const url = `/enveloppes/${idEnveloppe}/categories`;
   const category = await backend.post(url, model);

   return category;
}

async function put(idEnveloppe, idCategory, model) {
   const url = `/enveloppes/${idEnveloppe}/categories/${idCategory}`;
   await backend.put(url, model);
}

async function $delete(idEnveloppe, idCategory){
   const url = `/enveloppes/${idEnveloppe}/categories/${idCategory}`;
   await backend.delete(url);
}