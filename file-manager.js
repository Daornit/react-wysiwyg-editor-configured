const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');

const UPLOAD_SYS_PATH =  __dirname + '/../public/uploads';
const UPLOAD_SYS_DELETE_PATH =  __dirname + '/../public';
const UPLOADS_PATH = '/uploads';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOAD_SYS_PATH)
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split('.');
    const format = filename.pop();
    cb(null, `${filename.join()}-${Date.now()}.${format}`);
  }
})
 
var upload = multer({ storage: storage })

// define the home page route
router.get('/load_images', async function (req, res) {
  const files = await fs.readdirSync(UPLOAD_SYS_PATH);

  let items = [];
  await files.forEach((file, index) => {
    items.push({
      url: UPLOADS_PATH + '/' + file,
      thumb: UPLOADS_PATH + '/' + file,
      name: file,
      type: "image",
      id: index,
      tag:"photos"
    });
  });

  res.send(items);
})

router.post('/upload_image', upload.single('image_param'), function (req, res) {
  res.send({link: UPLOADS_PATH + '/' + req.file.filename});
})

router.delete('/', async function (req, res) {
  await fs.unlinkSync(UPLOAD_SYS_DELETE_PATH + req.body.src, (err) => {
    if (err) {
      res.status(500);
      res.send(req.body.src + ' delete failed!');
    }
  })
  res.send(req.body.src + ' delete success!');
})

module.exports = router