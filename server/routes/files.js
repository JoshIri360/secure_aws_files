const express = require("express");

const { getObjectsOfUser } = require("../services/s3Service");
const asyncMiddleware = require("../middleware/asyncMiddleware");

const router = express.Router();

router.get(
  "/api/files",
  asyncMiddleware(async (req, res) => {
    // Get all files of user from S3
    const files = await getObjectsOfUser(req.query.user);

    // If user doesn't have files return
    if (!files) {
      return res.json({ status: "success", files: [] });
    }

    // Get file names from file keys
    const fileNames = files.map((file) => {
      const parts = file.Key.split("-");
      return parts[parts.length - 1];
    });

    // Add file names to files array
    files.forEach((file, index) => {
      file.name = fileNames[index];
    });

    return res.json({ status: "success", files: files });
  })
);

module.exports = router;
