const express = require("express");
const multer = require("multer");
const { encrypt, getDek } = require("../services/encryptionService");
const { storeDEKInFirebase } = require("../services/firebaseService");
const { s3Uploadv2 } = require("../services/s3Service");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 40000000 } });

router.post("/api/upload", upload.single("file"), async (req, res) => {
  // Genereate DEK
  const dek = getDek();

  // Use DEK to encrypt file
  req.file.buffer = (
    await encrypt(req.file.buffer, Buffer.from(dek))
  ).encryptedData;

  // Upload encrypted file to S3
  const file = await s3Uploadv2(req, res);

  // Store DEK in Firebase
  await storeDEKInFirebase(
    file.Key.split("/")[1],
    dek.toString("hex"),
    req.query.user
  );

  return res.json({ status: "success", file });
});

module.exports = router;
