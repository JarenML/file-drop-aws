const express = require('express');
const router = express.Router();
const { S3Client, ListObjectsV2Command, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { Upload } = require('@aws-sdk/lib-storage');
const multer = require('multer');

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const upload = multer({ storage: multer.memoryStorage() });

// Subir archivo
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const uploader = new Upload({
      client: s3,
      params: {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `${Date.now()}-${req.file.originalname}`,
        Body: req.file.buffer,
        ContentType: req.file.mimetype,
      },
    });
    const data = await uploader.done();
    res.json({ message: 'Archivo subido', url: data.Location });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Listar archivos
router.get('/', async (req, res) => {
  try {
    const data = await s3.send(new ListObjectsV2Command({
      Bucket: process.env.S3_BUCKET_NAME,
    }));
    const files = (data.Contents || []).map(f => ({
      name: f.Key,
      size: f.Size,
      date: f.LastModified,
    }));
    res.json(files);
  } catch (err) {
    console.error('Error S3:', err.message); // <- agrega esta línea
    res.status(500).json({ error: err.message });
  }
});

// Descargar archivo
router.get('/download/:key', async (req, res) => {
  try {
    const data = await s3.send(new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.params.key,
    }));
    res.setHeader('Content-Disposition', `attachment; filename="${req.params.key}"`);
    data.Body.pipe(res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar archivo
router.delete('/:key', async (req, res) => {
  try {
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: req.params.key,
    }));
    res.json({ message: 'Archivo eliminado' });
  } catch (err) {
    console.log("ERROR")
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;