import backend from './backend';

export default {
   getAll,
   post
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