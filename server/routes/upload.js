const express = require("express");
const multer = require("multer");
const { encrypt, getDek } = require("../services/encryptionService");
const { s3Uploadv2, checkDuplicates } = require("../services/s3Service");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 40000000 } });

router.post("/api/upload", upload.single("file"), async (req, res) => {
  // Check if file already exists
  const duplicateCheck = await checkDuplicates(req, res);

  if (duplicateCheck && duplicateCheck.status === 409) {
    return res.status(409).json({ message: "File already exists" });
  }

  // Encrypt the file
  req.file.buffer = await encrypt(
    req.file.buffer.toString("base64"),
    req.body.publicKey,
    req.body.randomKey
  );

  // Upload encrypted file to S3
  const result = await s3Uploadv2(req, res);

  if (result.status === 200) {
    return res.status(result.status).json({
      message: "File uploaded successfully",
    });
  } else {
    return res.status(result.status).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
