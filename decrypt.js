const CryptoJS = require('crypto-js');
function decrypt(encryptedData, key) {
  const bytes = CryptoJS.AES.decrypt(encryptedData, key);
  return bytes.toString(CryptoJS.enc.Utf8);
}

module.exports = {
    decrypt
}