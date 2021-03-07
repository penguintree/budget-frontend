export default class UniqueAsync{
   constructor(){
      this._requests = {};
   }

   get(key, getter){
      if(!this._requests[key]){
         this._requests[key] = getter().finally(() => {
            delete this._requests[key];
         });
      }

      return this._requests[key];
   }
}