const multer = require("multer");           // Import Multer – middleware for handling multipart/form‑data.
const path = require("path");               // Node core module to work with file paths.

// ----------  Storage engine ----------
const storage = multer.diskStorage({
                                             // Tell Multer to save files on disk (not memory / cloud).
  destination: (req, file, cb) => {
                                             // destination() runs for every file upload.
    cb(null, "public/uploads/");             // • First arg = null (no error)   cb=callback function
                                             // • Second = folder where files are saved.
  },
  filename: (req, file, cb) => {
                                             // filename() decides the saved file’s name.
    const uniqueName =                       // Build a unique name:
      Date.now() +                           // • current timestamp
      path.extname(file.originalname);       // • original extension (.jpg / .png …)
    cb(null, uniqueName);                    // Pass final filename back to Multer.
  },
});

// ----------  File‑type filter ----------
const fileFilter = (req, file, cb) => {
                                             // Runs before saving; decide “accept” or “reject”.
  const allowedTypes = /jpeg|jpg|png|gif/;   // Regex of allowed extensions / MIME parts.

  const extname = allowedTypes.test(
                                             // Check file extension:  .jpg / .png etc.
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(
                                             // Check MIME type sent by browser: image/jpeg etc.
    file.mimetype
  );

  if (extname && mimetype) {
                                              // Both checks must pass.
    cb(null, true);                           // Accept file → cb(error, accept=true)
  } else {
    cb("Error: Only image files are allowed!"); // Reject with custom error message.
  }
};

module.exports = multer({
  storage: storage,                              // Use diskStorage engine defined above.
  limits: { fileSize: 5 * 1024 * 1024 },         // Max file size = 5 MB.
  fileFilter: fileFilter,                        // Apply the image‑only filter.
});
