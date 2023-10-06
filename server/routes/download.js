const express = require("express");
const fs = require("fs");

const { getObject } = require("../services/s3Service");
const { decrypt } = require("../services/encryptionService");
const asyncMiddleware = require("../middleware/asyncMiddleware");
const multer = require("multer");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 40000000 } });

router.post(
  "/api/download",
  upload.single("file"),
  asyncMiddleware(async (req, res) => {
    const privateKey = req.file.buffer.toString();
    const encryptedFile = await getObject(req, res);

    const decryptedFileBuffer = await decrypt(
      encryptedFile,
      privateKey,
      req.body.filePassword
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${req.body.fileName.split("/")[1]}`
    );
    res.setHeader("Content-Type", "application/octet-stream");
    res.end(decryptedFileBuffer, "binary"); // Write the decrypted file buffer directly to the response
  })
);

module.exports = router;
