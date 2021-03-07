import backend from './backend';

export default {
   getAll
};

async function getAll(){
   const url = '/enveloppes';
   const enveloppes = await backend.get(url);
   return enveloppes;
}