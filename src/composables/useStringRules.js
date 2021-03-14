export function maxLength (maxLength, message) {
   return (val) => {
      if (val && val.length > maxLength) return message || 'max length exceeded';
      return true;
   };
}

export function required () { 
   return (val) => {
      if (!val || val.length <= 0 || val.trim().length <= 0) {
         return 'required';
      }
      return true;
   };
}