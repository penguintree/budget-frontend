// import cache from 'blocks/cache';

// const cacheKey = 'settings';
// const cacheDuration = 60*24;
// const cacheLocation = 'localStorage';

// let settings = false;

// export function getSettings(){
//    if (!settings) throw new Error("settings not initialized");

//    return settings;
// }

// export async function loadSettings(){
//    settings = await cache.get(cacheKey, cacheLocation, cacheDuration, async () => {
//       const response = await fetch('/settings.json');
//       return await response.json();
//    });
// }

export default window.settings;