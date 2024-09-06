const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 8080;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {cb(null, 'uploads');},
    filename: (req, file, cb) => {cb(null, `${file.originalname}`);}
});

const upload = multer({ storage: storage });

app.use(express.static(path.join(__dirname, 'public')));

app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({ fileUrl });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
