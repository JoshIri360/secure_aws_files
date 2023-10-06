var RSA = require("hybrid-crypto-js").RSA;
var Crypt = require("hybrid-crypto-js").Crypt;
let fs = require("fs");

// Exported function for encryption
exports.encrypt = async (buffer, publicKey, userEntropy) => {
  var crypt = new Crypt({ entropy: userEntropy });
  const encrypted = crypt.encrypt(publicKey, buffer);
  return encrypted;
};

exports.decrypt = async (encrypted, privateKey, userEntropy) => {
  privateKey = fs.readFileSync("./keys/PrivateKey.txt");
  var crypt = new Crypt({ entropy: userEntropy });
  const decrypted = crypt.decrypt(privateKey.toString(), encrypted);
  // Convert the base64 string back to buffer
  fs.writeFileSync("Buffer2.txt", decrypted.message);
  return Buffer.from(decrypted.message, "base64");
};
