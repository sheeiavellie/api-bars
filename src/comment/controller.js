const pool = require('../database');
const queries = require('./queries');

const getComments = async (req, res) => {
    const bar_id = parseInt(req.params.bar_id);    
    try {
        const results = await pool.query(queries.getComments, [bar_id]);

        if(!results.rows.length)
        {
            res.send(`No comments exist!`);
            return;
        }

        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const addComment = async (req, res) => {
    const bar_id = parseInt(req.params.bar_id);  
    const { author, text } = req.body;

    try {
        const results = await pool.query(queries.addComment, [bar_id, author, text]);
        res.status(201).send("Comment created successfully!");
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const getCommentByID = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const results = await pool.query(queries.getCommentByID, [id]);

        if(!results.rows.length)
        {
            res.status(400).send(`Comment ${id} doesn't exist!`)
            return;
        }

        res.status(200).json(results.rows);
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const removeComment = async (req, res) => {
    const id = parseInt(req.params.id);

    const noCommentFound = !(await pool.query(queries.getCommentByID, [id])).rows.length;

    if(noCommentFound)
    {
        res.status(400).send(`Comment ${id} doesn't exist!`);
        return;
    }

    try {
        const results = await pool.query(queries.removeComment, [id])
        res.status(200).send("Comment removed successfully!");
    } catch(err) {
        res.status(500);
        console.log(err);
    }
};

const updateComment = async (req, res) => {
    const id = parseInt(req.params.id);
    const { text } = req.body;

    const noCommentFound = !(await pool.query(queries.getCommentByID, [id])).rows.length;

    if(noCommentFound)
    {
        res.status(400).send(`Comment ${id} doesn't exist!`);
        return;
    }

    try {
        const results = await pool.query(queries.updateComment, [id, text])
        res.status(200).send("Comment updated successfully!");
    } catch(err) {
        res.status(500);
        console.log(err);
    }

};

module.exports = {
    getComments,
    addComment,
    getCommentByID,
    removeComment,
    updateComment,
};