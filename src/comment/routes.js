const { Router } = require('express');
const controller = require("./controller");

const router = Router();

router.get('/bar/:bar_id', controller.getComments);
router.post('/bar/:bar_id', controller.addComment);

router.get('/:id', controller.getCommentByID);
router.delete('/:id', controller.removeComment);
router.patch('/:id', controller.updateComment);

module.exports = router;
