const CryptoJS = require('crypto-js');
function encrypt(data, key) {
    return CryptoJS.AES.encrypt(data, key).toString();
  }
module.exports = {
    encrypt
}