module.exports = (err, req, res, next) => {
  if (err instanceof MulterError && err.code === "LIMIT_FILE_SIZE") {
    // Handle the Multer file size limit error
    res.status(400).json({ message: "File size is too large. Please upload a smaller file." });
  } else {
    console.error(err.stack);
    res.status(500).json({ message: "Internal server error" });
  }
};
