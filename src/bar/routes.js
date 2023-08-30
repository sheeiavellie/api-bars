const { Router } = require('express');
const controller = require("./controller");

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage: storage});

const router = Router();

router.get('/', controller.getBars);
router.post('/', upload.single('image'), controller.addBar);
router.get('/:id', controller.getBarById);
router.delete('/:id', controller.removeBar);

module.exports = router;
