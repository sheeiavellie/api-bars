const { Router } = require('express');
const controller = require("./controller");

const router = Router();

router.get('/', controller.getRoot);

module.exports = router;
