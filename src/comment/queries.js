const getComments = 'SELECT * FROM comments WHERE bar_id = $1';
const getCommentByID = 'SELECT * FROM comments WHERE ID = $1';
const addComment = 'INSERT INTO comments (bar_id, date, author, text, updated_on) VALUES ($1, $2, $3, $4, $2)';
const removeComment = 'DELETE FROM comments WHERE ID = $1';
const updateComment = 'UPDATE comments SET text = COALESCE($2, text), updated_on = now() WHERE ID = $1';

module.exports = {
    getComments,
    getCommentByID,
    addComment,
    removeComment,
    updateComment,
};