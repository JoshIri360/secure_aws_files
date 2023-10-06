const express = require("express");
const { RSA } = require("hybrid-crypto-js");
const router = express.Router();
const fs = require("fs");

router.post("/api/getKeys", async (req, res) => {
  let userEntropy = req.query.randomKey;
  var rsa = new RSA({ entropy: userEntropy });

  let publicKey;
  let privateKey;

  // User-generated keys (publicKey and privateKey)
  await rsa.generateKeyPairAsync().then((keyPair) => {
    publicKey = keyPair.publicKey;
    privateKey = keyPair.privateKey;
  });

  res.send({ publicKey, privateKey });
});

module.exports = router;
