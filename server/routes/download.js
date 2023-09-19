const express = require("express");
const fs = require("fs");

const { getObject } = require("../services/s3Service");
const { decrypt } = require("../services/encryptionService");
const asyncMiddleware = require("../middleware/asyncMiddleware");

const router = express.Router();

router.get(
  "/api/download",
  asyncMiddleware(async (req, res) => {
    const [fileName] = req.query.key.split("/");

    // Get encrypted file as buffer from S3
    const encryptedFile = await getObject(req, res);

    // Get DEK from Firebase and convert to buffer
    const dek = Buffer.from(req.query.dek, "hex");

    // Decrypt file as buffer
    const decryptedFileBuffer = await decrypt(encryptedFile, dek);

    // Write decrypted file to disk
    await fs.promises.writeFile(`./${fileName}`, decryptedFileBuffer);

    // Create read stream AFTER file is written
    const fileStream = fs.createReadStream(`./${fileName}`);
    // Send decrypted file to client
    res.attachment(fileName);
    fileStream.pipe(res);

    // Delete decrypted file from disk
    fileStream.on("end", () => fs.promises.unlink(`./${fileName}`));
  })
);

module.exports = router;
