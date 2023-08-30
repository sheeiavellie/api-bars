const { Router } = require('express');
const controller = require("./controller");

const router = Router();

router.get('/:bar_id/comments', controller.getComments);
router.post('/:bar_id/comments', controller.addComment);

router.get('/:id', controller.getCommentByID);
router.delete('/:id', controller.removeComment);
router.patch('/:id', controller.updateComment);

module.exports = router;
