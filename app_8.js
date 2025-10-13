const express = require('express')
const multer = require('multer')
const path = require('path')

const app = express()
const port = 4000;

app.set('views',__dirname+'/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded())

// Storage settings
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// File filter
function fileFilter(req, file, cb) {
  const filetypes = /pdf/;
  const mimetype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error('Only PDF files are allowed!'));
  }
}

// Multer setup
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: fileFilter
}).single('fileupload');

// Routes
app.get('/fileupload', (req, res) => {
  res.render('fileupload', { message: null });
});

app.post('/upload', (req, res) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.render('fileupload', { message: 'File too large. Max 2MB allowed.' });
      }
      return res.render('fileupload', { message: err.message });
    } else if (err) {
      return res.render('fileupload', { message: err.message });
    }

    if (!req.file) {
      return res.render('fileupload', { message: 'No file uploaded.' });
    }

    res.render('fileupload', { message: 'File uploaded successfully!' });
  });
});

// Start server
app.listen(port, () => {
  console.log("App8 Running on Port 4000");
});
