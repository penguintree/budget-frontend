import UniqueAsync from './UniqueAsync';

const intervalleNettoyage = 60000; // Vidange du cache aux minutes.

let memCache;
let sessionStorageCache;
let localStorageCache;

const unique = new UniqueAsync();

export default { get };

async function get(key, location, minutesToLive, getter){
   const cache = getCache(location);
   
   var item = cache.getItem(key);
   if(item) return item;

   return await unique.get(key, getter).then(result => {
      cache.setItem(key, minutesToLive, result);
      return result;
   })
}

function getCache(location){
   if (location == 'memory'){
      if (!memCache){
         memCache = new MemCache();
         setInterval(() => {
            memCache.checkAllItems();
         }, intervalleNettoyage);
      }
      return memCache;
   } 
   
   if (location == 'localStorage') {
      if(!localStorageCache){
         localStorageCache = new StorageCache(window.localStorage);
         setInterval(() => {
            localStorageCache.checkAllItems();
         }, intervalleNettoyage);
      }

      return localStorageCache;
   } 
   
   if (location === 'sessionStorage') {
      if (!sessionStorageCache){
         sessionStorageCache = new StorageCache(window.sessionStorage);
         setInterval(() => {
            sessionStorageCache.checkAllItems();
         }, intervalleNettoyage);
      }

      return sessionStorageCache;
   }

   throw new Error(`Cache location ${location} not implemented`);
}

class Cache {
   checkAllItems(){
      const now = new Date();
      const keys = this._getKeys();
      for(let k of keys){
         const o = this._getItem(k);
         if(o && o.exp && o.exp < now){
            this._removeItem(k);
         }
      }
   }

   setItem(key, minutesToLive, item){
      const exp = getExpiration(minutesToLive);
      const data = {
         exp: exp,
         value: item
      };

      this._storeItem(key, data);
   }

   getItem(key) {
      const o = this._getItem(key);
      const now = new Date();
      if (o && o.exp > now) {
         return o.value;
      }
      return undefined;
   }

   removeItem(key){
      this._removeItem(key);
   }
}

class MemCache extends Cache{
   constructor(){
      super();
      this._data = {};
   }

   _getItem(key){
      return this._data[key];
   }

   _removeItem(key){
      delete this._data[key];
   }

   _storeItem(key, item){
      this._data[key] = item;
   }

   _getKeys(){
      return Object.keys(this._data);
   }
}

class StorageCache extends Cache{
   constructor(storage){
      super();
      this._storage = storage;

      this._prefix = "$CACHE$_"
   }

   _adaptKey(key){
      return `${this._prefix}${key}`;
   }

   _getItem(key){
      key = this._adaptKey(key);
      const val = this._storage.getItem(key);
      if(!val) return null;

      return JSON.parse(val);
   }

   _removeItem(key){
      key = this._adaptKey(key);
      this._storage.removeItem(key);
   }

   _storeItem(key, item){
      key = this._adaptKey(key);
      const s = JSON.stringify(item);
      this._storage.setItem(key, s);
   }

   _getKeys(){
      return Object.keys(this._storage).filter(k => k.startsWith(this._prefix));
   }
}

function getExpiration(minutesToLive){
   const exp = new Date();
   exp.setMinutes(exp.getMinutes() + minutesToLive);
   return exp;
}