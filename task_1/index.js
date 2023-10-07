import {encoded, translations} from './data.js'

function decodeFields(encoded, translations) {
  return encoded.map((item) => {
    const decodedItem = {};
    for (const key in item) {
      if (
        key.endsWith("Id") &&
        !["groupId", "service", "formatSize", "ca"].includes(key)
      ) {
        const translationKey = item[key];
        decodedItem[key] = translations[translationKey] || translationKey;
      } else {
        decodedItem[key] = item[key];
      }
    }
    return decodedItem;
  });
}

const decoded = decodeFields(encoded, translations);
console.log(decoded);



// console.log(decoded)
